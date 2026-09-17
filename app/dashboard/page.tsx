"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  ChevronRight,
  Heart,
  HelpCircle,
  Info,
  MessageCircle,
  MoreHorizontal,
  MoreVertical,
  MousePointerClick,
  Pause,
  Play,
  RefreshCw,
  Send,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardHomePage() {
  const [isLive, setIsLive] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [igUsername, setIgUsername] = React.useState("coder_431")

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/instadm_ig_username=([^;]+)/)
      if (match && match[1]) {
        setIgUsername(match[1])
      }
    }
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 600)
  }

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* 1. Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Welcome @{igUsername}!
        </h1>
      </div>

      {/* 2. Today's Actions Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Today&apos;s actions</h2>
            <p className="text-xs text-stone-500">All your recent posts have an automation.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/dashboard/content"
              className="flex items-center gap-1 font-semibold text-stone-900 hover:underline"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Instagram Reel Smartphone Preview Card (Matching Screenshot 1) */}
        <div className="w-full max-w-[280px]">
          <div className="overflow-hidden rounded-3xl border border-stone-800 bg-black p-3.5 text-white shadow-lg">
            {/* Reel Header */}
            <div className="flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-[10px] font-bold">
                  C
                </div>
                <span className="text-xs font-semibold">coder_431</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-stone-400" />
            </div>

            {/* Video Preview Canvas */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950 flex items-center justify-center">
              {/* Center Play Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white">
                <Play className="h-4 w-4 fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Instagram Social Icons */}
            <div className="flex items-center justify-between pt-3 text-stone-300">
              <div className="flex items-center gap-3">
                <Heart className="h-4 w-4 hover:text-red-500 cursor-pointer" />
                <MessageCircle className="h-4 w-4 cursor-pointer" />
                <Send className="h-4 w-4 cursor-pointer" />
              </div>
              <Bookmark className="h-4 w-4 cursor-pointer" />
            </div>

            {/* Caption & Timestamp */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white">
                coder_431 <span className="font-normal text-stone-300">| Hmm</span>
              </p>
              <p className="text-[10px] font-medium text-stone-500 uppercase mt-1">YESTERDAY</p>
            </div>

            {/* View Automation Action Button */}
            <div className="pt-3">
              <Link
                href="/dashboard/automations"
                className="flex h-9 w-full items-center justify-center rounded-full bg-white text-xs font-bold text-black hover:bg-stone-100 transition"
              >
                View Automation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Performance Snapshot Section (Matching Screenshot 1) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Performance Snapshot</h2>
          <p className="text-xs text-stone-500">Last 7 days</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* DMS SENT */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-tight text-stone-500">
                DMS SENT
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <Send className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-stone-900">0</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400 flex items-center gap-1">
                <span>Queued: 0</span>
                <Info className="h-3 w-3 text-stone-300" />
              </span>
              <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                0% vs last 7 days
              </span>
            </div>
          </div>

          {/* LINK CLICKS */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-tight text-stone-500">
                LINK CLICKS
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <MousePointerClick className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-stone-900">0</span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                0% vs last 7 days
              </span>
            </div>
          </div>

          {/* LEADS COLLECTED */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-tight text-stone-500">
                LEADS COLLECTED
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <User className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-stone-900">0</span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                0% vs last 7 days
              </span>
            </div>
          </div>

          {/* TOTAL FOLLOWERS */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-tight text-stone-500 flex items-center gap-1">
                <span>TOTAL FOLLOWERS</span>
                <Info className="h-3 w-3 text-stone-300" />
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <Users className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-stone-900">25</span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-600">
                0% vs last 7 days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Automations (1) Section (Matching Screenshot 1) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Active Automations (1)</h2>
            <p className="text-xs text-stone-500">Running 24/7 to collect contacts</p>
          </div>
          <Link
            href="/dashboard/automations"
            className="flex items-center gap-1 text-xs font-semibold text-stone-900 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-100 bg-stone-50/50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="py-3 px-5">NAME</th>
                  <th className="py-3 px-4 text-center">DMS</th>
                  <th className="py-3 px-4 text-center">CLICKS</th>
                  <th className="py-3 px-4 text-center">CTR</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="hover:bg-stone-50/40 transition">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                        <Play className="h-3.5 w-3.5 fill-white" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-stone-900">Comments → DM</p>
                        <p className="text-[11px] text-stone-500 max-w-md line-clamp-1">
                          User comments on Post: contains &apos;link&apos; · Opening Message: DM: Hey! Thanks for asking! 😊 Here&apos;s the link...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-4 text-center font-bold text-stone-900">0</td>
                  <td className="py-4 px-4 text-center text-stone-400 font-medium">—</td>
                  <td className="py-4 px-4">
                    {isLive ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-bold text-stone-600 border border-stone-200">
                        Paused
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsLive(!isLive)}
                        className="h-7 rounded-lg text-xs font-semibold px-2.5 border-stone-200 text-stone-700 hover:bg-stone-100"
                      >
                        {isLive ? (
                          <>
                            <Pause className="mr-1 h-3 w-3" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="mr-1 h-3 w-3 fill-stone-700" />
                            <span>Resume</span>
                          </>
                        )}
                      </Button>
                      <button
                        type="button"
                        aria-label="More options"
                        className="rounded-lg p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Top Performers Section (Matching Screenshot 1) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Top Performers</h2>
          <p className="text-xs text-stone-500">Last 7 days</p>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
              <BarChart3 className="h-4 w-4 text-stone-500" />
              <span>Top Performing Automations</span>
            </div>
            <Link
              href="/dashboard/insights"
              className="flex items-center gap-1 text-xs font-semibold text-stone-900 hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Minimal Empty State Bar Chart Graphic */}
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex items-end gap-1.5 h-14 mb-3 text-stone-300">
              <div className="w-2.5 bg-stone-200 rounded-t h-4" />
              <div className="w-2.5 bg-stone-200 rounded-t h-8" />
              <div className="w-2.5 bg-stone-300 rounded-t h-12" />
              <div className="w-2.5 bg-stone-200 rounded-t h-6" />
              <div className="w-2.5 bg-stone-200 rounded-t h-3" />
            </div>
            <p className="text-xs font-semibold text-stone-700">No data for this period</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Last 7 days</p>
          </div>
        </div>
      </section>
    </div>
  )
}
