import { NextRequest, NextResponse } from "next/server"
import { inngest } from "@/lib/inngest/client"

const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || "instadm_webhook_secret_token_2026"

/**
 * Meta Webhook Handshake Verification (GET)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[Instagram Webhook] Subscription verified successfully")
    return new Response(challenge, { status: 200 })
  }

  return new Response("Forbidden: Invalid verification token", { status: 403 })
}

/**
 * Meta Incoming Events Webhook Handler (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Ensure it's an Instagram event
    if (body.object !== "instagram") {
      return NextResponse.json({ status: "ignored" }, { status: 200 })
    }

    const entries = body.entry || []

    for (const entry of entries) {
      const instagramAccountId = entry.id
      const changes = entry.changes || []
      const messaging = entry.messaging || []

      // 1. Handle Comment changes
      for (const change of changes) {
        if (change.field === "comments") {
          const comment = change.value
          const commentId = comment.id
          const commentText = comment.text
          const mediaId = comment.media?.id
          const senderId = comment.from?.id
          const senderUsername = comment.from?.username || "user"

          // Dispatch event to Inngest for resilient background execution
          await inngest.send({
            name: "instagram/comment.received",
            data: {
              instagramAccountId,
              mediaId,
              commentId,
              commentText,
              senderId,
              senderUsername,
            },
          })
        }
      }

      // 2. Handle Direct Messaging changes
      for (const msg of messaging) {
        if (msg.message?.text) {
          await inngest.send({
            name: "instagram/dm.received",
            data: {
              instagramAccountId,
              senderId: msg.sender?.id,
              messageText: msg.message.text,
            },
          })
        }
      }
    }

    return NextResponse.json({ status: "received" }, { status: 200 })
  } catch (error: any) {
    console.error("[Instagram Webhook Error]:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
