"use client"

import * as React from "react"
import { MousePointerClick, Percent, Send } from "lucide-react"
import { useDashboardStats } from "@/hooks/queries/use-dashboard-stats"

interface FloatingStatsWidgetProps {
  dmsSent?: number
  linkClicks?: number
  ctr?: string
}

export function FloatingStatsWidget({
  dmsSent: propDms,
  linkClicks: propClicks,
  ctr: propCtr,
}: FloatingStatsWidgetProps) {
  const { data } = useDashboardStats()

  const liveDms = data?.stats?.dmsSent ?? 0
  const liveClicks = data?.stats?.linkClicks ?? 0
  const liveCtr = liveDms > 0 ? `${Math.round((liveClicks / liveDms) * 100)}%` : "0%"

  const dms = propDms !== undefined ? propDms : liveDms
  const clicks = propClicks !== undefined ? propClicks : liveClicks
  const ctr = propCtr !== undefined ? propCtr : liveCtr

  return (
    <aside
      aria-label="Realtime session metrics"
      className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 rounded-2xl border border-stone-200/90 bg-white/95 p-2.5 shadow-md backdrop-blur-xs"
    >
      {/* DMs Sent */}
      <div className="flex flex-col items-center text-center group cursor-pointer">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white shadow-2xs group-hover:scale-105 transition-transform">
          <Send className="h-3.5 w-3.5" />
        </div>
        <span className="mt-1 text-xs font-bold text-stone-900">{dms}</span>
        <span className="text-[9px] font-bold tracking-tight text-stone-400 uppercase">
          DMs Sent
        </span>
      </div>

      <div className="h-px w-6 bg-stone-100" />

      {/* Link Clicks */}
      <div className="flex flex-col items-center text-center group cursor-pointer">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white shadow-2xs group-hover:scale-105 transition-transform">
          <MousePointerClick className="h-3.5 w-3.5" />
        </div>
        <span className="mt-1 text-xs font-bold text-stone-900">{clicks}</span>
        <span className="text-[9px] font-bold tracking-tight text-stone-400 uppercase">
          Link Clicks
        </span>
      </div>

      <div className="h-px w-6 bg-stone-100" />

      {/* CTR */}
      <div className="flex flex-col items-center text-center group cursor-pointer">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white shadow-2xs group-hover:scale-105 transition-transform">
          <Percent className="h-3.5 w-3.5" />
        </div>
        <span className="mt-1 text-xs font-bold text-stone-900">{ctr}</span>
        <span className="text-[9px] font-bold tracking-tight text-stone-400 uppercase">
          CTR
        </span>
      </div>
    </aside>
  )
}
