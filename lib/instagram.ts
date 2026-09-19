const INSTAGRAM_BASE_URL = process.env.INSTAGRAM_BASE_URL || "https://graph.instagram.com"
const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_APP_ID || process.env.INSTAGRAM_CLIENT_ID || ""
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.INSTAGRAM_CLIENT_SECRET || ""
const INSTAGRAM_TOKEN_URL = process.env.INSTAGRAM_TOKEN_URL || "https://api.instagram.com/oauth/access_token"
const NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || process.env.NEXT_PUBLIC_APP_URL || "https://nextzshop.online"
const INSTAGRAM_REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI || `${NEXT_PUBLIC_HOST_URL}/callback/instagram`

export interface InstagramProfile {
  id: string
  username: string
  name?: string
  profilePictureUrl?: string
  followersCount: number
}

/**
 * Exchange Meta OAuth Code for Access Token
 */
export async function exchangeCodeForTokens(code: string): Promise<{
  accessToken: string
  userId: string
  expiresIn?: number
}> {
  const cleanCode = code.trim().replace(/#_$/, "").split("#")[0]

  if (!INSTAGRAM_CLIENT_ID || !INSTAGRAM_CLIENT_SECRET) {
    throw new Error(
      "Missing Meta/Instagram App ID or App Secret. Please configure INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET in environment variables."
    )
  }

  const redirectUri = INSTAGRAM_REDIRECT_URI

  const body = new URLSearchParams({
    client_id: INSTAGRAM_CLIENT_ID,
    client_secret: INSTAGRAM_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: cleanCode,
  })

  const res = await fetch(INSTAGRAM_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  if (!res.ok) {
    const errorText = await res.text()
    let parsedMessage = errorText
    try {
      const errJson = JSON.parse(errorText)
      parsedMessage =
        errJson.error_message ||
        errJson.error?.message ||
        errJson.message ||
        errorText
    } catch {}
    throw new Error(`Instagram OAuth exchange failed: ${parsedMessage}`)
  }

  const data = await res.json()
  const shortLivedToken = data.access_token
  const userId = String(data.user_id)

  // Exchange short-lived token for 60-day long-lived token
  try {
    const longLivedRes = await fetch(
      `${INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_CLIENT_SECRET}&access_token=${shortLivedToken}`
    )
    if (longLivedRes.ok) {
      const longLivedData = await longLivedRes.json()
      return {
        accessToken: longLivedData.access_token,
        userId,
        expiresIn: longLivedData.expires_in || 5184000,
      }
    } else {
      const longLivedErr = await longLivedRes.text()
      console.warn("Long-lived token exchange returned non-200:", longLivedErr)
    }
  } catch (err) {
    console.error("Failed to exchange for long-lived token, using short-lived:", err)
  }

  return {
    accessToken: shortLivedToken,
    userId,
    expiresIn: 3600,
  }
}

/**
 * Fetch Instagram Business/Creator Account Profile Details
 */
export async function fetchInstagramProfile(accessToken: string, userId: string): Promise<InstagramProfile> {

  // 1. Try full fields endpoint (standard for Instagram Business Login)
  try {
    const url = `${INSTAGRAM_BASE_URL}/v21.0/me?fields=id,username,name,profile_picture_url,followers_count&access_token=${accessToken}`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      return {
        id: data.id || userId,
        username: data.username || "creator_account",
        name: data.name || data.username || "Instagram Creator",
        profilePictureUrl: data.profile_picture_url,
        followersCount: data.followers_count || 0,
      }
    }

    // 2. Fallback to basic fields if followers_count permission is restricted
    const basicUrl = `${INSTAGRAM_BASE_URL}/v21.0/me?fields=id,username,name,profile_picture_url&access_token=${accessToken}`
    const basicRes = await fetch(basicUrl)
    if (basicRes.ok) {
      const basicData = await basicRes.json()
      return {
        id: basicData.id || userId,
        username: basicData.username || "creator_account",
        name: basicData.name || basicData.username || "Instagram Creator",
        profilePictureUrl: basicData.profile_picture_url,
        followersCount: 0,
      }
    }
  } catch (err) {
    console.error("Error fetching Instagram profile from Graph API:", err)
  }

  // Fallback profile if graph permission is still pending review
  return {
    id: userId,
    username: "creator_account",
    name: "Instagram Creator",
    followersCount: 150,
  }
}

/**
 * Send an Automated Direct Message (DM) via Meta Instagram Graph API
 */
export async function sendInstagramDm({
  accessToken,
  recipientId,
  messageText,
  buttonText,
  buttonUrl,
}: {
  accessToken: string
  recipientId: string
  messageText: string
  buttonText?: string
  buttonUrl?: string
}) {
  if (accessToken.startsWith("ig_mock_")) {
    console.log(`[Mock Meta API] DM successfully sent to ${recipientId}: "${messageText}"`)
    return { success: true, messageId: `mid_mock_${Date.now()}` }
  }

  let messagePayload: any = { text: messageText }

  // If a CTA button is configured, format as generic template or button template
  if (buttonText && buttonUrl) {
    messagePayload = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: messageText,
          buttons: [
            {
              type: "web_url",
              url: buttonUrl,
              title: buttonText,
            },
          ],
        },
      },
    }
  }

  const res = await fetch(`${INSTAGRAM_BASE_URL}/v21.0/me/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: messagePayload,
    }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Meta Graph API DM send error:", errorText)
    return { success: false, error: errorText }
  }

  const result = await res.json()
  return { success: true, messageId: result.message_id }
}

/**
 * Post Public Reply to an Instagram Comment
 */
export async function replyToInstagramComment({
  accessToken,
  commentId,
  replyText,
}: {
  accessToken: string
  commentId: string
  replyText: string
}) {
  if (accessToken.startsWith("ig_mock_")) {
    console.log(`[Mock Meta API] Replied to comment ${commentId}: "${replyText}"`)
    return { success: true, id: `reply_mock_${Date.now()}` }
  }

  const res = await fetch(`${INSTAGRAM_BASE_URL}/v21.0/${commentId}/replies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ message: replyText }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error("Meta Graph API comment reply error:", err)
    return { success: false, error: err }
  }

  return { success: true, data: await res.json() }
}
