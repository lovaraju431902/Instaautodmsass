"use client"

import * as React from "react"
import {
  BarChart3,
  CheckCircle2,
  FileText,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureIntro() {
  const features = [
    {
      title: "Auto DM",
      desc: "Send personalized messages based on approved triggers like new followers or story mentions.",
      icon: Send,
      badge: "Core",
    },
    {
      title: "Comment Reply",
      desc: "Respond to post comments instantly with public replies and contextual follow-up DMs.",
      icon: MessageCircle,
      badge: "Popular",
    },
    {
      title: "Audience",
      desc: "Organize contacts, custom tags, and conversation history in one centralized hub.",
      icon: Users,
      badge: "Organize",
    },
    {
      title: "Campaigns",
      desc: "Build repeatable messaging sequences for product launches and event signups.",
      icon: Zap,
      badge: "Automate",
    },
    {
      title: "Analytics",
      desc: "Understand message volume, open rates, replies, and conversion trends with clear metrics.",
      icon: BarChart3,
      badge: "Insights",
    },
    {
      title: "Templates",
      desc: "Create, test, and reuse proven message templates with dynamic variable tags.",
      icon: FileText,
      badge: "Productivity",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Summary */}
          <div className="flex flex-col items-start lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <Sparkles className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>One workspace. Every conversation.</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Everything you need to grow through conversations.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              From automated DMs to comment replies and audience insights, InstaDM
              brings your Instagram messaging workflows into one focused workspace
              built for speed and reliability.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Compliant with official platform messaging guidelines",
                "Personalized message tags ({{first_name}}, {{username}})",
                "Smart delays to keep interactions natural and authentic",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-xs text-stone-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(340_82%_55%)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                className="group h-10 rounded-lg bg-stone-900 px-5 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm"
                onClick={() => {
                  const el = document.getElementById("auto-dm")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span>Explore all capabilities</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: 2x3 Feature Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-[hsl(340_82%_62%/0.12)] group-hover:text-[hsl(340_82%_55%)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold text-stone-600">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-500">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-[11px] font-medium text-stone-400 group-hover:text-stone-700 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
