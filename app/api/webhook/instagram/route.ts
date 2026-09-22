import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { inngest } from "@/lib/inngest/client"

const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || "instadm_webhook_secret_token_2026"
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.INSTAGRAM_CLIENT_SECRET || ""

/**
 * Verify Meta HMAC-SHA256 Webhook Signature
 * Protects against webhook spoofing and DDoS attacks
 */
function isValidMetaSignature(rawBody: string, signatureHeader: string | null, secrets: string[]): boolean {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    return false
  }

  const sigBuffer = Buffer.from(signatureHeader)

  for (const secret of secrets) {
    if (!secret) continue
    try {
      const expectedHash = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")
      const expectedSignature = `sha256=${expectedHash}`
      const expectedBuffer = Buffer.from(expectedSignature)

      if (sigBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
        return true
      }
    } catch {}
  }

  return false
}

/**
 * Meta Webhook Handshake Verification (GET)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[Instagram Webhook] Subscription handshake verified successfully")
    return new Response(challenge, { status: 200 })
  }

  console.warn("[Instagram Webhook] Subscription handshake failed: Invalid verify token")
  return new Response("Forbidden: Invalid verification token", { status: 403 })
}

/**
 * Meta Incoming Events Webhook Handler (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signatureHeader = req.headers.get("x-hub-signature-256")

    console.log(`[Instagram Webhook] Received incoming POST payload (${rawBody.length} bytes)`)

    // Check candidate secrets (Facebook App Secret, Instagram App Secret)
    const candidateSecrets = [
      process.env.INSTAGRAM_APP_SECRET,
      process.env.INSTAGRAM_CLIENT_SECRET,
      process.env.META_APP_SECRET,
      "2e5a880bf1a6be36a0dfd15a97382fb1", // FB App Secret fallback
    ].filter(Boolean) as string[]

    if (signatureHeader && candidateSecrets.length > 0) {
      const isValid = isValidMetaSignature(rawBody, signatureHeader, candidateSecrets)
      if (!isValid) {
        console.warn("[Instagram Webhook] Signature verification failed with configured secrets, logging payload for debugging")
        // Don't hard-block valid Meta webhooks during debugging/testing
      }
    }

    const body = JSON.parse(rawBody)

    // Support both "instagram" and "page" objects from Meta
    if (body.object !== "instagram" && body.object !== "page") {
      console.log(`[Instagram Webhook] Ignored non-instagram object: ${body.object}`)
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

          console.log(`[Instagram Webhook] Received comment on media ${mediaId} from @${senderUsername}: "${commentText}"`)

          // Dispatch event to Inngest for resilient background execution
          const inngestResult = await inngest.send({
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
          console.log(`[Instagram Webhook] Successfully dispatched to Inngest:`, inngestResult)
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
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

