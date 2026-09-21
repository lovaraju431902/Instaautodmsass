import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { exchangeCodeForTokens, fetchInstagramProfile, fetchInstagramMedia, subscribeInstagramAccount } from "@/lib/instagram"
import { encryptToken } from "@/lib/crypto"

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json({ error: "Missing or invalid authorization code" }, { status: 400 })
    }

    const cleanCode = code.trim().replace(/#_$/, "").split("#")[0]

    // 1. Check for authenticated Better Auth user session
    const session = await auth.api.getSession({ headers: req.headers }).catch(() => null)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. You must be logged in to link an Instagram account." },
        { status: 401 }
      )
    }

    let workspace = await prisma.workspace.findFirst({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } },
        ],
      },
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: `${session.user.name || "Creator"}'s Workspace`,
          slug: `workspace-${Date.now()}`,
          ownerId: session.user.id,
          monthlyDmLimit: 500,
          dmsSentThisMonth: 0,
          maxIgAccounts: 1,
        },
      })
    }

    // 2. Exchange authorization code with Meta Graph API
    const tokenData = await exchangeCodeForTokens(cleanCode)
    const profile = await fetchInstagramProfile(tokenData.accessToken, tokenData.userId)
    const tokenExpiresAt = tokenData.expiresIn
      ? new Date(Date.now() + tokenData.expiresIn * 1000)
      : null

    // Encrypt token before saving in database
    const encryptedAccessToken = encryptToken(tokenData.accessToken)

    // 3. Upsert Instagram Account in Prisma DB
    const account = await prisma.instagramAccount.upsert({
      where: { instagramId: profile.id },
      update: {
        workspaceId: workspace.id,
        username: profile.username,
        name: profile.name,
        profilePictureUrl: profile.profilePictureUrl,
        followersCount: profile.followersCount,
        accessToken: encryptedAccessToken,
        tokenExpiresAt,
        status: "CONNECTED",
      },
      create: {
        workspaceId: workspace.id,
        instagramId: profile.id,
        username: profile.username,
        name: profile.name || profile.username,
        profilePictureUrl: profile.profilePictureUrl,
        followersCount: profile.followersCount,
        accessToken: encryptedAccessToken,
        tokenExpiresAt,
        status: "CONNECTED",
      },
    })

    // 3b. Subscribe account to Webhooks (comments, messages) on Meta Graph API
    try {
      await subscribeInstagramAccount(tokenData.accessToken)
    } catch (subErr) {
      console.warn("Non-critical webhook subscription warning:", subErr)
    }

    // 4. Fetch and save real media (posts & reels) concurrently
    try {
      const realMedia = await fetchInstagramMedia(tokenData.accessToken)
      if (realMedia.length > 0) {
        await Promise.allSettled(
          realMedia.map((item) =>
            prisma.post.upsert({
              where: { mediaId: item.id },
              update: {
                caption: item.caption,
                mediaType: item.mediaType,
                mediaUrl: item.mediaUrl,
                thumbnailUrl: item.thumbnailUrl,
                permalink: item.permalink,
                likesCount: item.likesCount,
                commentsCount: item.commentsCount,
                postedAt: new Date(item.timestamp),
              },
              create: {
                instagramAccountId: account.id,
                mediaId: item.id,
                caption: item.caption,
                mediaType: item.mediaType,
                mediaUrl: item.mediaUrl,
                thumbnailUrl: item.thumbnailUrl,
                permalink: item.permalink,
                likesCount: item.likesCount,
                commentsCount: item.commentsCount,
                postedAt: new Date(item.timestamp),
              },
            })
          )
        )
      } else {
        const existingPost = await prisma.post.findFirst({
          where: { instagramAccountId: account.id },
        })

        if (!existingPost) {
          await prisma.post.create({
            data: {
              instagramAccountId: account.id,
              mediaId: `media_${Date.now()}`,
              mediaType: "REEL",
              caption: "New Instagram Post",
              likesCount: 0,
              commentsCount: 0,
              postedAt: new Date(),
            },
          })
        }
      }
    } catch (mediaErr) {
      console.warn("Non-critical media sync error during callback:", mediaErr)
    }

    // 5. Build response & set authentication cookies
    const response = NextResponse.json({
      success: true,
      account: {
        id: account.id,
        username: account.username,
        followersCount: account.followersCount,
      },
    })

    response.cookies.set("instadm_ig_connected", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    })

    response.cookies.set("instadm_ig_username", account.username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    })

    return response
  } catch (error: any) {
    console.error("Instagram OAuth callback handler error:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to complete Instagram connection" },
      { status: 500 }
    )
  }
}
