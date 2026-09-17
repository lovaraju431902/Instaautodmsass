"use client"

import * as React from "react"
import { MessageSquare, MousePointerClick, Percent, Send, MessageCircle } from "lucide-react"

interface FloatingStatsWidgetProps {
  dmsSent?: number
  linkClicks?: number
  ctr?: string
}

export function FloatingStatsWidget({
  dmsSent = 0,
  linkClicks = 0,
  ctr = "0%",
}: FloatingStatsWidgetProps) {
  return (
    <>
      {/* Right Edge Fixed Stats Pill (Matching all 5 Screenshots) */}
      <aside
        aria-label="Realtime session metrics"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 rounded-2xl border border-stone-200/90 bg-white/95 p-2.5 shadow-md backdrop-blur-xs"
      >
        {/* DMs Sent */}
        <div className="flex flex-col items-center text-center group cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white shadow-2xs group-hover:scale-105 transition-transform">
            <Send className="h-3.5 w-3.5" />
          </div>
          <span className="mt-1 text-xs font-bold text-stone-900">{dmsSent}</span>
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
          <span className="mt-1 text-xs font-bold text-stone-900">{linkClicks}</span>
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

      {/* Floating Support Chat Bubble in Bottom Right Corner */}
      <button
        type="button"
        aria-label="Open support chat"
        onClick={() => alert("CreatorFlow Support chat is ready to help! You are on Free Plan.")}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-stone-800 text-white shadow-lg hover:bg-stone-900 hover:scale-105 active:scale-95 transition cursor-pointer"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </>
  )
}
