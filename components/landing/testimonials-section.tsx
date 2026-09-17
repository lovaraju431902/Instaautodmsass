import * as React from "react"
import { MessageSquareQuote, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      initials: "CR",
      role: "Digital Creator",
      quote:
        "Automating resource links in comment replies saved hours every time a reel took off. Followers received what they asked for immediately.",
      workflow: "Comment reply & Welcome DMs",
      label: "Sample testimonial — replace with verified customer feedback",
    },
    {
      initials: "AG",
      role: "Agency Founder",
      quote:
        "Setting up custom triggers for client campaigns keeps messaging prompt and organized. The structure prevents messages from getting lost.",
      workflow: "Multi-account workflows",
      label: "Sample testimonial — replace with verified customer feedback",
    },
    {
      initials: "EB",
      role: "E-Commerce Brand",
      quote:
        "The automated response flows handle repetitive sizing and catalog questions easily, letting our team focus on personalized support.",
      workflow: "Inquiry routing & Tagging",
      label: "Sample testimonial — replace with verified customer feedback",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <Sparkles className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>Real workflows. Real feedback.</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Built to make busy teams feel lighter.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            See how structured automation helps creators and brands stay responsive
            without living inside their notification feed.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-6 shadow-2xs transition-all hover:border-border hover:shadow-xs"
            >
              <div>
                {/* Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                    <MessageSquareQuote className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-medium text-stone-400">
                    {item.workflow}
                  </span>
                </div>

                {/* Quote text */}
                <p className="mt-5 text-sm leading-relaxed text-stone-700 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 border-border">
                    <AvatarFallback className="text-[11px] bg-stone-100 text-stone-700 font-bold">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-stone-900">
                      {item.role}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
