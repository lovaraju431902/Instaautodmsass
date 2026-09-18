import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data?.object
        const workspaceId = session?.client_reference_id || session?.metadata?.workspaceId
        const customerId = session?.customer
        const subscriptionId = session?.subscription

        if (workspaceId) {
          await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
              planTier: "PRO",
              subscriptionStatus: "ACTIVE",
              stripeCustomerId: customerId ? String(customerId) : null,
              stripeSubId: subscriptionId ? String(subscriptionId) : null,
              monthlyDmLimit: 50000,
              maxIgAccounts: 5,
            },
          })
          console.log(`[Stripe Webhook] Workspace ${workspaceId} upgraded to PRO`)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data?.object
        const subscriptionId = subscription?.id

        if (subscriptionId) {
          await prisma.workspace.updateMany({
            where: { stripeSubId: subscriptionId },
            data: {
              planTier: "FREE",
              subscriptionStatus: "CANCELED",
              monthlyDmLimit: 500,
              maxIgAccounts: 1,
            },
          })
          console.log(`[Stripe Webhook] Subscription ${subscriptionId} canceled, downgraded to FREE`)
        }
        break
      }

      case "customer.subscription.updated": {
        const sub = event.data?.object
        const status = sub?.status === "active" ? "ACTIVE" : "PAST_DUE"
        if (sub?.id) {
          await prisma.workspace.updateMany({
            where: { stripeSubId: sub.id },
            data: { subscriptionStatus: status },
          })
        }
        break
      }

      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error("Stripe webhook processing error:", err)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
