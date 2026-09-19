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
 * Helper to fetch with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Subscribe Instagram Account to Webhooks (Comments & Messages)
 */
export async function subscribeInstagramAccount(accessToken: string): Promise<boolean> {
  if (accessToken.startsWith("ig_mock_") || accessToken.startsWith("meta_token_")) {
    return true
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/subscribed_apps?subscribed_fields=comments,messages&access_token=${accessToken}`,
      { method: "POST" }
    )
    if (!res.ok) {
      const err = await res.text()
      console.warn("[Instagram Webhook Subscription] Failed:", err)
      return false
    }
    const data = await res.json()
    console.log("[Instagram Webhook Subscription] Successful:", data)
    return Boolean(data.success)
  } catch (err) {
    console.error("[Instagram Webhook Subscription] Error:", err)
    return false
  }
}

/**
 * Fetch Instagram Business/Creator Account Profile Details (Fast, Direct)
 */
export async function fetchInstagramProfile(accessToken: string, userId: string): Promise<InstagramProfile> {
  // Direct, prioritized endpoint list (Instagram Graph API & Facebook Graph API)
  const candidateUrls = [
    `https://graph.instagram.com/me?fields=id,user_id,username,name,profile_picture_url,followers_count&access_token=${accessToken}`,
    `https://graph.facebook.com/v21.0/${userId}?fields=id,user_id,username,name,profile_picture_url,followers_count&access_token=${accessToken}`,
    `https://graph.instagram.com/me?fields=id,user_id,username,name&access_token=${accessToken}`,
    `https://graph.facebook.com/v21.0/me?fields=id,user_id,username,name&access_token=${accessToken}`,
  ]

  for (const url of candidateUrls) {
    try {
      const res = await fetchWithTimeout(url, {}, 3500)
      if (res.ok) {
        const data = await res.json()
        if (data.id || data.username || data.user_id) {
          return {
            id: data.user_id || data.id || userId,
            username: data.username || "creator_account",
            name: data.name || data.username || "Instagram Creator",
            profilePictureUrl: data.profile_picture_url || null,
            followersCount: Number(data.followers_count ?? data.followersCount ?? 0),
          }
        }
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.warn("[Instagram Profile] Candidate endpoint skipped:", err?.message || err)
      }
    }
  }

  return {
    id: userId,
    username: "creator_account",
    name: "Instagram Creator",
    followersCount: 0,
  }
}

export interface InstagramMediaItem {
  id: string
  caption?: string
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REEL"
  mediaUrl?: string
  permalink?: string
  thumbnailUrl?: string
  timestamp: string
  likesCount: number
  commentsCount: number
}

/**
 * Fetch Real Instagram Media (Reels & Posts) from Meta Graph API (Fast, Direct)
 */
export async function fetchInstagramMedia(accessToken: string): Promise<InstagramMediaItem[]> {
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count"
  const candidateUrls = [
    `https://graph.instagram.com/me/media?fields=${fields}&limit=30&access_token=${accessToken}`,
    `https://graph.facebook.com/v21.0/me/media?fields=${fields}&limit=30&access_token=${accessToken}`,
  ]

  for (const url of candidateUrls) {
    try {
      const res = await fetchWithTimeout(url, {}, 4000)
      if (res.ok) {
        const json = await res.json()
        if (Array.isArray(json.data) && json.data.length > 0) {
          return json.data.map((m: any) => ({
            id: m.id,
            caption: m.caption || "No caption",
            mediaType: m.media_type === "VIDEO" ? "REEL" : (m.media_type || "IMAGE"),
            mediaUrl: m.media_url || m.thumbnail_url,
            permalink: m.permalink,
            thumbnailUrl: m.thumbnail_url || m.media_url,
            timestamp: m.timestamp || new Date().toISOString(),
            likesCount: Number(m.like_count || 0),
            commentsCount: Number(m.comments_count || 0),
          }))
        } else if (Array.isArray(json.data) && json.data.length === 0) {
          return []
        }
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.warn("[Instagram Media] Media endpoint skipped:", e?.message || e)
      }
    }
  }

  return []
}

/**
 * Send an Automated Direct Message (DM) via Meta Instagram Graph API
 */
export async function sendInstagramDm({
  accessToken,
  recipientId,
  commentId,
  messageText,
  buttonText,
  buttonUrl,
}: {
  accessToken: string
  recipientId: string
  commentId?: string
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

  // Meta Instagram Graph API requires recipient.comment_id when replying to a comment
  const recipient = commentId ? { comment_id: commentId } : { id: recipientId }

  const res = await fetch(`${INSTAGRAM_BASE_URL}/v21.0/me/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      recipient,
      message: messagePayload,
    }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Meta Graph API DM send error:", errorText)
    throw new Error(`Meta Graph API DM send error: ${errorText}`)
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
