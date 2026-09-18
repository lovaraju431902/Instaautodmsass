import { inngest } from "./client"
import { prisma } from "@/lib/prisma"
import { sendInstagramDm, replyToInstagramComment } from "@/lib/instagram"
import { generateAiDmReply, classifyCommentIntent } from "@/lib/openai"

/**
 * Background Job: Process Instagram Comment Webhook Event
 */
export const processInstagramComment = inngest.createFunction(
  { id: "process-instagram-comment", name: "Process Instagram Comment Event" },
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

    // 1. Fetch Instagram Account and Active Automations
    const { account, automations } = await step.run("fetch-automations", async () => {
      const acc = await prisma.instagramAccount.findFirst({
        where: {
          OR: [{ id: instagramAccountId }, { instagramId: instagramAccountId }],
        },
        include: { workspace: true },
      })

      if (!acc) return { account: null, automations: [] }

      const autos = await prisma.automation.findMany({
        where: {
          instagramAccountId: acc.id,
          status: "LIVE",
          triggerType: "COMMENTS",
        },
        include: {
          keywords: true,
        },
      })

      return { account: acc, automations: autos }
    })

    if (!account || automations.length === 0) {
      return { status: "skipped", reason: "No active automations found" }
    }

    // 2. Evaluate each automation against the incoming comment
    for (const auto of automations) {
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

      // 3. Post public comment reply if configured
      if (auto.isPublicReplyOn && auto.publicReplyText && commentId) {
        await step.run(`public-reply-${auto.id}`, async () => {
          await replyToInstagramComment({
            accessToken: account.accessToken,
            commentId,
            replyText: auto.publicReplyText || "Check your DMs! 💬",
          })
        })
      }

      // 4. Generate direct message content (via OpenAI assistant or template)
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

      // 5. Send Instagram DM
      await step.run(`send-dm-${auto.id}`, async () => {
        await sendInstagramDm({
          accessToken: account.accessToken,
          recipientId: senderId,
          messageText: dmMessage,
          buttonText: auto.buttonText || undefined,
          buttonUrl: auto.destinationUrl || undefined,
        })
      })

      // 6. Persist Lead/Contact and Analytics in Database
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
  { id: "process-instagram-dm", name: "Process Direct Message Event" },
  { event: "instagram/dm.received" },
  async ({ event, step }) => {
    const { instagramAccountId, senderId, senderUsername = "friend", messageText } = event.data

    await step.run("handle-dm", async () => {
      const account = await prisma.instagramAccount.findFirst({
        where: {
          OR: [{ id: instagramAccountId }, { instagramId: instagramAccountId }],
        },
      })

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
      }
    })

    return { success: true }
  }
)

export const inngestFunctions = [processInstagramComment, processInstagramDm]
