import * as React from "react"
import { BarChart3, Sliders, Sparkles, Workflow, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Connect",
      desc: "Connect your supported Instagram professional or creator account via official authorization.",
      icon: Sparkles,
      detail: "Safe & compliant setup",
    },
    {
      num: "02",
      title: "Create",
      desc: "Choose a trigger (new follower, post comment, or story mention) and define your message flow.",
      icon: Workflow,
      detail: "Intuitive visual builder",
    },
    {
      num: "03",
      title: "Personalize",
      desc: "Add customized message templates, smart delays, variables, and audience qualification conditions.",
      icon: Sliders,
      detail: "Dynamic tags & timing",
    },
    {
      num: "04",
      title: "Monitor",
      desc: "Review real-time messaging activity, replies received, and workflow engagement from your dashboard.",
      icon: BarChart3,
      detail: "Transparent live insights",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <Zap className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>From setup to automation</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Set it up once. Let your workflow run.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Build a clean, reliable automation flow in four simple steps, then
            monitor everything seamlessly from your central workspace.
          </p>
        </div>

        {/* Process Steps (Horizontal on desktop, vertical on mobile) */}
        <div className="relative mt-16">
          {/* Subtle connecting line across desktop */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-12 hidden h-[2px] bg-border/80 lg:block -z-1" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.num}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-sm"
                >
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl font-black text-[hsl(340_82%_55%)]">
                        {step.num}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-base font-bold text-stone-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-stone-500">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-3">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      {step.detail}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
