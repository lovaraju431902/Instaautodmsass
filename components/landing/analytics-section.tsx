"use client"

import * as React from "react"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  LineChart,
  MessageSquare,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrowserFrame } from "./browser-frame"
import { Badge } from "@/components/ui/badge"
import { NumberAnimation } from "@/components/animation/number-animation"

export function AnalyticsSection() {
  const [timeRange, setTimeRange] = React.useState("Last 30 days")

  const workflowStats = [
    { name: "Welcome New Followers", sent: 1248, replies: 312, rate: "25.0%", status: "Healthy" },
    { name: "Guide Comment Drop", sent: 890, replies: 445, rate: "50.0%", status: "Top performer" },
    { name: "Story Mention Shoutout", sent: 410, replies: 98, rate: "23.9%", status: "Healthy" },
    { name: "VIP Customer Check-in", sent: 165, replies: 62, rate: "37.5%", status: "Active" },
  ]

  return (
    <section id="analytics" className="bg-stone-50/50 py-20 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Copy & Insights (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <BarChart3 className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>See what&apos;s happening</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Make every workflow easier to understand.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Track messaging activity, replies, and workflow performance from a
              clear, focused dashboard. Understand what content resonates and
              which automations drive meaningful interactions.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                {
                  title: "Accurate trigger & dispatch metrics",
                  desc: "View exact numbers of delivered, opened, and replied messages across any timeframe.",
                },
                {
                  title: "Workflow comparison insights",
                  desc: "Easily compare conversion rates between comment keywords and DM welcome flows.",
                },
                {
                  title: "Transparent sample reporting",
                  desc: "Clear visual breakdown without overwhelming data clutter or complex configuration.",
                },
                {
                  title: "Exportable activity logs",
                  desc: "Download sanitized reports for internal agency review and stakeholder updates.",
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
                <span>Explore Analytics</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Analytics UI Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <BrowserFrame url="app.instadm.co/analytics" title="InstaDM — Analytics & Performance">
              <div className="bg-white p-5 sm:p-6">
                {/* Header with Date Range Selector */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      Performance Overview
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Live aggregate statistics (Demo data)
                    </p>
                  </div>

                  {/* Date range dropdown */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-stone-50/70 px-2.5 py-1.5 text-xs font-medium text-stone-700">
                      <Calendar className="h-3.5 w-3.5 text-stone-400" />
                      <span>{timeRange}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border/70 bg-stone-50/50 p-3">
                    <div className="text-[11px] text-stone-500">Total DMs</div>
                    <div className="mt-1 text-lg font-bold text-stone-900 sm:text-xl">
                      <NumberAnimation value={2713} />
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      +14.2% vs last month
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-stone-50/50 p-3">
                    <div className="text-[11px] text-stone-500">Replies</div>
                    <div className="mt-1 text-lg font-bold text-stone-900 sm:text-xl">
                      <NumberAnimation value={917} />
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      +21.8% vs last month
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-stone-50/50 p-3">
                    <div className="text-[11px] text-stone-500">Response Rate</div>
                    <div className="mt-1 text-lg font-bold text-stone-900 sm:text-xl">
                      <NumberAnimation value={33.8} decimals={1} suffix="%" />
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      Avg across active flows
                    </div>
                  </div>
                </div>

                {/* Workflow Performance Breakdown Table */}
                <div className="mt-5">
                  <div className="flex items-center justify-between pb-2 text-xs font-semibold text-stone-700">
                    <span>Workflow Breakdown</span>
                    <span className="text-[10px] text-stone-400">Response efficiency</span>
                  </div>

                  <div className="space-y-2">
                    {workflowStats.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-stone-50/40 p-2.5 text-xs transition-colors hover:bg-stone-50"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="font-medium text-stone-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {item.sent} sent • {item.replies} responses
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <div className="font-bold text-stone-900">
                              {item.rate}
                            </div>
                            <div className="text-[9px] text-stone-400">rate</div>
                          </div>
                          <Badge
                            variant={item.status === "Top performer" ? "coral" : "subtle"}
                            className="text-[9px] py-0 px-1.5 h-4"
                          >
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Notice */}
                <div className="mt-4 pt-3 border-t border-border/60 text-[10px] text-stone-400 text-center">
                  Values shown reflect sample product data for visual representation
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
