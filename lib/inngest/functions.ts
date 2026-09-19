import { inngest } from "./client"
import { prisma } from "@/lib/prisma"
import { sendInstagramDm, replyToInstagramComment } from "@/lib/instagram"
import { generateAiDmReply, classifyCommentIntent } from "@/lib/openai"

/**
 * Background Job: Process Instagram Comment Webhook Event
 * - Concurrency limited to 3 per account to prevent Meta API rate-limiting
 * - Validates post target (SPECIFIC vs ANY)
 * - Anti-spam randomized delay before DM
 * - Duplicate comment suppression
 */
export const processInstagramComment = inngest.createFunction(
  {
    id: "process-instagram-comment",
    name: "Process Instagram Comment Event",
    concurrency: {
      limit: 3,
      key: "event.data.instagramAccountId",
    },
    retries: 2,
  },
  { event: "instagram/comment.received" },
  async ({ event, step }) => {
    const {
      instagramAccountId,
      mediaId,
      commentId,
      commentText,
      senderId,
      senderUsername = "user",
    } = event.data

    // 1. Fetch Instagram Account and Active Automations with Specific Post relation
    const { account, automations } = await step.run("fetch-automations", async () => {
      let acc = await prisma.instagramAccount.findFirst({
        where: {
          OR: [
            { id: instagramAccountId },
            { instagramId: instagramAccountId },
            { facebookPageId: instagramAccountId },
          ],
        },
        include: { workspace: true },
      })

      // Resilient fallback: match by connected active account
      if (!acc) {
        acc = await prisma.instagramAccount.findFirst({
          where: { status: "CONNECTED" },
          include: { workspace: true },
        })
      }

      if (!acc) return { account: null, automations: [] }

      const autos = await prisma.automation.findMany({
        where: {
          instagramAccountId: acc.id,
          status: "LIVE",
          triggerType: "COMMENTS",
        },
        include: {
          keywords: true,
          specificPost: true,
        },
      })

      return { account: acc, automations: autos }
    })

    if (!account || automations.length === 0) {
      return { status: "skipped", reason: "No active automations found" }
    }

    // 2. Evaluate each automation against the incoming comment
    for (const auto of automations) {
      // Check 1: Post Target Filter (if automation is only for a specific post)
      if (auto.postTargetType === "SPECIFIC" && auto.specificPost?.mediaId) {
        if (mediaId && auto.specificPost.mediaId !== mediaId) {
          continue // Comment is on a different post, skip
        }
      }

      // Check 2: Duplicate Suppression (if user already triggered this automation in the last 24h)
      if (auto.filterDuplicates) {
        const isDuplicate = await step.run(`check-duplicate-${auto.id}`, async () => {
          const alreadySent = await prisma.activityLog.findFirst({
            where: {
              automationId: auto.id,
              contact: { instagramUserId: senderId },
              eventType: "FINAL_DM_SENT",
              createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            },
          })
          return Boolean(alreadySent)
        })

        if (isDuplicate) {
          console.log(`[Inngest] Skipping duplicate DM to @${senderUsername} for automation ${auto.id}`)
          continue
        }
      }

      // Check 3: Keyword / Intent Match
      const keywords = auto.keywords.map((k: { keyword: string }) => k.keyword)

      const intentMatch = await step.run(`check-match-${auto.id}`, async () => {
        if (auto.keywordMatchType === "ANY_WORD") {
          return { matches: true }
        }
        return await classifyCommentIntent({
          commentText,
          targetKeywords: keywords,
        })
      })

      if (!intentMatch.matches) continue

      // Check 4: Natural Anti-Spam Delay (simulates human timing so Instagram doesn't flag as bot)
      if (auto.randomizeDelay) {
        const delaySec = Math.max(1, Math.min(4, Math.round((auto.delayMinSeconds + auto.delayMaxSeconds) / 2))) || 2
        await step.sleep(`anti-spam-delay-${auto.id}`, `${delaySec}s`)
      }

      // Step 5: Post public comment reply if configured
      if (auto.isPublicReplyOn && auto.publicReplyText && commentId) {
        await step.run(`public-reply-${auto.id}`, async () => {
          await replyToInstagramComment({
            accessToken: account.accessToken,
            commentId,
            replyText: auto.publicReplyText || "Check your DMs! 💬",
          })
        })
      }

      // Step 6: Generate direct message content (via OpenAI assistant or template)
      const dmMessage = await step.run(`generate-message-${auto.id}`, async () => {
        if (auto.useAiAssistant) {
          return await generateAiDmReply({
            commentText,
            systemPrompt: auto.aiSystemPrompt || undefined,
            leadUsername: senderUsername,
            destinationUrl: auto.destinationUrl || "",
          })
        }
        return auto.finalMessage
      })

      // Step 7: Send Instagram DM via Meta Graph API (Private Replies to comment)
      await step.run(`send-dm-${auto.id}`, async () => {
        await sendInstagramDm({
          accessToken: account.accessToken,
          recipientId: senderId,
          commentId,
          messageText: dmMessage,
          buttonText: auto.buttonText || undefined,
          buttonUrl: auto.destinationUrl || undefined,
        })
      })

      // Step 8: Persist Lead/Contact and Analytics in Database
      await step.run(`record-analytics-${auto.id}`, async () => {
        // Upsert Contact
        const contact = await prisma.contact.upsert({
          where: {
            instagramAccountId_instagramUserId: {
              instagramAccountId: account.id,
              instagramUserId: senderId,
            },
          },
          update: {
            username: senderUsername,
            totalDmsReceived: { increment: 1 },
            lastInteractionAt: new Date(),
          },
          create: {
            workspaceId: account.workspaceId,
            instagramAccountId: account.id,
            instagramUserId: senderId,
            username: senderUsername,
            totalDmsReceived: 1,
          },
        })

        // Increment counters
        await prisma.automation.update({
          where: { id: auto.id },
          data: { dmsSentCount: { increment: 1 } },
        })

        await prisma.workspace.update({
          where: { id: account.workspaceId },
          data: { dmsSentThisMonth: { increment: 1 } },
        })

        // Log Activity Event
        await prisma.activityLog.create({
          data: {
            workspaceId: account.workspaceId,
            automationId: auto.id,
            contactId: contact.id,
            eventType: "FINAL_DM_SENT",
            status: "SUCCESS",
            messageText: dmMessage,
            metadata: {
              commentText,
              senderUsername,
              mediaId,
            },
          },
        })
      })

      return { status: "processed", automationId: auto.id, sentTo: senderUsername }
    }

    return { status: "no_keyword_match" }
  }
)

/**
 * Background Job: Process Instagram Direct Message Webhook Event
 */
export const processInstagramDm = inngest.createFunction(
  {
    id: "process-instagram-dm",
    name: "Process Direct Message Event",
    concurrency: {
      limit: 3,
      key: "event.data.instagramAccountId",
    },
    retries: 2,
  },
  { event: "instagram/dm.received" },
  async ({ event, step }) => {
    const { instagramAccountId, senderId, senderUsername = "friend", messageText } = event.data

    await step.run("handle-dm", async () => {
      let account = await prisma.instagramAccount.findFirst({
        where: {
          OR: [
            { id: instagramAccountId },
            { instagramId: instagramAccountId },
            { facebookPageId: instagramAccountId },
          ],
        },
        include: { workspace: true },
      })

      if (!account) {
        account = await prisma.instagramAccount.findFirst({
          where: { status: "CONNECTED" },
          include: { workspace: true },
        })
      }

      if (!account) return

      const auto = await prisma.automation.findFirst({
        where: {
          instagramAccountId: account.id,
          status: "LIVE",
          triggerType: "KEYWORDS",
        },
        include: { keywords: true },
      })

      if (!auto) return

      const keywords = auto.keywords.map((k) => k.keyword.toLowerCase())
      const isMatch = keywords.some((k) => messageText.toLowerCase().includes(k))

      if (isMatch) {
        await sendInstagramDm({
          accessToken: account.accessToken,
          recipientId: senderId,
          messageText: auto.finalMessage,
          buttonText: auto.buttonText || undefined,
          buttonUrl: auto.destinationUrl || undefined,
        })

        // Record Contact
        const contact = await prisma.contact.upsert({
          where: {
            instagramAccountId_instagramUserId: {
              instagramAccountId: account.id,
              instagramUserId: senderId,
            },
          },
          update: {
            username: senderUsername,
            totalDmsReceived: { increment: 1 },
            lastInteractionAt: new Date(),
          },
          create: {
            workspaceId: account.workspaceId,
            instagramAccountId: account.id,
            instagramUserId: senderId,
            username: senderUsername,
            totalDmsReceived: 1,
          },
        })

        await prisma.automation.update({
          where: { id: auto.id },
          data: { dmsSentCount: { increment: 1 } },
        })

        await prisma.workspace.update({
          where: { id: account.workspaceId },
          data: { dmsSentThisMonth: { increment: 1 } },
        })

        await prisma.activityLog.create({
          data: {
            workspaceId: account.workspaceId,
            automationId: auto.id,
            contactId: contact.id,
            eventType: "FINAL_DM_SENT",
            status: "SUCCESS",
            messageText: auto.finalMessage,
            metadata: {
              trigger: "DM_KEYWORD",
              senderUsername,
              messageText,
            },
          },
        })
      }
    })

    return { success: true }
  }
)

export const inngestFunctions = [processInstagramComment, processInstagramDm]
