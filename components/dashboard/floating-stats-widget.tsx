"use client"

import * as React from "react"
import { MousePointerClick, Percent, Send } from "lucide-react"

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
  const [stats, setStats] = React.useState({
    dmsSent: propDms ?? 0,
    linkClicks: propClicks ?? 0,
    ctr: propCtr ?? "0%",
  })

  React.useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch("/api/dashboard/stats")
        if (res.ok) {
          const data = await res.json()
          const dms = data.stats?.dmsSent ?? 0
          const clicks = data.stats?.linkClicks ?? 0
          const calculatedCtr = dms > 0 ? `${Math.round((clicks / dms) * 100)}%` : "0%"
          setStats({ dmsSent: dms, linkClicks: clicks, ctr: calculatedCtr })
        }
      } catch {
        // keep fallback
      }
    }

    if (propDms === undefined) {
      fetchLive()
    }
  }, [propDms])

  const dms = propDms !== undefined ? propDms : stats.dmsSent
  const clicks = propClicks !== undefined ? propClicks : stats.linkClicks
  const ctr = propCtr !== undefined ? propCtr : stats.ctr

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
