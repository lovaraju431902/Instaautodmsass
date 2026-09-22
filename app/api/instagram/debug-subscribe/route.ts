import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { decryptToken } from "@/lib/crypto"

export async function GET(req: NextRequest) {
  try {
    const accounts = await prisma.instagramAccount.findMany({
      where: { status: "CONNECTED" },
      include: {
        automations: {
          include: {
            keywords: true,
            specificPost: true,
          },
        },
      },
    })

    if (accounts.length === 0) {
      return NextResponse.json({
        status: "error",
        message: "No connected Instagram accounts found in database.",
      })
    }

    const results = []

    for (const acc of accounts) {
      const accessToken = decryptToken(acc.accessToken)

      // 1. Subscribe to comments and messages explicitly on Graph API
      let subscribeResult = null
      try {
        const postRes = await fetch(
          `https://graph.instagram.com/v21.0/me/subscribed_apps?subscribed_fields=comments,messages&access_token=${accessToken}`,
          { method: "POST" }
        )
        subscribeResult = await postRes.json()
      } catch (e: any) {
        subscribeResult = { error: e.message }
      }

      // 2. Check current subscribed_apps
      let currentSubscription = null
      try {
        const getRes = await fetch(
          `https://graph.instagram.com/v21.0/me/subscribed_apps?access_token=${accessToken}`
        )
        currentSubscription = await getRes.json()
      } catch (e: any) {
        currentSubscription = { error: e.message }
      }

      // 3. Check account profile details from Meta
      let metaProfile = null
      try {
        const profRes = await fetch(
          `https://graph.instagram.com/me?fields=id,user_id,username,account_type&access_token=${accessToken}`
        )
        metaProfile = await profRes.json()
      } catch (e: any) {
        metaProfile = { error: e.message }
      }

      // 4. Check recent media to verify Reel ID match
      let mediaItems = null
      try {
        const mediaRes = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,permalink,media_type&limit=10&access_token=${accessToken}`
        )
        mediaItems = await mediaRes.json()
      } catch (e: any) {
        mediaItems = { error: e.message }
      }

      results.push({
        account: {
          id: acc.id,
          username: acc.username,
          instagramId: acc.instagramId,
        },
        metaProfile,
        subscribeResult,
        currentSubscription,
        recentMedia: mediaItems?.data || mediaItems,
        automations: acc.automations.map((a) => ({
          id: a.id,
          name: a.name,
          status: a.status,
          postTargetType: a.postTargetType,
          specificPostMediaId: a.specificPost?.mediaId || null,
          keywords: a.keywords.map((k) => k.keyword),
        })),
      })
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
