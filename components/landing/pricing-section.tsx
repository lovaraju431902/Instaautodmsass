"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* 
  NOTE: Pricing figures below represent placeholder values for product preview.
  Replace with official commercial terms once confirmed.
*/

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      cadence: "/ month",
      desc: "For exploring the basics and testing initial automations.",
      badge: null,
      features: [
        "1 active automation workflow",
        "Up to 200 automated DMs / mo",
        "Standard comment reply trigger",
        "Basic message templates",
        "7-day activity history",
      ],
      cta: "Start for free",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      cadence: "/ month",
      desc: "For creators, brands, and growing businesses scaling messaging.",
      badge: "Most popular",
      features: [
        "Unlimited active workflows",
        "Up to 5,000 automated DMs / mo",
        "Keyword & story mention triggers",
        "Dynamic personalization variables",
        "Audience CRM & contact tagging",
        "Full analytics & reporting",
        "Priority community support",
      ],
      cta: "Start Pro",
      variant: "default" as const,
      popular: true,
    },
    {
      name: "Agency",
      price: "Custom",
      cadence: "",
      desc: "For agencies and teams managing multiple client brands.",
      badge: null,
      features: [
        "Multiple client workspaces",
        "Team seat permissions & roles",
        "Custom webhook integrations",
        "Dedicated account onboarding",
        "Custom volume agreements",
        "SLA & priority response",
      ],
      cta: "Contact sales",
      variant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="bg-stone-50/50 py-20 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <Sparkles className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>Simple plans for every stage</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Start small. Scale when you&apos;re ready.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Choose the plan that fits your current workflow. Upgrade anytime as
            your messaging volume and team requirements expand.
          </p>

          <p className="mt-2 text-xs text-stone-400">
            * All plans include a 14-day free trial with full feature access.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 transition-all ${
                plan.popular
                  ? "border-2 border-stone-900 shadow-lg ring-4 ring-stone-900/5 -translate-y-1"
                  : "border border-border/80 shadow-2xs hover:border-border hover:shadow-xs"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-stone-900 px-3 py-0.5 text-xs font-medium text-white shadow-sm">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div>
                {/* Plan Name & Desc */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-stone-900">
                    {plan.name}
                  </h3>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-stone-500">
                  {plan.desc}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-stone-900">
                    {plan.price}
                  </span>
                  {plan.cadence && (
                    <span className="text-xs font-medium text-stone-500">
                      {plan.cadence}
                    </span>
                  )}
                </div>

                {/* Feature List */}
                <div className="mt-6 pt-6 border-t border-border/60">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Included features
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="h-4 w-4 shrink-0 text-[hsl(340_82%_55%)] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-4">
                <Link
                  href="/pricing"
                  className={`w-full inline-flex items-center justify-center rounded-xl py-2.5 text-xs font-semibold transition-all ${
                    plan.popular
                      ? "bg-stone-900 text-white hover:bg-stone-800 shadow"
                      : "border border-border bg-white text-stone-800 hover:bg-stone-50"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
