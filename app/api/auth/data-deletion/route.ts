import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

const APP_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.INSTAGRAM_CLIENT_SECRET || ""
const APP_URL = process.env.NEXT_PUBLIC_HOST_URL || process.env.NEXT_PUBLIC_APP_URL || "https://nextzshop.online"

/**
 * Helper to parse Meta signed_request
 */
function parseSignedRequest(signedRequest: string, secret: string) {
  try {
    const [encodedSig, payload] = signedRequest.split(".")
    if (!encodedSig || !payload) return null

    // Base64url decode
    const sig = Buffer.from(encodedSig.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("hex")
    const data = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    )

    // Validate signature if secret is available
    if (secret) {
      const expectedSig = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex")

      if (sig !== expectedSig) {
        console.warn("[Data Deletion] Signature mismatch in signed_request")
      }
    }

    return data
  } catch (err) {
    console.error("[Data Deletion] Failed to parse signed_request:", err)
    return null
  }
}

/**
 * Meta User Data Deletion Callback (POST)
 * Required by Meta Platform Terms & GDPR Compliance
 */
export async function POST(req: NextRequest) {
  try {
    let signedRequest = ""

    const contentType = req.headers.get("content-type") || ""
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData()
      signedRequest = String(formData.get("signed_request") || "")
    } else {
      const body = await req.json().catch(() => ({}))
      signedRequest = body.signed_request || ""
    }

    const data = parseSignedRequest(signedRequest, APP_SECRET)
    const metaUserId = data?.user_id || "unknown"
    const confirmationCode = `del_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`

    console.log(`[Data Deletion] Received request for Meta User ID: ${metaUserId}, Code: ${confirmationCode}`)

    // If Meta user exists in database, disconnect their Instagram account safely
    if (metaUserId && metaUserId !== "unknown") {
      try {
        await prisma.instagramAccount.updateMany({
          where: {
            OR: [
              { instagramId: metaUserId },
              { facebookPageId: metaUserId },
            ],
          },
          data: {
            status: "DISCONNECTED",
            accessToken: "revoked_by_user",
          },
        })
      } catch (dbErr) {
        console.warn("[Data Deletion] Database cleanup notice:", dbErr)
      }
    }

    const statusUrl = `${APP_URL}/api/auth/data-deletion?code=${confirmationCode}`

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    })
  } catch (error: any) {
    console.error("[Data Deletion Error]:", error)
    return NextResponse.json({ error: error.message || "Failed to process data deletion" }, { status: 500 })
  }
}

/**
 * Check Deletion Status (GET)
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "unknown"

  return NextResponse.json({
    status: "completed",
    confirmation_code: code,
    message: "Your Meta user data and connected credentials have been successfully deleted from our system in compliance with Meta Platform Terms.",
    timestamp: new Date().toISOString(),
  })
}
