"use client"

import * as React from "react"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Filter,
  Send,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrowserFrame } from "./browser-frame"
import { Badge } from "@/components/ui/badge"

export function AutoDMShowcase() {
  return (
    <section id="auto-dm" className="bg-stone-50/50 py-20 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Product UI Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <BrowserFrame url="app.instadm.co/automations/new" title="InstaDM — Create Automation">
              <div className="bg-white p-5 sm:p-7">
                {/* Header inside automation editor */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <h4 className="text-sm font-semibold text-stone-900 sm:text-base">
                        Welcome New Followers
                      </h4>
                      <Badge variant="coral" className="text-[10px]">
                        Trigger: Follow
                      </Badge>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Sends an introductory DM to verified new followers
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-stone-500">
                      Auto-Save On
                    </span>
                  </div>
                </div>

                {/* Automation Workflow Visual Pipeline */}
                <div className="relative mt-6 space-y-4">
                  {/* Step 1: Trigger */}
                  <div className="relative rounded-xl border border-border/80 bg-stone-50/60 p-4 transition-all hover:bg-stone-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)]">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                            Step 1 • Trigger
                          </span>
                          <h5 className="text-xs font-semibold text-stone-800">
                            When user follows account
                          </h5>
                        </div>
                      </div>
                      <Badge variant="subtle" className="text-[10px]">
                        Approved event
                      </Badge>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex justify-center -my-2">
                    <div className="h-6 w-px bg-border" />
                  </div>

                  {/* Step 2: Delay & Condition */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/80 bg-stone-50/60 p-3.5">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Clock className="h-4 w-4 text-stone-500" />
                        <span className="text-xs font-semibold">Wait 2 minutes</span>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500">
                        Adds a human-paced buffer before dispatch
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-stone-50/60 p-3.5">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Filter className="h-4 w-4 text-stone-500" />
                        <span className="text-xs font-semibold">Check contact history</span>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500">
                        Only if not previously messaged
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex justify-center -my-2">
                    <div className="h-6 w-px bg-border" />
                  </div>

                  {/* Step 3: Action & Message Preview */}
                  <div className="rounded-xl border-2 border-[hsl(340_82%_62%/0.4)] bg-[hsl(340_82%_62%/0.02)] p-4 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(340_82%_62%)] text-white">
                          <Send className="h-4 w-4 -rotate-12" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[hsl(340_82%_55%)] uppercase tracking-wider">
                            Step 3 • Action
                          </span>
                          <h5 className="text-xs font-semibold text-stone-900">
                            Send direct message
                          </h5>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500">
                        Variables active
                      </span>
                    </div>

                    {/* Message Preview Box */}
                    <div className="mt-3 rounded-lg border border-border/80 bg-white p-3.5 text-xs text-stone-700 shadow-2xs">
                      <div className="flex items-center justify-between pb-1.5 text-[10px] font-medium text-stone-400 border-b border-border/50">
                        <span>Message template</span>
                        <span>Preview</span>
                      </div>
                      <p className="mt-2 leading-relaxed">
                        Hey <span className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[11px] text-[hsl(340_82%_55%)]">&#123;&#123;first_name&#125;&#125;</span>, thanks for connecting! Here&apos;s our starter resource pack to help you get the most value: <span className="underline text-stone-600">instadm.co/kit</span>. Feel free to reply anytime!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Status bar */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-stone-800">
                        Workflow active
                      </span>
                      <span className="ml-1 text-[11px] text-stone-500 hidden sm:inline">
                        — Everything is running smoothly
                      </span>
                    </div>
                  </div>

                  <Button size="sm" className="bg-stone-900 text-white hover:bg-stone-800 text-xs">
                    Save automation
                  </Button>
                </div>
              </div>
            </BrowserFrame>
          </div>

          {/* Right Column: Copy & Value Proposition (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <Zap className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>Automate the first hello</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Start the right conversation, automatically.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Create personalized DM workflows for supported triggers, so every
              new follower or profile interaction can lead to a thoughtful,
              delightful next step without keeping you tied to your inbox 24/7.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                {
                  title: "Build trigger-based DM workflows",
                  desc: "Trigger messages on new follows, story mentions, or specific tags.",
                },
                {
                  title: "Personalize messages with variables",
                  desc: "Automatically insert follower names, usernames, and dynamic links.",
                },
                {
                  title: "Add delays and conditions",
                  desc: "Keep message delivery looking natural and avoid spamming duplicates.",
                },
                {
                  title: "Review and manage active automations",
                  desc: "Pause, edit, or test workflows in real-time with zero downtime.",
                },
              ].map((bullet) => (
                <li key={bullet.title} className="flex items-start gap-3">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)]">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">
                      {bullet.title}
                    </h4>
                    <p className="text-xs text-stone-500">{bullet.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                variant="outline"
                className="group border-border bg-white text-xs font-semibold text-stone-800 hover:bg-stone-50"
                onClick={() => {
                  const el = document.getElementById("pricing")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span>Explore Auto DM</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
