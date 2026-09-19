"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bookmark,
  Heart,
  Info,
  MessageCircle,
  MoreHorizontal,
  MousePointerClick,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Send,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDashboardStats, useRefreshDashboardStats } from "@/hooks/queries/use-dashboard-stats"
import { useToggleAutomation } from "@/hooks/queries/use-automations"

export default function DashboardHomePage() {
  const { data, isLoading } = useDashboardStats()
  const refreshMutation = useRefreshDashboardStats()
  const toggleMutation = useToggleAutomation()

  const handleRefresh = () => {
    refreshMutation.mutate()
  }

  const handleToggleAutomation = (id: string, currentStatus: "LIVE" | "PAUSED") => {
    const nextStatus = currentStatus === "LIVE" ? "PAUSED" : "LIVE"
    toggleMutation.mutate({ id, status: nextStatus })
  }

  const isRefreshing = refreshMutation.isPending
  const username = data?.account?.username || "creator"
  const displayName = data?.account?.name || `@${username}`
  const automations = data?.automations || []

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* 1. Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Welcome @{username}!
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time performance and active Instagram triggers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 rounded-xl text-xs font-semibold gap-1.5 border-stone-200"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </Button>

          <Link
            href="/pricing"
            className="inline-flex items-center justify-center h-8 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 px-3 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* 2. Today's Actions Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Today&apos;s actions</h2>
            <p className="text-xs text-stone-500">Connected account preview and live post monitor.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/dashboard/automations/create"
              className="flex items-center gap-1 font-semibold text-stone-900 hover:underline"
            >
              <span>Create trigger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Instagram Reel Smartphone Preview Card */}
        <div className="w-full max-w-[280px]">
          <div className="overflow-hidden rounded-3xl border border-stone-800 bg-black p-3.5 text-white shadow-lg">
            {/* Reel Header */}
            <div className="flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-[10px] font-bold">
                  {username.slice(0, 1).toUpperCase()}
                </div>
                <span className="text-xs font-semibold">{username}</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-stone-400" />
            </div>

            {/* Video Preview Canvas */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-900 flex items-center justify-center">
              {data?.recentPost?.thumbnailUrl || data?.recentPost?.mediaUrl ? (
                <img
                  src={data.recentPost.thumbnailUrl || data.recentPost.mediaUrl}
                  alt={data.recentPost.caption || "Reel"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white">
                    <Play className="h-4 w-4 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}
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
              <p className="text-xs font-semibold text-white truncate">
                {username} <span className="font-normal text-stone-300">| {data?.recentPost?.caption || "Automation active"}</span>
              </p>
              <p className="text-[10px] font-medium text-stone-500 uppercase mt-1">META API LIVE</p>
            </div>

            {/* View Automation Action Button */}
            <div className="pt-3">
              <Link
                href="/dashboard/automations"
                className="flex h-9 w-full items-center justify-center rounded-full bg-white text-xs font-bold text-black hover:bg-stone-100 transition"
              >
                View Automations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Performance Snapshot Section (Real Data) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-stone-900">Performance Snapshot</h2>
          <p className="text-xs text-stone-500">Live statistics across all Instagram triggers</p>
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
              <span className="text-2xl font-bold text-stone-900">
                {data?.stats?.dmsSent ?? 0}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-stone-400 flex items-center gap-1">
                <span>Monthly: {data?.stats?.dmsSentThisMonth ?? 0}/{data?.stats?.monthlyDmLimit ?? 500}</span>
              </span>
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                Active
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
              <span className="text-2xl font-bold text-stone-900">
                {data?.stats?.linkClicks ?? 0}
              </span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-600">
                Real-time tracking
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
              <span className="text-2xl font-bold text-stone-900">
                {data?.stats?.leadsCollected ?? 0}
              </span>
            </div>
            <div className="mt-2 text-[11px]">
              <Link href="/dashboard/contacts" className="text-rose-600 font-semibold hover:underline">
                View Contacts &rarr;
              </Link>
            </div>
          </div>

          {/* TOTAL FOLLOWERS */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-tight text-stone-500 flex items-center gap-1">
                <span>TOTAL FOLLOWERS</span>
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                <Users className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-stone-900">
                {data?.stats?.totalFollowers ?? 0}
              </span>
            </div>
            <div className="mt-2 text-[11px]">
              <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold text-stone-600">
                Synced from Meta API
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Automations Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Active Automations ({automations.length})
            </h2>
            <p className="text-xs text-stone-500">Running 24/7 to capture leads and send DMs</p>
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
          {automations.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">No automations created yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Set up your first comment or story trigger to start automatically sending DMs to your audience.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/automations/create"
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(340_82%_62%)] hover:bg-[hsl(340_82%_55%)] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Create First Automation</span>
                </Link>
              </div>
            </div>
          ) : (
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
                  {automations.map((auto) => {
                    const ctr =
                      auto.dmsSentCount > 0
                        ? `${Math.round((auto.clicksCount / auto.dmsSentCount) * 100)}%`
                        : "—"
                    const isLive = auto.status === "LIVE"

                    return (
                      <tr key={auto.id} className="hover:bg-stone-50/40 transition">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                              <Play className="h-3.5 w-3.5 fill-white" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-stone-900">{auto.name}</p>
                              <p className="text-[11px] text-stone-500 max-w-md line-clamp-1">
                                Keywords: {auto.keywords.join(", ") || "any"} · Message: {auto.finalMessage}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">
                          {auto.dmsSentCount}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">
                          {auto.clicksCount}
                        </td>
                        <td className="py-4 px-4 text-center text-stone-400 font-medium">
                          {ctr}
                        </td>
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
                              onClick={() => handleToggleAutomation(auto.id, auto.status)}
                              className="h-7 rounded-lg text-xs font-semibold px-2.5 border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
                            >
                              {isLive ? (
                                <>
                                  <Pause className="mr-1 h-3 w-3" />
                                  <span>Pause</span>
                                </>
                              ) : (
                                <>
                                  <Play className="mr-1 h-3 w-3 fill-stone-700" />
                                  <span>Activate</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
