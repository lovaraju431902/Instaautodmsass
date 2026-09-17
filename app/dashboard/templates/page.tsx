"use client"

import * as React from "react"
import Link from "next/link"
import { Check, MessageCircle, Sparkles, UserCheck, Zap, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TemplateItem {
  id: string
  title: string
  description: string
  category: string
  commentMock: string
  replyMock: string
  buttonText: string
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")

  const categories = [
    "All",
    "Featured",
    "Engage audience",
    "Sell & earn",
    "Capture leads",
    "Book clients",
  ]

  const popularTemplates: TemplateItem[] = [
    {
      id: "link-keyword",
      title: "Send link on keyword",
      description: "Someone comments 'LINK' → they get your link in DMs.",
      category: "Popular",
      commentMock: "Send the LINK please!",
      replyMock: "Here's your link!",
      buttonText: "Shop now →",
    },
    {
      id: "story-reaction",
      title: "Send link on story reaction",
      description: "Someone reacts or replies → they get your link in DMs.",
      category: "Popular",
      commentMock: "Reacted to your story 🔥",
      replyMock: "Here's the link!",
      buttonText: "Shop now",
    },
    {
      id: "require-follow",
      title: "Require follow before link",
      description: "Ask them to follow you first. Grow your audience with every link.",
      category: "Popular",
      commentMock: "LINK please!",
      replyMock: "Follow me first!",
      buttonText: "I'm following",
    },
    {
      id: "auto-reply-dm",
      title: "Auto-reply to DMs",
      description: "Someone DMs 'INFO' or 'PRICE' → they get an instant reply.",
      category: "Popular",
      commentMock: "Hey! What's the PRICE?",
      replyMock: "Here are my pricing packages:",
      buttonText: "View packages",
    },
  ]

  const sellEarnTemplates: TemplateItem[] = [
    {
      id: "affiliate-links",
      title: "Share affiliate links",
      description: "Auto-send your LTK, Amazon, or ShopMy links when someone comments a keyword.",
      category: "Sell & earn",
      commentMock: "Where's the LINK?",
      replyMock: "Here's my LTK link:",
      buttonText: "Shop on LTK →",
    },
    {
      id: "discount-codes",
      title: "Send discount codes",
      description: "Someone comments a keyword → they get an exclusive discount in DMs.",
      category: "Sell & earn",
      commentMock: "Drop the CODE!",
      replyMock: "Use code SAVE20 for 20% off:",
      buttonText: "SAVE20",
    },
    {
      id: "promote-products",
      title: "Promote your products",
      description: "Someone comments 'BUY' → they get your product page instantly.",
      category: "Sell & earn",
      commentMock: "How do I BUY this?",
      replyMock: "Here is the product page:",
      buttonText: "Shop now →",
    },
    {
      id: "share-pricing",
      title: "Share pricing info",
      description: "Someone comments 'PRICE' → they get your rates or packages.",
      category: "Sell & earn",
      commentMock: "What's the PRICE?",
      replyMock: "Here are my packages:",
      buttonText: "View pricing →",
    },
  ]

  const engageTemplates: TemplateItem[] = [
    {
      id: "thank-story",
      title: "Thank story reactors",
      description: "Someone reacts to your story → thank them with a personal DM.",
      category: "Engage audience",
      commentMock: "Reacted to your story ❤️",
      replyMock: "Thanks for the love! Want to see more?",
      buttonText: "See more →",
    },
    {
      id: "thank-commenters",
      title: "Thank commenters",
      description: "Someone comments a keyword → send a thank you DM automatically.",
      category: "Engage audience",
      commentMock: "Love this AMAZING content!",
      replyMock: "Thanks so much! Means a lot 🙌",
      buttonText: "Thanks! →",
    },
    {
      id: "start-conversations",
      title: "Start conversations",
      description: "Someone comments a keyword → start a real conversation in DMs.",
      category: "Engage audience",
      commentMock: "Tell me MORE about this!",
      replyMock: "Hey! What would you like to know?",
      buttonText: "Chat →",
    },
  ]

  const leadTemplates: TemplateItem[] = [
    {
      id: "deliver-magnets",
      title: "Deliver lead magnets",
      description: "Someone comments 'FREE' → they get your PDF, checklist, or guide.",
      category: "Capture leads",
      commentMock: "Send the FREE guide!",
      replyMock: "Here is your free PDF guide download:",
      buttonText: "Download PDF →",
    },
    {
      id: "collect-emails",
      title: "Collect emails first",
      description: "Someone comments 'GUIDE' → ask for email, then send content.",
      category: "Capture leads",
      commentMock: "GUIDE please!",
      replyMock: "What's the best email address to send this?",
      buttonText: "Submit Email",
    },
    {
      id: "grow-waitlist",
      title: "Grow your waitlist",
      description: "Someone comments 'WAITLIST' → they get your signup link.",
      category: "Capture leads",
      commentMock: "Add me to the WAITLIST!",
      replyMock: "You're early! Here's your VIP waitlist link:",
      buttonText: "Join Waitlist →",
    },
  ]

  const renderTemplateCard = (tpl: TemplateItem) => (
    <div
      key={tpl.id}
      className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 shadow-2xs hover:border-stone-400 hover:shadow-xs transition cursor-pointer"
    >
      <div>
        <h3 className="text-xs font-bold text-stone-900 group-hover:text-black">
          {tpl.title}
        </h3>
        <p className="mt-1 text-[11px] text-stone-500 leading-relaxed min-h-[32px]">
          {tpl.description}
        </p>

        {/* Realistic Instagram DM Bubble Visual Preview (Matching Screenshot 3) */}
        <div className="mt-4 rounded-xl border border-stone-100 bg-stone-50/70 p-3 space-y-2">
          {/* User Comment Bubble */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-stone-300 shrink-0" />
            <div className="rounded-xl bg-white border border-stone-200/60 px-2.5 py-1 text-[10px] font-medium text-stone-700 shadow-2xs">
              {tpl.commentMock}
            </div>
          </div>

          {/* DM Reply Box */}
          <div className="pl-6 space-y-1.5">
            <div className="text-[10px] text-stone-600 font-medium">
              {tpl.replyMock}
            </div>
            <div className="inline-flex items-center rounded-lg bg-stone-800 text-white px-2.5 py-1 text-[10px] font-bold shadow-2xs">
              {tpl.buttonText}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-stone-400 uppercase">
          {tpl.category}
        </span>
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-900 hover:text-black"
        >
          <span>Use template</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 pb-12 select-none">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Automation templates
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Pre-filled automations to get you started. Pick one, customize the message and link, then go live.
        </p>
      </div>

      {/* Category Filter Pills (Matching Screenshot 3) */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-stone-600 border border-stone-200/90 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Section 1: Popular */}
      {(activeCategory === "All" || activeCategory === "Popular" || activeCategory === "Featured") && (
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Popular</h2>
            <p className="text-xs text-stone-500">The templates most creators start with.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTemplates.map(renderTemplateCard)}
          </div>
        </section>
      )}

      {/* Section 2: Sell & earn */}
      {(activeCategory === "All" || activeCategory === "Sell & earn") && (
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Sell & earn</h2>
            <p className="text-xs text-stone-500">Send links to products you sell or promote.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sellEarnTemplates.map(renderTemplateCard)}
          </div>
        </section>
      )}

      {/* Section 3: Engage audience */}
      {(activeCategory === "All" || activeCategory === "Engage audience") && (
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Engage audience</h2>
            <p className="text-xs text-stone-500">Say thanks and start conversations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {engageTemplates.map(renderTemplateCard)}
          </div>
        </section>
      )}

      {/* Section 4: Capture leads */}
      {(activeCategory === "All" || activeCategory === "Capture leads") && (
        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Capture leads</h2>
            <p className="text-xs text-stone-500">Collect emails and share free guides.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadTemplates.map(renderTemplateCard)}
          </div>
        </section>
      )}
    </div>
  )
}
