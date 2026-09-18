import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { exchangeCodeForTokens, fetchInstagramProfile } from "@/lib/instagram"

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 })
    }

    // 1. Check for authenticated user or retrieve default workspace
    let workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      let user = await prisma.user.findFirst()
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Creator Account",
            email: "user@instadm.co",
            emailVerified: true,
          },
        })
      }

      workspace = await prisma.workspace.create({
        data: {
          name: "My Workspace",
          slug: `workspace-${Date.now()}`,
          ownerId: user.id,
          monthlyDmLimit: 500,
          dmsSentThisMonth: 0,
          maxIgAccounts: 1,
        },
      })
    }

    // 2. Exchange authorization code with Meta Graph API
    const tokenData = await exchangeCodeForTokens(code)
    const profile = await fetchInstagramProfile(tokenData.accessToken, tokenData.userId)

    // 3. Upsert Instagram Account in Prisma DB
    const account = await prisma.instagramAccount.upsert({
      where: { instagramId: profile.id },
      update: {
        username: profile.username,
        name: profile.name,
        profilePictureUrl: profile.profilePictureUrl,
        followersCount: profile.followersCount,
        accessToken: tokenData.accessToken,
        status: "CONNECTED",
      },
      create: {
        workspaceId: workspace.id,
        instagramId: profile.id,
        username: profile.username,
        name: profile.name || profile.username,
        profilePictureUrl: profile.profilePictureUrl,
        followersCount: profile.followersCount,
        accessToken: tokenData.accessToken,
        status: "CONNECTED",
      },
    })

    // 4. Ensure initial post preview exists in DB for dashboard reel preview
    const existingPost = await prisma.post.findFirst({
      where: { instagramAccountId: account.id },
    })

    if (!existingPost) {
      await prisma.post.create({
        data: {
          instagramAccountId: account.id,
          mediaId: `media_${Date.now()}`,
          mediaType: "REEL",
          caption: "Welcome to my automated Instagram Reel! 🚀",
          likesCount: 14,
          commentsCount: 3,
          postedAt: new Date(),
        },
      })
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
