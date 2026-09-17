"use client"

import * as React from "react"
import Link from "next/link"
import { Users2, Lock, Zap } from "lucide-react"

export default function AudienceInsightsPage() {
  return (
    <div className="space-y-6 pb-12 select-none">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Audience Insights
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Deep geographic, demographic, and follower conversion breakdown.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-12 shadow-2xs text-center flex flex-col items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_62%)] mb-4">
          <Lock className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900">Pro Feature</h3>
        <p className="text-xs text-stone-500 max-w-md mt-1.5 leading-relaxed">
          Audience demographics, top performing countries, and follower growth attribution require an active CreatorFlow Pro subscription.
        </p>

        <Link
          href="/pricing"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white hover:bg-stone-800 transition"
        >
          <Zap className="h-3.5 w-3.5 fill-[hsl(340_82%_62%)] text-[hsl(340_82%_62%)]" />
          <span>Unlock Audience Insights</span>
        </Link>
      </div>
    </div>
  )
}
