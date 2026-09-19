import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    // 1. Fetch active workspace for this authenticated user
    const workspace = await prisma.workspace.findFirst({
      where: { ownerId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      return NextResponse.json({
        account: null,
        stats: {
          dmsSent: 0,
          linkClicks: 0,
          leadsCollected: 0,
          totalFollowers: 0,
        },
        automations: [],
        recentPost: null,
      })
    }

    // 2. Fetch connected Instagram account
    const account = await prisma.instagramAccount.findFirst({
      where: { workspaceId: workspace.id },
      orderBy: { connectedAt: "desc" },
    })

    // 3. Fetch real Automations
    const automations = await prisma.automation.findMany({
      where: { workspaceId: workspace.id },
      include: {
        keywords: true,
      },
      orderBy: { createdAt: "desc" },
    })

    // 4. Calculate real metrics
    const dmsSent = automations.reduce((sum, a) => sum + (a.dmsSentCount || 0), 0)
    const linkClicks = automations.reduce((sum, a) => sum + (a.clicksCount || 0), 0)

    const leadsCollected = await prisma.contact.count({
      where: { workspaceId: workspace.id },
    })

    // 5. Fetch most recent post / reel for preview card
    const recentPost = account
      ? await prisma.post.findFirst({
          where: { instagramAccountId: account.id },
          orderBy: { postedAt: "desc" },
        })
      : null

    return NextResponse.json({
      account: account
        ? {
            id: account.id,
            username: account.username,
            name: account.name,
            followersCount: account.followersCount,
            profilePictureUrl: account.profilePictureUrl,
          }
        : null,
      stats: {
        dmsSent,
        linkClicks,
        leadsCollected,
        totalFollowers: account?.followersCount || 0,
        dmsSentThisMonth: workspace.dmsSentThisMonth,
        monthlyDmLimit: workspace.monthlyDmLimit,
      },
      automations: automations.map((a) => ({
        id: a.id,
        name: a.name,
        status: a.status,
        triggerType: a.triggerType,
        dmsSentCount: a.dmsSentCount,
        clicksCount: a.clicksCount,
        keywords: a.keywords.map((k) => k.keyword),
        finalMessage: a.finalMessage,
        destinationUrl: a.destinationUrl,
        useAiAssistant: a.useAiAssistant,
      })),
      recentPost,
    })
  } catch (error: any) {
    console.error("Failed to load dashboard stats:", error)
    return NextResponse.json(
      { error: error.message || "Failed to load dashboard statistics" },
      { status: 500 }
    )
  }
}
