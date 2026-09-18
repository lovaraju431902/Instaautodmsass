export interface GenerateAiReplyOptions {
  commentText: string
  postCaption?: string
  systemPrompt?: string
  leadUsername?: string
  destinationUrl?: string
}

export interface IntentClassificationOptions {
  commentText: string
  targetKeywords: string[]
}

// Support both OpenRouter and official OpenAI keys
const API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPEN_AI_KEY || ""
const IS_OPENROUTER = API_KEY.startsWith("sk-or-") || Boolean(process.env.OPENROUTER_API_KEY)

const ENDPOINT = IS_OPENROUTER
  ? "https://openrouter.ai/api/v1/chat/completions"
  : "https://api.openai.com/v1/chat/completions"

// OpenRouter expects "openai/gpt-4o-mini" or other provider prefixes
const MODEL = IS_OPENROUTER ? "openai/gpt-4o-mini" : "gpt-4o-mini"

function getRequestHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }

  if (IS_OPENROUTER) {
    headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
    headers["X-Title"] = "InstaDM Automation SaaS"
  }

  return headers
}

/**
 * Generate a smart AI direct message reply based on Instagram post context and comment
 */
export async function generateAiDmReply({
  commentText,
  postCaption = "",
  systemPrompt = "You are an engaging, friendly Instagram creator assistant. Respond directly to the user's comment with excitement, answer any implied question, and give them the link naturally.",
  leadUsername = "friend",
  destinationUrl = "",
}: GenerateAiReplyOptions): Promise<string> {
  if (!API_KEY || API_KEY.startsWith("sk-proj-demo")) {
    const cleanLead = leadUsername.replace(/^@/, "")
    return `Hey @${cleanLead}! 😊 Thanks for reaching out about our latest post! Here's the link you requested: ${destinationUrl || "https://instadm.co/access"} - Let me know if you need anything else!`
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: getRequestHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `${systemPrompt}\nKeep the response concise (1-3 sentences), warm, and suitable for Instagram Direct Messages. Include the link: ${destinationUrl || "[Link]"}.`,
          },
          {
            role: "user",
            content: `Instagram Post Caption: "${postCaption}"\nUser @${leadUsername} commented: "${commentText}"`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[AI API Error]:", response.status, errorText)
      // If OpenRouter 404 or specific model error, retry with free fast fallback
      if (IS_OPENROUTER) {
        const fallbackRes = await fetch(ENDPOINT, {
          method: "POST",
          headers: getRequestHeaders(),
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-lite-001",
            messages: [
              {
                role: "system",
                content: `${systemPrompt}\nConcise DM reply with link: ${destinationUrl}`,
              },
              {
                role: "user",
                content: `Comment: "${commentText}" from @${leadUsername}`,
              },
            ],
            max_tokens: 150,
          }),
        })
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json()
          return (
            fallbackData.choices?.[0]?.message?.content?.trim() ||
            `Hey @${leadUsername.replace(/^@/, "")}! Here is your link: ${destinationUrl}`
          )
        }
      }

      return `Hey @${leadUsername.replace(/^@/, "")}! 😊 Thanks for commenting! Here is the link you requested: ${destinationUrl}`
    }

    const data = await response.json()
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      `Hey @${leadUsername}! Here is your link: ${destinationUrl}`
    )
  } catch (error) {
    console.error("Failed to generate AI DM reply:", error)
    return `Hey @${leadUsername.replace(/^@/, "")}! Thanks for your interest! Here is the link you asked for: ${destinationUrl}`
  }
}

/**
 * Classify if a comment has intent to trigger the automation,
 * either by exact keyword matching or contextual AI semantic intent.
 */
export async function classifyCommentIntent({
  commentText,
  targetKeywords,
}: IntentClassificationOptions): Promise<{ matches: boolean; matchedKeyword?: string }> {
  const normalizedComment = commentText.toLowerCase().trim()

  // 1. Direct keyword check
  for (const kw of targetKeywords) {
    const cleanKw = kw.toLowerCase().trim()
    if (cleanKw && normalizedComment.includes(cleanKw)) {
      return { matches: true, matchedKeyword: cleanKw }
    }
  }

  // 2. If no API key is active, stop here
  if (!API_KEY || API_KEY.startsWith("sk-proj-demo")) {
    return { matches: false }
  }

  // 3. Semantic AI intent matching
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: getRequestHeaders(),
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `You are an intent classification engine for an Instagram DM automation SaaS.
Determine if the user's comment expresses interest in getting a link, info, price, or product related to these keywords: [${targetKeywords.join(", ")}].
Return JSON strictly in the format: {"matches": true, "reason": "user is asking for details"} or {"matches": false, "reason": "unrelated"}.`,
          },
          {
            role: "user",
            content: `Comment: "${commentText}"`,
          },
        ],
        max_tokens: 60,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      const content = data.choices?.[0]?.message?.content || "{}"
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content)
        return { matches: Boolean(parsed.matches), matchedKeyword: targetKeywords[0] }
      } catch {
        return { matches: false }
      }
    }
  } catch (err) {
    console.error("Semantic intent classification error:", err)
  }

  return { matches: false }
}
