"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function TopBanner() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <aside
      aria-label="Announcement banner"
      className="relative z-50 flex h-10 w-full items-center justify-between bg-black px-4 text-xs text-white transition-all"
    >
      <div className="flex flex-1 items-center justify-center gap-3 text-center sm:gap-4">
        <span className="hidden font-medium text-stone-200 sm:inline">
          Upgrade to unlock every feature and accelerate your growth
        </span>
        <span className="font-medium text-stone-200 sm:hidden">
          Unlock every feature & growth
        </span>

        <Link
          href="/pricing"
          className="inline-flex items-center rounded-full bg-[hsl(340_82%_62%)] px-3 py-1 text-[11px] font-bold text-white shadow-xs transition hover:bg-[hsl(340_82%_55%)] active:scale-95"
        >
          Try 14 Days For Free
        </Link>

        <Link
          href="/pricing"
          className="text-[11px] font-medium text-stone-300 underline-offset-4 hover:text-white hover:underline"
        >
          View pricing
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="rounded p-1 text-stone-400 hover:text-white cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  )
}
