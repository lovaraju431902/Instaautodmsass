import * as React from "react"
import { Sparkles, Store, Users2, Briefcase, Rocket, UserCheck } from "lucide-react"

export function TrustStrip() {
  const categories = [
    { label: "Creators & Influencers", icon: Users2 },
    { label: "E-commerce Brands", icon: Store },
    { label: "Growth Agencies", icon: Briefcase },
    { label: "Personal Brands", icon: UserCheck },
    { label: "Growing Businesses", icon: Rocket },
  ]

  return (
    <section className="border-y border-border/60 bg-stone-50/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          {/* Benefit Statement */}
          <div className="max-w-md">
            <p className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Targeted Workflows
            </p>
            <h3 className="mt-1 text-sm font-semibold text-stone-800 sm:text-base">
              Built for creators, brands, and teams who want less manual messaging.
            </h3>
          </div>

          {/* Neutral Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.label}
                  className="flex items-center gap-2 rounded-full border border-border/80 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 shadow-2xs transition-all hover:border-border hover:shadow-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-stone-400" />
                  <span>{cat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
