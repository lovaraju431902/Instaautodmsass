"use client"

import * as React from "react"
import { ArrowRight, Sparkles, X } from "lucide-react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <aside
      aria-label="Product announcement"
      className="relative z-50 flex items-center justify-center border-b border-border/80 bg-stone-100/90 px-4 py-2 text-xs font-medium text-stone-700 transition-all backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-5 items-center gap-1 rounded-full bg-[hsl(340_82%_62%/0.12)] px-2 py-0.5 text-[11px] font-semibold text-[hsl(340_82%_52%)]">
          <Sparkles className="h-3 w-3" />
          Update
        </span>
        <a
          href="#features"
          className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <span>New: Build smarter Instagram DM workflows</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 text-[hsl(340_82%_55%)]" />
        </a>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        type="button"
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-stone-500 hover:bg-stone-200/60 hover:text-stone-800 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  )
}
