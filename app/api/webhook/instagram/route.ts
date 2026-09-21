import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { inngest } from "@/lib/inngest/client"

const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || "instadm_webhook_secret_token_2026"
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.INSTAGRAM_CLIENT_SECRET || ""

/**
 * Verify Meta HMAC-SHA256 Webhook Signature
 * Protects against webhook spoofing and DDoS attacks
 */
function isValidMetaSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    return false
  }

  try {
    const expectedHash = crypto.createHmac("sha256", secret).update(rawBody).digest("hex")
    const expectedSignature = `sha256=${expectedHash}`

    const sigBuffer = Buffer.from(signatureHeader)
    const expectedBuffer = Buffer.from(expectedSignature)

    if (sigBuffer.length !== expectedBuffer.length) {
      return false
    }

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  } catch (err) {
    console.error("[Instagram Webhook] Signature verification error:", err)
    return false
  }
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

    // Security Check: Verify HMAC-SHA256 signature from Meta
    if (APP_SECRET) {
      if (signatureHeader) {
        const isValid = isValidMetaSignature(rawBody, signatureHeader, APP_SECRET)
        if (!isValid) {
          console.warn("[Instagram Webhook] Rejected: Invalid x-hub-signature-256")
          return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
        }
      } else if (process.env.NODE_ENV === "production") {
        console.warn("[Instagram Webhook] Rejected: Missing x-hub-signature-256 header in production")
        return NextResponse.json({ error: "Missing signature header" }, { status: 401 })
      } else {
        console.info("[Instagram Webhook] Local dev: Processing webhook without signature header")
      }
    }

    const body = JSON.parse(rawBody)

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

          console.log(`[Instagram Webhook] Received comment on media ${mediaId} from @${senderUsername}: "${commentText}"`)

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
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

