"use client"

import * as React from "react"
import Link from "next/link"
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Lock,
  MessageSquare,
  MousePointerClick,
  Percent,
  Play,
  Send,
  UserCheck,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InsightsPage() {
  const [activeTab, setActiveTab] = React.useState<"performance" | "activity" | "account">("performance")
  const [dmsTrendView, setDmsTrendView] = React.useState<"hourly" | "daily">("hourly")
  const [clicksTrendView, setClicksTrendView] = React.useState<"hourly" | "daily">("hourly")

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Analytics
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            DMs sent, link clicks, top automations, and where your audience comes from.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition cursor-pointer self-start sm:self-auto"
        >
          <Calendar className="h-3.5 w-3.5 text-stone-400" />
          <span>Last 7 days</span>
          <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
        </button>
      </div>

      {/* Tabs (Matching Screenshot 5) */}
      <div className="border-b border-stone-200/80">
        <div className="flex gap-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("performance")}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === "performance"
                ? "border-black text-black font-bold"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Performance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("activity")}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === "activity"
                ? "border-black text-black font-bold"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Activity Log
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className={`pb-3 border-b-2 transition cursor-pointer ${
              activeTab === "account"
                ? "border-black text-black font-bold"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            Account Performance
          </button>
        </div>
      </div>

      {/* Section 1: Highlights */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Highlights</h2>
          <p className="text-xs text-stone-500">The standout result from each section.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              • BEST AUTOMATION
            </span>
            <p className="mt-2 text-xs font-semibold text-stone-500">
              No data yet for this period.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              • TOP DAY FOR DMS
            </span>
            <p className="mt-2 text-xs font-semibold text-stone-500">
              No data yet for this period.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              • TOP DAY FOR CLICKS
            </span>
            <p className="mt-2 text-xs font-semibold text-stone-500">
              No data yet for this period.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              • TOP COUNTRY
            </span>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-3 py-1 text-[11px] font-bold hover:bg-stone-800 transition"
              >
                <Zap className="h-3 w-3 fill-[hsl(340_82%_62%)] text-[hsl(340_82%_62%)]" />
                <span>Upgrade to Pro</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Key Metrics */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Key metrics</h2>
          <p className="text-xs text-stone-500">Compared to the previous 7 days</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">DMs sent</span>
              <MessageSquare className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">0</p>
            <div className="mt-3 h-0.5 w-full bg-stone-200 rounded" />
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Link clicks</span>
              <MousePointerClick className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">0</p>
            <div className="mt-3 h-0.5 w-full bg-stone-200 rounded" />
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Click-through rate</span>
              <Percent className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">0%</p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Leads captured</span>
              <UserCheck className="h-3.5 w-3.5 text-stone-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">0</p>
          </div>
        </div>
      </section>

      {/* Section 3: Automation Performance */}
      <section className="space-y-3">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
              <BarChart3 className="h-4 w-4 text-stone-500" />
              <span>Automation Performance</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-stone-900"
            >
              <span>Newest First</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                <Play className="h-3 w-3 fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Comments → DM</p>
                <p className="text-[10px] text-stone-400">0 DMs sent</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-400">CTR</span>
          </div>
        </div>
      </section>

      {/* Section 4: Content Performance Table */}
      <section className="space-y-3">
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
              <BarChart3 className="h-4 w-4 text-stone-500" />
              <span>Content Performance</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-100 bg-stone-50/50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="py-3 px-5">CONTENT</th>
                  <th className="py-3 px-4 text-center">TOTAL COMMENTS</th>
                  <th className="py-3 px-4 text-center">KEYWORD COMMENTS</th>
                  <th className="py-3 px-5 text-right">TRIGGER RATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/40 transition">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-stone-800 text-white flex items-center justify-center text-[10px] font-bold">
                        H
                      </div>
                      <span className="font-semibold text-stone-900">Hmm</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-5 text-right font-bold text-stone-900">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Engagement Trends Charts */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Engagement Trends</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Hourly DMs Sent */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900">Hourly DMs Sent</h3>
                <p className="text-[10px] text-stone-400">Last 7 days • 0 total dms sent</p>
              </div>
              <div className="flex items-center rounded-lg border border-stone-200 p-0.5 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => setDmsTrendView("hourly")}
                  className={`px-2 py-0.5 rounded ${
                    dmsTrendView === "hourly"
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Hourly
                </button>
                <button
                  type="button"
                  onClick={() => setDmsTrendView("daily")}
                  className={`px-2 py-0.5 rounded ${
                    dmsTrendView === "daily"
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Daily
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex items-end gap-1.5 h-12 mb-3 text-stone-300">
                <div className="w-2 bg-stone-200 rounded-t h-3" />
                <div className="w-2 bg-stone-200 rounded-t h-6" />
                <div className="w-2 bg-stone-300 rounded-t h-10" />
                <div className="w-2 bg-stone-200 rounded-t h-4" />
              </div>
              <p className="text-xs font-medium text-stone-500">No dms sent data for this period</p>
              <p className="text-[10px] text-stone-400">Last 7 days</p>
            </div>
          </div>

          {/* Hourly Link Clicks */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900">Hourly Link Clicks</h3>
                <p className="text-[10px] text-stone-400">Last 7 days • 0 total link clicks</p>
              </div>
              <div className="flex items-center rounded-lg border border-stone-200 p-0.5 text-[10px] font-semibold">
                <button
                  type="button"
                  onClick={() => setClicksTrendView("hourly")}
                  className={`px-2 py-0.5 rounded ${
                    clicksTrendView === "hourly"
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Hourly
                </button>
                <button
                  type="button"
                  onClick={() => setClicksTrendView("daily")}
                  className={`px-2 py-0.5 rounded ${
                    clicksTrendView === "daily"
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  Daily
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex items-end gap-1.5 h-12 mb-3 text-stone-300">
                <div className="w-2 bg-stone-200 rounded-t h-3" />
                <div className="w-2 bg-stone-300 rounded-t h-8" />
                <div className="w-2 bg-stone-200 rounded-t h-5" />
                <div className="w-2 bg-stone-200 rounded-t h-2" />
              </div>
              <p className="text-xs font-medium text-stone-500">No link clicks data for this period</p>
              <p className="text-[10px] text-stone-400">Last 7 days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
