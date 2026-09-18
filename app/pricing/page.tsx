"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
  MessageCircle,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const router = useRouter()
  const [annual, setAnnual] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval: annual ? "year" : "month" }),
      })

      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        router.push("/dashboard?billing=demo_pro")
      }
    } catch (err) {
      console.error(err)
      router.push("/dashboard?billing=demo_pro")
    } finally {
      setLoading(false)
    }
  }

  const tiers = [
    {
      name: "Starter",
      id: "tier-starter",
      priceMonthly: "$0",
      priceAnnual: "$0",
      description: "For new creators just getting started with automated comment triggers.",
      features: [
        "500 automated DMs per month",
        "1 connected Instagram account",
        "Post & Reel comment keyword triggers",
        "Basic keyword auto-responses",
        "Community support",
      ],
      popular: false,
      ctaText: "Current Plan",
      ctaVariant: "outline" as const,
      onClick: () => router.push("/dashboard"),
    },
    {
      name: "Pro Creator",
      id: "tier-pro",
      priceMonthly: "$29",
      priceAnnual: "$23",
      period: "/month",
      description: "Everything you need to convert viral reels and comments into paying customers.",
      features: [
        "Unlimited automated DMs & link delivery",
        "Up to 5 Instagram business accounts",
        "OpenAI Conversational Assistant (Smart Replies)",
        "Inngest Instant Webhook Event Processing",
        "Anti-spam smart delays & follow check",
        "Public comment auto-replies",
        "Complete Lead & Audience CRM",
        "Priority 24/7 Creator Support",
      ],
      popular: true,
      ctaText: loading ? "Redirecting to Stripe..." : "Upgrade to Pro",
      ctaVariant: "default" as const,
      onClick: handleCheckout,
    },
  ]

  const faqs = [
    {
      q: "Does InstaDM comply with Meta Instagram policies?",
      a: "Yes! InstaDM connects exclusively through official Meta Graph API webhooks and official OAuth permissions. Your account is 100% safe and compliant.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Absolutely. You can manage or cancel your subscription at any time with one click directly in your billing settings.",
    },
    {
      q: "How does the OpenAI integration work?",
      a: "The OpenAI Assistant analyzes comments in real time, determines user intent, and crafts personalized DM messages that match your brand tone while delivering your links.",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between px-6 sm:px-12 border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <Link href="/" className="font-black text-lg tracking-wider uppercase text-stone-950 flex items-center gap-2">
          <span>INSTADM</span>
          <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
            PRO
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-stone-600 hover:text-stone-950 transition"
          >
            Dashboard
          </Link>
          <Button
            size="sm"
            onClick={handleCheckout}
            disabled={loading}
            className="rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold px-4"
          >
            Get Pro
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-8 max-w-5xl mx-auto w-full space-y-16">
        {/* Title Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/70 px-3.5 py-1 text-xs font-semibold text-rose-700">
            <Sparkles className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>Scale your Instagram revenue 24/7</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
            Simple, Transparent Pricing
          </h1>

          <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto">
            Choose the plan that fits your growth. Turn viral Instagram views into clicks, leads, and sales automatically.
          </p>

          {/* Billing Switch */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={!annual ? "text-stone-950 font-bold" : "text-stone-400"}>Monthly</span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                annual ? "bg-stone-950" : "bg-stone-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={annual ? "text-stone-950 font-bold" : "text-stone-400"}>
              Annual <span className="text-emerald-600 text-[10px] font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all ${
                tier.popular
                  ? "border-2 border-stone-950 bg-white shadow-xl shadow-stone-900/5 ring-4 ring-stone-950/5"
                  : "border border-stone-200/90 bg-white/70 shadow-xs"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-950">{tier.name}</h3>
                  {tier.popular && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                      <Zap className="h-4 w-4 fill-rose-500" />
                    </div>
                  )}
                </div>

                <p className="mt-2 text-xs text-stone-500 leading-relaxed">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight text-stone-950">
                    {annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  {tier.period && (
                    <span className="text-xs font-medium text-stone-400">{tier.period}</span>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    What&apos;s included:
                  </p>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  onClick={tier.onClick}
                  disabled={loading && tier.popular}
                  className={`w-full h-12 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
                    tier.popular
                      ? "bg-[hsl(340_82%_62%)] hover:bg-[hsl(340_82%_55%)] text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="pt-8 border-t border-stone-200 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-stone-950">Frequently Asked Questions</h2>
            <p className="text-xs text-stone-500">Everything you need to know about billing and limits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-stone-200/80 bg-white p-5 space-y-2 shadow-2xs">
                <h4 className="text-xs font-bold text-stone-900">{faq.q}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-400">
        <p>© 2026 InstaDM. Built for creators and business brands on Meta Instagram.</p>
      </footer>
    </div>
  )
}
