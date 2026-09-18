import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Fetch all automations for workspace
export async function GET() {
  try {
    const workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      return NextResponse.json({ automations: [] })
    }

    const automations = await prisma.automation.findMany({
      where: { workspaceId: workspace.id },
      include: { keywords: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ automations })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST: Create a real automation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name = "Comments → DM",
      triggerType = "COMMENTS",
      postTargetType = "SPECIFIC",
      keywords = ["link"],
      openingDmEnabled = true,
      openingMessage = "Hey! Thanks for your comment! 😊",
      buttonText = "Send me the link",
      finalMessage = "Hey! Thanks for asking! Here's your link: [LINK]",
      destinationUrl = "https://instadm.co",
      useAiAssistant = false,
      aiSystemPrompt = "You are a friendly creator assistant. Keep replies concise and give the link.",
    } = body

    // 1. Fetch active workspace & Instagram account
    let workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
    })

    if (!workspace) {
      let user = await prisma.user.findFirst()
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Creator",
            email: "creator@instadm.co",
            emailVerified: true,
          },
        })
      }
      workspace = await prisma.workspace.create({
        data: {
          name: "My Workspace",
          slug: `workspace-${Date.now()}`,
          ownerId: user.id,
        },
      })
    }

    let account = await prisma.instagramAccount.findFirst({
      where: { workspaceId: workspace.id },
    })

    if (!account) {
      account = await prisma.instagramAccount.create({
        data: {
          workspaceId: workspace.id,
          instagramId: `ig_creator_${Date.now()}`,
          username: "coder_431",
          name: "Coder 🤍 💥",
          followersCount: 25,
          accessToken: `token_${Date.now()}`,
          status: "CONNECTED",
        },
      })
    }

    // 2. Create Automation
    const automation = await prisma.automation.create({
      data: {
        workspaceId: workspace.id,
        instagramAccountId: account.id,
        name,
        status: "LIVE",
        triggerType: triggerType.toUpperCase() === "STORIES" ? "STORIES" : "COMMENTS",
        postTargetType: postTargetType === "any" ? "ANY" : "SPECIFIC",
        keywordMatchType: "SPECIFIC_KEYWORD",
        openingDmEnabled,
        openingMessage,
        buttonText,
        finalMessage,
        destinationUrl,
        useAiAssistant: Boolean(useAiAssistant),
        aiSystemPrompt: useAiAssistant ? aiSystemPrompt : null,
      },
    })

    // 3. Create Keywords
    const keywordList = Array.isArray(keywords) ? keywords : ["link"]
    for (const kw of keywordList) {
      const trimmed = String(kw).trim().toLowerCase()
      if (trimmed) {
        await prisma.automationKeyword.create({
          data: {
            automationId: automation.id,
            keyword: trimmed,
          },
        })
      }
    }

    const createdWithKeywords = await prisma.automation.findUnique({
      where: { id: automation.id },
      include: { keywords: true },
    })

    return NextResponse.json({ success: true, automation: createdWithKeywords })
  } catch (err: any) {
    console.error("Create automation error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PATCH: Toggle status (LIVE / PAUSED)
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 })
    }

    const updated = await prisma.automation.update({
      where: { id },
      data: { status: status === "LIVE" ? "LIVE" : "PAUSED" },
    })

    return NextResponse.json({ success: true, automation: updated })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE: Remove automation
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing automation id" }, { status: 400 })
    }

    await prisma.automation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
