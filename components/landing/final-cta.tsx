"use client"

import * as React from "react"
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-stone-100/70 py-20 md:py-28 border-t border-border/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-white px-3.5 py-1 text-xs font-semibold tracking-wider text-stone-700 uppercase shadow-2xs">
          <Sparkles className="h-3 w-3 text-[hsl(340_82%_55%)]" />
          <span>Ready to simplify your workflow?</span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
          Make more room for{" "}
          <span className="text-[hsl(340_82%_55%)]">meaningful conversations.</span>
        </h2>

        {/* Supporting text */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
          Start building a cleaner, more organized Instagram messaging workflow
          with InstaDM today. Set up your first automation in minutes.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="group h-11 w-full rounded-xl bg-stone-900 px-7 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg sm:w-auto"
            onClick={() => {
              const el = document.getElementById("pricing")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span>Start for free</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-11 w-full rounded-xl border-border bg-white px-5 text-sm font-medium text-stone-700 shadow-2xs hover:bg-stone-50 sm:w-auto"
            onClick={() => {
              const el = document.getElementById("how-it-works")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Play className="mr-2 h-3.5 w-3.5 fill-stone-600 text-stone-600" />
            <span>See how it works</span>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
            <span>No credit card required</span>
          </div>
          <span className="text-stone-300">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(340_82%_55%)]" />
            <span>Set up in minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
