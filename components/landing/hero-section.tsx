"use client"

import * as React from "react"
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroDashboardPreview } from "./hero-dashboard-preview"
import { FloatingProductCards } from "./floating-product-cards"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Hero Radial Gradient Background matching brand primary/accent color */}
      <div
        className="hero-radial-bg pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-0 h-screen w-screen select-none"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(100% 50% at 50% 0%, rgba(238, 67, 126, 0.22) 0%, rgba(238, 67, 126, 0) 60%, rgba(238, 67, 126, 0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-column hero container */}
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Hero Copy (Centered for dramatic SaaS presence or editorial left) */}
          <div className="hero-content mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-border/80 bg-stone-100/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-stone-700 uppercase shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[hsl(340_82%_62%)]" />
              <span>Instagram automation, without the busywork</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.1] md:text-7xl">
              Turn Instagram{" "}
              <br className="hidden sm:inline" />
              conversations into{" "}
              <span className="text-[hsl(340_82%_55%)]">momentum.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="hero-paragraph mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-stone-600 sm:text-lg sm:leading-relaxed">
              InstaDM helps creators, brands, and agencies automate DMs, reply to
              comments, and organize conversations—all from one focused, simple
              workspace.
            </p>

            {/* CTAs */}
            <div className="hero-ctas mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="group h-11 w-full rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg sm:w-auto"
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
                className="h-11 w-full rounded-xl border-border bg-white px-5 text-sm font-medium text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 hover:text-stone-900 sm:w-auto"
                onClick={() => {
                  const el = document.getElementById("how-it-works")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Play className="mr-2 h-3.5 w-3.5 fill-stone-600 text-stone-600" />
                <span>See how it works</span>
              </Button>
            </div>

            {/* Trust Details */}
            <div className="hero-trust mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
                <span>No credit card required</span>
              </div>
              <span className="hidden sm:inline text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(340_82%_55%)]" />
                <span>Set up in minutes</span>
              </div>
              <span className="hidden sm:inline text-stone-300">•</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Platform compliant workflows</span>
              </div>
            </div>
          </div>

          {/* Product Dashboard Visual Centerpiece */}
          <div className="hero-dashboard relative w-full pt-4">
            <FloatingProductCards />
            <HeroDashboardPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
