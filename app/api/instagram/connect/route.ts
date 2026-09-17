import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, followersCount = 25, postsCount = 1 } = body

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      )
    }

    const cleanUsername = username.replace(/^@/, "").trim()

    // 1. Check or find active workspace
    let workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
    })

    // If no workspace exists yet, create default one
    if (!workspace) {
      // Find or create default user if needed
      let user = await prisma.user.findFirst()
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "John Doe",
            email: "demo@instadm.co",
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

    // 2. Create or update Instagram account in the workspace
    const instagramId = `ig_${cleanUsername}_${Date.now()}`
    const account = await prisma.instagramAccount.upsert({
      where: { instagramId },
      update: {
        username: cleanUsername,
        followersCount: Number(followersCount),
        status: "CONNECTED",
      },
      create: {
        workspaceId: workspace.id,
        instagramId,
        username: cleanUsername,
        name: `${cleanUsername} 🤍 💥`,
        followersCount: Number(followersCount),
        status: "CONNECTED",
        accessToken: `meta_token_${Date.now()}`,
      },
    })

    // 3. Create initial post if not existing
    const existingPost = await prisma.post.findFirst({
      where: { instagramAccountId: account.id },
    })

    if (!existingPost) {
      await prisma.post.create({
        data: {
          instagramAccountId: account.id,
          mediaId: `media_${Date.now()}`,
          mediaType: "REEL",
          caption: "Hmm",
          likesCount: 0,
          commentsCount: 0,
          postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        },
      })
    }

    // 4. Return success and set cookie
    const response = NextResponse.json({
      success: true,
      account: {
        id: account.id,
        username: account.username,
        followersCount: account.followersCount,
      },
    })

    // Set cookie for middleware access
    response.cookies.set("instadm_ig_connected", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Accessible to client & middleware
      sameSite: "lax",
    })

    response.cookies.set("instadm_ig_username", cleanUsername, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      sameSite: "lax",
    })

    return response
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to connect Instagram account"
    console.error("Instagram connect error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
