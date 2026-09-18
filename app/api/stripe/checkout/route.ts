import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createStripeCheckoutSession } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    // 1. Find active workspace
    const workspace = await prisma.workspace.findFirst({
      orderBy: { createdAt: "desc" },
      include: { owner: true },
    })

    if (!workspace) {
      return NextResponse.json({ error: "No workspace found" }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))
    const priceId = body.priceId

    // 2. Generate Stripe Checkout URL
    const session = await createStripeCheckoutSession({
      userId: workspace.ownerId,
      userEmail: workspace.owner?.email || "user@instadm.co",
      workspaceId: workspace.id,
      priceId,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("Stripe checkout error:", err)
    return NextResponse.json(
      { error: err?.message || "Failed to initiate checkout" },
      { status: 500 }
    )
  }
}
