import * as React from "react"
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Rocket,
  ShoppingBag,
  Sparkles,
  Users2,
} from "lucide-react"

export function UseCasesSection() {
  const useCases = [
    {
      category: "Creators",
      icon: Users2,
      headline: "Turn audience interactions into meaningful conversations.",
      points: [
        "Welcome new followers with warm, personal messages",
        "Send automatic resource links when fans comment on posts",
        "Build genuine community engagement without endless typing",
      ],
      badge: "Audience Growth",
    },
    {
      category: "Brands",
      icon: ShoppingBag,
      headline: "Make customer conversations easier to manage.",
      points: [
        "Answer frequent product and sizing inquiries instantly",
        "Deliver launch discounts directly to engaged commenters",
        "Segment warm shoppers and sync them to your store CRM",
      ],
      badge: "E-Commerce",
    },
    {
      category: "Agencies",
      icon: Briefcase,
      headline: "Manage repeatable messaging workflows across clients.",
      points: [
        "Deploy battle-tested automation templates in minutes",
        "Deliver clear performance reports to show client ROI",
        "Maintain separate client workspaces and access permissions",
      ],
      badge: "Multi-Client",
    },
    {
      category: "Businesses",
      icon: Building2,
      headline: "Spend less time on repetitive messaging.",
      points: [
        "Capture qualified leads from reels and stories 24/7",
        "Direct prospective clients to booking links smoothly",
        "Ensure no consultation inquiry goes unanswered",
      ],
      badge: "Lead Capture",
    },
  ]

  return (
    <section id="use-cases" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <Sparkles className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>Built for different ways of growing</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            One platform. Different workflows.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Whether you&apos;re an independent creator building deep connection
            or an agency managing multiple client brands, InstaDM adapts to your
            messaging scale.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.category}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all hover:-translate-y-1 hover:border-border hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-[hsl(340_82%_62%/0.12)] group-hover:text-[hsl(340_82%_55%)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold text-stone-600">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-stone-400 uppercase tracking-wider">
                    {item.category}
                  </h3>

                  <p className="mt-2 text-base font-bold text-stone-900 leading-snug">
                    {item.headline}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-stone-400 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 text-[11px] font-medium text-stone-500">
                  <span>Tailored for {item.category}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
