import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createStripeCheckoutSession } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const authSession = await auth.api.getSession({
      headers: await headers(),
    }).catch(() => null)

    if (!authSession?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 1. Find active workspace for authenticated user
    const workspace = await prisma.workspace.findFirst({
      where: { ownerId: authSession.user.id },
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
      userEmail: authSession.user.email,
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
