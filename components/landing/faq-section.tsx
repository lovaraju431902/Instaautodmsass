"use client"

import * as React from "react"
import { HelpCircle, Sparkles } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      q: "What is InstaDM?",
      a: "InstaDM is a dedicated platform designed to build, manage, and monitor Instagram DM automation workflows. It helps creators, businesses, and agencies turn comments, new follows, and story mentions into organized conversations without repetitive manual typing.",
    },
    {
      q: "Who is InstaDM for?",
      a: "InstaDM is built for creators, e-commerce stores, growth agencies, coaches, and businesses of any size that receive high volumes of Instagram comments and direct messages and want to deliver prompt, structured responses.",
    },
    {
      q: "Can I automate replies to comments?",
      a: "Yes. When someone comments on your post with a designated keyword or phrase, InstaDM can automatically post a public acknowledgment and instantly deliver a private direct message containing your guide, link, or requested information.",
    },
    {
      q: "Do I need technical or coding knowledge?",
      a: "No coding is required. InstaDM features a visual workflow builder where you select your trigger event, specify delays or condition filters, and preview your message templates with a few clicks.",
    },
    {
      q: "Can I personalize messages with dynamic variables?",
      a: "Yes. You can insert dynamic fields such as {{first_name}}, {{username}}, and personalized resource links so each automated message feels natural, relevant, and tailored to the recipient.",
    },
    {
      q: "Is there a free plan available?",
      a: "Yes! You can start with our Free tier to build initial automations and test basic comment reply triggers with no credit card required. As your conversation volume scales, you can upgrade to Pro or Agency tiers.",
    },
    {
      q: "Is my account safe when using InstaDM?",
      a: "InstaDM is designed to work in accordance with supported platform messaging capabilities, official authorization protocols, and applicable rate policies. We encourage natural response pacing and provide built-in delay buffers to keep messaging authentic.",
    },
    {
      q: "Can I cancel or change my plan anytime?",
      a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your workspace settings with no long-term lock-in.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <HelpCircle className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>Questions, answered</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Everything you need to know.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Have questions about how InstaDM works, platform safety, or setup?
            Here are the most common details.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-14 rounded-2xl border border-border/80 bg-white p-6 sm:p-8 shadow-2xs">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-semibold sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
