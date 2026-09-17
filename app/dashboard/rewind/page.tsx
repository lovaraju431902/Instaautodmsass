"use client"

import * as React from "react"
import { RotateCcw, Clock, Sparkles } from "lucide-react"

export default function RewindPage() {
  return (
    <div className="space-y-6 pb-12 select-none">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Rewind
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Historical activity log and automated message delivery replay.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-12 shadow-2xs text-center flex flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-600 mb-3">
          <RotateCcw className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-stone-900">No replay events yet</h3>
        <p className="text-xs text-stone-400 max-w-sm mt-1">
          As your automations fire and DMs are delivered to followers, a chronological audit log with retry capabilities will appear here.
        </p>
      </div>
    </div>
  )
}
