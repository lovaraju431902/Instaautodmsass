import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // 1. Check Better Auth session if present
    const session = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    // 2. Find authenticated user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 3. Find or create workspace for this user
    let workspace = await prisma.workspace.findFirst({
      where: { ownerId: user.id },
      include: {
        instagramAccounts: {
          include: {
            _count: {
              select: {
                posts: true,
                automations: true,
              },
            },
          },
          orderBy: { connectedAt: "desc" },
        },
      },
    })

    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: "My Workspace",
          slug: `workspace-${Date.now()}`,
          ownerId: user.id,
          monthlyDmLimit: 500,
          dmsSentThisMonth: 0,
          maxIgAccounts: 1,
          planTier: "FREE",
          subscriptionStatus: "ACTIVE",
        },
        include: {
          instagramAccounts: {
            include: {
              _count: {
                select: {
                  posts: true,
                  automations: true,
                },
              },
            },
            orderBy: { connectedAt: "desc" },
          },
        },
      })
    }

    // 4. Calculate actual total DMs sent and credits
    const totalAutomations = await prisma.automation.findMany({
      where: { workspaceId: workspace.id },
      select: { dmsSentCount: true },
    })
    const realDmsCount = totalAutomations.reduce((acc, a) => acc + (a.dmsSentCount || 0), 0)
    const dmsSent = Math.max(workspace.dmsSentThisMonth, realDmsCount)

    const monthlyLimit = workspace.monthlyDmLimit || 500
    const dmsRemaining = Math.max(0, monthlyLimit - dmsSent)
    const percentUsed = Math.min(100, Math.round((dmsSent / monthlyLimit) * 100))

    const connectedAccountsCount = workspace.instagramAccounts.length
    const maxAccounts = workspace.maxIgAccounts || 1
    const accountsRemaining = Math.max(0, maxAccounts - connectedAccountsCount)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt,
      },
      workspace: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        planTier: workspace.planTier,
        subscriptionStatus: workspace.subscriptionStatus,
        currentPeriodEnd: workspace.currentPeriodEnd,
        monthlyDmLimit: monthlyLimit,
        dmsSentThisMonth: dmsSent,
        maxIgAccounts: maxAccounts,
      },
      instagramAccounts: workspace.instagramAccounts.map((acc) => ({
        id: acc.id,
        instagramId: acc.instagramId,
        username: acc.username,
        name: acc.name,
        profilePictureUrl: acc.profilePictureUrl,
        followersCount: acc.followersCount,
        status: acc.status,
        connectedAt: acc.connectedAt,
        postsCount: acc._count.posts,
        automationsCount: acc._count.automations,
      })),
      credits: {
        monthlyDmLimit: monthlyLimit,
        dmsSentThisMonth: dmsSent,
        dmsRemaining,
        percentDmsUsed: percentUsed,
        maxIgAccounts: maxAccounts,
        connectedIgAccounts: connectedAccountsCount,
        accountsRemaining,
        planTier: workspace.planTier,
        subscriptionStatus: workspace.subscriptionStatus,
        renewalDate: workspace.currentPeriodEnd,
      },
    })
  } catch (error: any) {
    console.error("Failed to fetch profile data:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to load profile data" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, image } = body

    const session = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name ? { name } : {}),
        ...(image !== undefined ? { image } : {}),
      },
    })

    return NextResponse.json({ success: true, user: updatedUser })
  } catch (error: any) {
    console.error("Failed to update profile:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to update profile" },
      { status: 500 }
    )
  }
}
