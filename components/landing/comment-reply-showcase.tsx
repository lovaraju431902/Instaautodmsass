"use client"

import * as React from "react"
import {
  ArrowRight,
  CheckCircle2,
  CornerDownRight,
  MessageCircle,
  MessageSquare,
  Send,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrowserFrame } from "./browser-frame"
import { Badge } from "@/components/ui/badge"

export function CommentReplyShowcase() {
  return (
    <section id="comments" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Copy & Value Proposition (5 cols - Alternating layout) */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <MessageCircle className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>Turn comments into conversations</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Respond faster, while staying personal.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Set up comment-based workflows that automatically acknowledge
              supporters with an authentic public reply, and instantly deliver
              the exact resource, coupon, or link directly into their direct
              messages.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                {
                  title: "Create approved comment triggers",
                  desc: "Detect keywords like 'guide', 'link', 'price', or 'access' on any post or reel.",
                },
                {
                  title: "Send instant relevant follow-up DMs",
                  desc: "Move public interest straight into private, structured conversations automatically.",
                },
                {
                  title: "Dynamic public comment variations",
                  desc: "Rotate randomized replies so your post comment section stays authentic and varied.",
                },
                {
                  title: "Track replies and conversation activity",
                  desc: "Monitor link clicks, follow-up responses, and conversion rates per campaign.",
                },
              ].map((bullet) => (
                <li key={bullet.title} className="flex items-start gap-3">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)]">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">
                      {bullet.title}
                    </h4>
                    <p className="text-xs text-stone-500">{bullet.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                variant="outline"
                className="group border-border bg-white text-xs font-semibold text-stone-800 hover:bg-stone-50"
                onClick={() => {
                  const el = document.getElementById("pricing")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span>Explore Comment Reply</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Original Product Flow Visual (7 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <BrowserFrame url="app.instadm.co/workflows/comment-flow" title="InstaDM — Comment to DM Flow">
              <div className="bg-white p-5 sm:p-7">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="coral" className="text-[10px]">
                        Post Trigger
                      </Badge>
                      <span className="text-xs font-semibold text-stone-800">
                        Lead Magnet Delivery Workflow
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Monitors all comments containing designated keywords
                    </p>
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    Active
                  </Badge>
                </div>

                {/* 3-Panel Visual Flow: Trigger -> Public Reply -> Direct Message */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Panel 1: Comment Trigger */}
                  <div className="flex flex-col rounded-xl border border-border/80 bg-stone-50/70 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        1. User Comment
                      </span>
                      <MessageSquare className="h-3.5 w-3.5 text-stone-400" />
                    </div>
                    <div className="mt-3 flex-1 rounded-lg border border-border/70 bg-white p-2.5 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-800">
                        <span className="font-semibold text-stone-900">@sarah.creates</span>
                      </div>
                      <p className="mt-1 text-xs text-stone-600 bg-stone-50 p-1.5 rounded font-mono">
                        &ldquo;guide please!&rdquo;
                      </p>
                      <div className="mt-2 text-[10px] text-stone-400">
                        Matches keyword: <span className="font-semibold text-[hsl(340_82%_55%)]">&ldquo;guide&rdquo;</span>
                      </div>
                    </div>
                  </div>

                  {/* Panel 2: Public Reply */}
                  <div className="flex flex-col rounded-xl border border-border/80 bg-stone-50/70 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        2. Public Reply
                      </span>
                      <CornerDownRight className="h-3.5 w-3.5 text-stone-400" />
                    </div>
                    <div className="mt-3 flex-1 rounded-lg border border-border/70 bg-white p-2.5 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-800">
                        <span className="font-semibold text-stone-900">@yourbrand</span>
                        <Badge variant="subtle" className="text-[9px] py-0 px-1">Host</Badge>
                      </div>
                      <p className="mt-1 text-xs text-stone-600 bg-emerald-50/60 p-1.5 rounded border border-emerald-500/10">
                        &ldquo;Thanks Sarah! Check your DMs 💬&rdquo;
                      </p>
                      <div className="mt-2 text-[10px] text-stone-400">
                        Rotates 4 custom variants
                      </div>
                    </div>
                  </div>

                  {/* Panel 3: DM Follow-Up */}
                  <div className="flex flex-col rounded-xl border-2 border-[hsl(340_82%_62%/0.4)] bg-[hsl(340_82%_62%/0.02)] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(340_82%_55%)]">
                        3. Instant DM
                      </span>
                      <Send className="h-3.5 w-3.5 text-[hsl(340_82%_55%)]" />
                    </div>
                    <div className="mt-3 flex-1 rounded-lg border border-border/70 bg-white p-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-[11px] font-medium text-stone-800">
                        <span className="font-semibold">Direct Message</span>
                        <span className="text-[9px] text-emerald-600">Delivered</span>
                      </div>
                      <p className="mt-1 text-xs text-stone-700 leading-relaxed bg-stone-50 p-1.5 rounded">
                        Hey Sarah! Here&apos;s the Creator Growth Guide you asked for: <span className="underline text-stone-600 font-mono text-[11px]">instadm.co/guide-pdf</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Flow Ribbon */}
                <div className="mt-5 rounded-lg border border-border/70 bg-stone-50/80 p-3 text-center text-xs font-medium text-stone-600">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
                    <span className="font-semibold text-stone-800">Comment Trigger</span>
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                    <span className="font-semibold text-stone-800">Public Reply</span>
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                    <span className="font-semibold text-[hsl(340_82%_55%)]">Automated DM</span>
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                    <span className="font-semibold text-emerald-700">Warm Lead Created</span>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
