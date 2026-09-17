"use client"

import * as React from "react"
import { CircleDot, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StoriesPage() {
  return (
    <div className="space-y-6 pb-12 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Stories
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Automate replies when viewers react or comment on your 24-hour Instagram Stories.
          </p>
        </div>

        <Button className="rounded-full bg-[hsl(340_82%_62%)] text-white font-bold text-xs hover:bg-[hsl(340_82%_55%)] shadow-xs">
          <Plus className="mr-1.5 h-3.5 w-3.5 stroke-[2.5]" />
          <span>New Story Automation</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-12 shadow-2xs text-center flex flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_62%)] mb-3">
          <CircleDot className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-stone-900">No active story automations</h3>
        <p className="text-xs text-stone-400 max-w-sm mt-1">
          Post an Instagram story and set a keyword trigger so viewers get your direct messages automatically upon reacting.
        </p>
      </div>
    </div>
  )
}
