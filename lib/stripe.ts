const STRIPE_CLIENT_SECRET = process.env.STRIPE_CLIENT_SECRET || ""
export const STRIPE_SUBSCRIPTION_PRICE_ID =
  process.env.STRIPE_SUBSCRIPTION_PRICE_ID || "price_1OzDemoDemo000000000000"
const NEXT_PUBLIC_HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"

/**
 * Create Stripe Checkout Session for Subscription
 */
export async function createStripeCheckoutSession({
  userId,
  userEmail,
  workspaceId,
  priceId = STRIPE_SUBSCRIPTION_PRICE_ID,
}: {
  userId: string
  userEmail: string
  workspaceId: string
  priceId?: string
}): Promise<{ url: string; sessionId?: string }> {
  // If demo credentials, provide mock checkout flow redirect
  if (!STRIPE_CLIENT_SECRET || STRIPE_CLIENT_SECRET.startsWith("sk_test_51Demo")) {
    return {
      url: `${NEXT_PUBLIC_HOST_URL}/dashboard?billing=demo_success`,
      sessionId: `cs_mock_${Date.now()}`,
    }
  }

  const params = new URLSearchParams()
  params.append("mode", "subscription")
  params.append("success_url", `${NEXT_PUBLIC_HOST_URL}/dashboard?billing=success&session_id={CHECKOUT_SESSION_ID}`)
  params.append("cancel_url", `${NEXT_PUBLIC_HOST_URL}/pricing?billing=cancelled`)
  params.append("customer_email", userEmail)
  params.append("client_reference_id", workspaceId)
  params.append("line_items[0][price]", priceId)
  params.append("line_items[0][quantity]", "1")
  params.append("metadata[userId]", userId)
  params.append("metadata[workspaceId]", workspaceId)

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_CLIENT_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Stripe Checkout session failed: ${errorText}`)
  }

  const session = await res.json()
  return { url: session.url, sessionId: session.id }
}

/**
 * Create Stripe Customer Portal Session
 */
export async function createStripePortalSession(customerId: string): Promise<{ url: string }> {
  if (!STRIPE_CLIENT_SECRET || STRIPE_CLIENT_SECRET.startsWith("sk_test_51Demo")) {
    return { url: `${NEXT_PUBLIC_HOST_URL}/pricing` }
  }

  const params = new URLSearchParams()
  params.append("customer", customerId)
  params.append("return_url", `${NEXT_PUBLIC_HOST_URL}/dashboard`)

  const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_CLIENT_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Stripe Portal session failed: ${errorText}`)
  }

  const portal = await res.json()
  return { url: portal.url }
}
