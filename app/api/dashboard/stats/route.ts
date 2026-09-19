import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const forceRefresh = url.searchParams.get("refresh") === "true"

    const session = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    // 1. Fetch active workspace and connected Instagram account in a single query
    let workspace = await prisma.workspace.findFirst({
      where: {
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id } } },
        ],
      },
      include: {
        instagramAccounts: {
          orderBy: { connectedAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    })

    let account = workspace?.instagramAccounts?.[0] || null

    // Fallback if workspace is missing or not linked
    if (!workspace) {
      account = await prisma.instagramAccount.findFirst({
        where: {
          workspace: {
            OR: [
              { ownerId: session.user.id },
              { members: { some: { userId: session.user.id } } },
            ],
          },
        },
        orderBy: { connectedAt: "desc" },
      })

      if (account) {
        workspace = await prisma.workspace.findUnique({
          where: { id: account.workspaceId },
          include: {
            instagramAccounts: {
              orderBy: { connectedAt: "desc" },
              take: 1,
            },
          },
        })
      }
    }

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
        posts: [],
      })
    }

    // 2. ONLY sync fresh media from Meta Graph API if explicitly requested by user (e.g. ?refresh=true)
    const currentAccount = account
    if (forceRefresh && currentAccount?.accessToken) {
      try {
        const accountId = currentAccount.id
        const { fetchInstagramMedia, fetchInstagramProfile } = await import("@/lib/instagram")
        const [freshMedia, freshProfile] = await Promise.all([
          fetchInstagramMedia(currentAccount.accessToken).catch(() => []),
          fetchInstagramProfile(currentAccount.accessToken, currentAccount.instagramId).catch(() => null),
        ])

        if (freshProfile) {
          account = await prisma.instagramAccount.update({
            where: { id: accountId },
            data: {
              followersCount: freshProfile.followersCount ?? currentAccount.followersCount,
              name: freshProfile.name || currentAccount.name,
              profilePictureUrl: freshProfile.profilePictureUrl || currentAccount.profilePictureUrl,
              username: freshProfile.username || currentAccount.username,
            },
          })
        }

        if (freshMedia.length > 0) {
          await Promise.allSettled(
            freshMedia.map((item) =>
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
                  instagramAccountId: accountId,
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
        }
      } catch (syncErr) {
        console.warn("Manual refresh Meta sync notice:", syncErr)
      }
    }

    // 3. Database-First: Execute all queries concurrently in parallel
    const [posts, automations, leadsCollected] = await Promise.all([
      account
        ? prisma.post.findMany({
            where: { instagramAccountId: account.id },
            include: {
              automations: {
                select: { id: true, name: true, status: true },
              },
            },
            orderBy: { postedAt: "desc" },
            take: 50,
          })
        : Promise.resolve([]),
      prisma.automation.findMany({
        where: { workspaceId: workspace.id },
        include: {
          keywords: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({
        where: { workspaceId: workspace.id },
      }),
    ])

    // 4. Calculate metrics
    const dmsSent = automations.reduce((sum, a) => sum + (a.dmsSentCount || 0), 0)
    const linkClicks = automations.reduce((sum, a) => sum + (a.clicksCount || 0), 0)

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
      recentPost: posts[0]
        ? {
            id: posts[0].id,
            mediaId: posts[0].mediaId,
            mediaType: posts[0].mediaType,
            caption: posts[0].caption || "Instagram Post",
            mediaUrl: posts[0].mediaUrl,
            thumbnailUrl: posts[0].thumbnailUrl,
            permalink: posts[0].permalink,
            likesCount: posts[0].likesCount,
            commentsCount: posts[0].commentsCount,
            postedAt: posts[0].postedAt,
            hasAutomation: Boolean(posts[0].automations && posts[0].automations.length > 0),
            automations: posts[0].automations || [],
          }
        : null,
      posts: posts.map((p) => ({
        id: p.id,
        mediaId: p.mediaId,
        mediaType: p.mediaType,
        caption: p.caption || "Instagram Post",
        mediaUrl: p.mediaUrl,
        thumbnailUrl: p.thumbnailUrl,
        permalink: p.permalink,
        likesCount: p.likesCount,
        commentsCount: p.commentsCount,
        postedAt: p.postedAt,
        hasAutomation: Boolean(p.automations && p.automations.length > 0),
        automations: p.automations || [],
      })),
    })
  } catch (error: any) {
    console.error("Failed to load dashboard stats:", error)
    return NextResponse.json(
      { error: error.message || "Failed to load dashboard statistics" },
      { status: 500 }
    )
  }
}
