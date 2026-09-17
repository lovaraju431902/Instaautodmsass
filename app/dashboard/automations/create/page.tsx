"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Link2,
  Lock,
  MessageCircle,
  Mic,
  MoreHorizontal,
  Phone,
  Play,
  Plus,
  Send,
  Share2,
  Smile,
  Sparkles,
  Video,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateAutomationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const triggerType = searchParams.get("type") || "comments"

  // Live Phone Screen State: "post" | "comments" | "dm"
  const [activeScreen, setActiveScreen] = React.useState<"post" | "comments" | "dm">("post")

  // Step 1 State: When a user comments on
  const [postSelection, setPostSelection] = React.useState<"specific" | "next" | "any">("specific")
  const [selectedPostId, setSelectedPostId] = React.useState("post-1")

  // Step 2 State: And his/her comment has
  const [keywordType, setKeywordType] = React.useState<"specific" | "any">("specific")
  const [keywords, setKeywords] = React.useState<string[]>(["link", "details"])
  const [keywordInput, setKeywordInput] = React.useState("")

  // Step 3 State: They will optionally get an opening DM
  const [openingDmEnabled, setOpeningDmEnabled] = React.useState(true)
  const [openingMessage, setOpeningMessage] = React.useState(
    "Hey! Thanks for your comment! 😊\n\nI'm so glad you're interested!"
  )
  const [buttonText, setButtonText] = React.useState("Send me the link")

  // Step 4 State: And they will get a DM with
  const [finalMessage, setFinalMessage] = React.useState(
    "Hey! Thanks for asking! 😊 Here's the link you requested: https://instadm.link/access"
  )
  const [linkUrl, setLinkUrl] = React.useState("https://instadm.link/access")
  const [showAddLink, setShowAddLink] = React.useState(false)
  const [advancedOpen, setAdvancedOpen] = React.useState(false)

  // Suggested keywords list
  const suggestedKeywords = ["shop", "order", "buy", "price", "discount", "info"]

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim().toLowerCase()
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 20) {
      setKeywords([...keywords, trimmed])
      setKeywordInput("")
    }
  }

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw))
  }

  const handleStartAutomation = () => {
    alert("🎉 Automation is now LIVE! Your Instagram trigger is running 24/7.")
    router.push("/dashboard/automations")
  }

  const templates = [
    {
      title: "Welcome + Link",
      text: "Hey! Thanks for asking! 😊 Here's the link you requested: [LINK]",
    },
    {
      title: "Product Link",
      text: "Here's the product link: 🛍️ Use code INSTA20 for 20% off your first order: [LINK]",
    },
    {
      title: "Simple Link",
      text: "Here you go! 🚀 [LINK]",
    },
    {
      title: "Affiliate Link",
      text: "Thanks for your interest! 🙌 I earn a small commission if you purchase through this link, at no extra cost to you: [LINK]",
    },
    {
      title: "Download Link",
      text: "Your free guide is ready! 🎁 Enjoy and let me know what you think: [LINK]",
    },
  ]

  return (
    <div className="space-y-6 pb-16 select-none -mx-4 sm:-mx-8 px-4 sm:px-8">
      {/* Top Header Bar (Matching Screenshots 2, 3, 4, 5) */}
      <div className="flex items-center justify-between border-b border-stone-200/80 bg-white pb-4 pt-1">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer">
          <HelpCircle className="h-4 w-4 text-stone-400" />
          <span>Need help?</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/automations")}
            className="h-9 rounded-xl border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          >
            Save Draft
          </Button>

          <Button
            onClick={handleStartAutomation}
            className="h-9 rounded-full bg-[hsl(340_82%_62%)] px-5 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] active:scale-95 transition cursor-pointer"
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-white text-white" />
            <span>Start Automation</span>
          </Button>
        </div>
      </div>

      {/* Main 2-Column Split: Left Phone Preview + Right Step-by-Step Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: LIVE INTERACTIVE IPHONE MOCKUP               */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-20">
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-stone-900">Preview Automation</span>

            {/* Quick Preview Screen View Switcher */}
            <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 p-0.5 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveScreen("post")}
                className={`px-2 py-0.5 rounded transition ${
                  activeScreen === "post" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500"
                }`}
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen("comments")}
                className={`px-2 py-0.5 rounded transition ${
                  activeScreen === "comments" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500"
                }`}
              >
                Comments
              </button>
              <button
                type="button"
                onClick={() => setActiveScreen("dm")}
                className={`px-2 py-0.5 rounded transition ${
                  activeScreen === "dm" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500"
                }`}
              >
                DM Chat
              </button>
            </div>
          </div>

          {/* iPhone Hardware Outer Frame */}
          <div className="relative w-full max-w-[320px] rounded-[44px] border-[5px] border-stone-800 bg-black p-3 text-white shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            {/* Dynamic Island / Top Speaker & Clock */}
            <div className="relative z-20 flex items-center justify-between px-3 pt-1 text-[11px] font-semibold text-stone-300">
              <span>9:41</span>
              <div className="h-4 w-20 rounded-full bg-stone-900 border border-stone-800" />
              <div className="flex items-center gap-1.5">
                <span className="text-[9px]">5G</span>
                <div className="h-2 w-4 rounded-xs border border-stone-300 bg-white" />
              </div>
            </div>

            {/* SCREEN CONTENT CONDITIONAL RENDERING */}
            <div className="relative flex-1 mt-2 flex flex-col justify-between overflow-hidden rounded-[30px]">
              {/* SCREEN 1: POST VIEW (Screenshot 2) */}
              {activeScreen === "post" && (
                <div className="flex-1 flex flex-col justify-between bg-black text-white animate-in fade-in duration-200">
                  {/* Instagram Post Header */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-900">
                    <ChevronLeft className="h-4 w-4 text-stone-400" />
                    <div className="text-center">
                      <p className="text-[11px] font-bold">Posts</p>
                      <p className="text-[9px] text-stone-400">coder_431</p>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-stone-400" />
                  </div>

                  {/* Post Image (Sky and Trees) */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38bdf8_0,transparent_70%)] opacity-30" />
                  </div>

                  {/* Actions & Likes */}
                  <div className="py-2 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-stone-200">
                      <div className="flex items-center gap-3">
                        <Heart className="h-4 w-4" />
                        <MessageCircle
                          className="h-4 w-4 text-[hsl(340_82%_62%)] cursor-pointer"
                          onClick={() => setActiveScreen("comments")}
                        />
                        <Send className="h-4 w-4" />
                      </div>
                      <Bookmark className="h-4 w-4" />
                    </div>
                    <p className="text-[10px] text-stone-400">Be the first to like this</p>
                    <p className="text-[10px] text-stone-200 font-semibold">
                      coder_431 <span className="font-normal text-stone-400">| Hmm</span>
                    </p>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-around border-t border-stone-900 pt-2 text-stone-400">
                    <div className="h-4 w-4 rounded-sm border border-stone-400" />
                    <div className="h-4 w-4 rounded-full border border-stone-400" />
                    <Play className="h-3.5 w-3.5" />
                    <Heart className="h-3.5 w-3.5" />
                    <div className="h-4 w-4 rounded-full bg-stone-700" />
                  </div>
                </div>
              )}

              {/* SCREEN 2: COMMENTS DRAWER OPEN (Screenshot 3) */}
              {activeScreen === "comments" && (
                <div className="flex-1 flex flex-col justify-between bg-black text-white animate-in fade-in duration-200">
                  {/* Top background mini preview */}
                  <div className="h-16 w-full rounded-t-xl overflow-hidden bg-gradient-to-b from-sky-700 to-blue-900 opacity-60" />

                  {/* Comments Bottom Sheet */}
                  <div className="flex-1 bg-stone-900/95 rounded-t-2xl p-3 border-t border-stone-800 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col items-center mb-2">
                        <div className="h-1 w-8 rounded-full bg-stone-700" />
                        <span className="text-[11px] font-bold mt-1 text-stone-200">Comments</span>
                      </div>

                      {/* Comments List showing configured keywords */}
                      <div className="space-y-2 pt-1">
                        {keywords.map((kw, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[10px]">
                            <div className="h-5 w-5 rounded-full bg-stone-700 shrink-0 flex items-center justify-center text-[8px] font-bold">
                              U
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-stone-300">
                                User <span className="text-stone-500 font-normal">2m</span>
                              </p>
                              <p className="text-white font-medium">{kw}</p>
                              <span className="text-[9px] text-stone-500">Reply</span>
                            </div>
                            <Heart className="h-3 w-3 text-stone-600" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emoji Bar & Comment Input */}
                    <div className="space-y-2 pt-2 border-t border-stone-800">
                      <div className="flex justify-between text-xs px-1 text-stone-400">
                        <span>❤️</span>
                        <span>🙌</span>
                        <span>🔥</span>
                        <span>👏</span>
                        <span>😢</span>
                        <span>😍</span>
                        <span>😮</span>
                        <span>😂</span>
                      </div>
                      <div className="flex items-center justify-between rounded-full bg-stone-800 px-2.5 py-1 text-[10px] text-stone-400">
                        <span>Add a comment...</span>
                        <Smile className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SCREEN 3: DIRECT MESSAGE (DM) CONVERSATION (Screenshots 4 & 5) */}
              {activeScreen === "dm" && (
                <div className="flex-1 flex flex-col justify-between bg-black text-white animate-in fade-in duration-200">
                  {/* Instagram DM Header */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-900 px-1">
                    <div className="flex items-center gap-1.5">
                      <ChevronLeft className="h-4 w-4 text-stone-400" />
                      <div className="h-6 w-6 rounded-full bg-stone-700 flex items-center justify-center text-[9px] font-bold">
                        C
                      </div>
                      <span className="text-xs font-bold truncate max-w-[100px]">coder_431</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Phone className="h-3.5 w-3.5" />
                      <Video className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="flex-1 py-3 space-y-3 overflow-y-auto scrollbar-none px-1 text-[11px]">
                    {/* Bot Greeting & Opening DM Bubble */}
                    {openingDmEnabled && (
                      <div className="flex items-start gap-1.5 max-w-[90%]">
                        <div className="h-5 w-5 rounded-full bg-stone-800 shrink-0 mt-1 flex items-center justify-center text-[8px] font-bold text-stone-300">
                          CF
                        </div>
                        <div className="rounded-2xl bg-stone-800 p-2.5 space-y-2 text-stone-100 shadow-sm">
                          <p className="whitespace-pre-line leading-relaxed">{openingMessage}</p>
                          <div className="pt-1">
                            <div className="rounded-xl bg-stone-700/80 px-3 py-1.5 text-center font-bold text-white shadow-xs">
                              {buttonText}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* User Reply Bubble */}
                    <div className="flex justify-end">
                      <div className="rounded-2xl bg-blue-600 px-3 py-1.5 text-white font-medium text-[10px]">
                        {buttonText}
                      </div>
                    </div>

                    {/* Final DM with Destination Link */}
                    <div className="flex items-start gap-1.5 max-w-[90%]">
                      <div className="h-5 w-5 rounded-full bg-stone-800 shrink-0 mt-1 flex items-center justify-center text-[8px] font-bold text-stone-300">
                        CF
                      </div>
                      <div className="rounded-2xl bg-stone-800 p-2.5 text-stone-100 shadow-sm leading-relaxed whitespace-pre-line">
                        <p>{finalMessage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom DM Input Bar */}
                  <div className="flex items-center justify-between gap-1.5 border-t border-stone-900 pt-2 text-stone-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <ImageIcon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 rounded-full bg-stone-800 px-3 py-1 text-[10px] text-stone-400 flex items-center justify-between">
                      <span>Message...</span>
                      <Mic className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="pt-2 flex justify-center">
              <div className="h-1 w-24 rounded-full bg-stone-700" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 4-STEP AUTOMATION BUILDER ACCORDION / CARDS */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* ------------------------------------------------------------- */}
          {/* STEP 1: When a user comments on (Screenshot 2)                */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white text-xs font-black">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <h2 className="text-sm font-bold text-stone-950">When a user comments on</h2>
            </div>

            {/* Option 1: A specific post or reel */}
            <div className="rounded-2xl border border-stone-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">A specific post or reel</span>
                <button
                  type="button"
                  onClick={() => {
                    setPostSelection("specific")
                    setActiveScreen("post")
                  }}
                  className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                    postSelection === "specific" ? "bg-stone-950" : "bg-stone-200"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      postSelection === "specific" ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {postSelection === "specific" && (
                <div className="space-y-3 pt-1">
                  {/* Selectable Post Thumbnail Grid */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        setSelectedPostId("post-1")
                        setActiveScreen("post")
                      }}
                      className="relative h-28 w-24 rounded-xl overflow-hidden border-2 border-[hsl(340_82%_62%)] shadow-xs cursor-pointer"
                    >
                      <div className="h-full w-full bg-gradient-to-b from-sky-700 via-blue-900 to-emerald-950" />
                      {/* Check badge */}
                      <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <div className="absolute bottom-1 left-1.5 flex items-center gap-2 text-[9px] text-white">
                        <span className="flex items-center gap-0.5">
                          <Heart className="h-2.5 w-2.5" /> 0
                        </span>
                        <span className="flex items-center gap-0.5">
                          <MessageCircle className="h-2.5 w-2.5" /> 0
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>

            <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              OR
            </div>

            {/* Option 2: Next post or reel */}
            <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 p-4">
              <span className="text-xs font-medium text-stone-700">Next post or reel</span>
              <button
                type="button"
                onClick={() => setPostSelection("next")}
                className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                  postSelection === "next" ? "bg-stone-950" : "bg-stone-200"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    postSelection === "next" ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              OR
            </div>

            {/* Option 3: Any post or reel */}
            <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 p-4">
              <span className="text-xs font-medium text-stone-700">Any post or reel</span>
              <button
                type="button"
                onClick={() => setPostSelection("any")}
                className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                  postSelection === "any" ? "bg-stone-950" : "bg-stone-200"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    postSelection === "any" ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: And his/her comment has (Screenshot 3)                 */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white text-xs font-black">
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
              <h2 className="text-sm font-bold text-stone-950">And his/her comment has</h2>
            </div>

            {/* A specific keyword toggle */}
            <div className="rounded-2xl border border-stone-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">A specific keyword</span>
                <button
                  type="button"
                  onClick={() => {
                    setKeywordType("specific")
                    setActiveScreen("comments")
                  }}
                  className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                    keywordType === "specific" ? "bg-stone-950" : "bg-stone-200"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      keywordType === "specific" ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {keywordType === "specific" && (
                <div className="space-y-3 pt-1">
                  {/* Keyword Tags Container */}
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-stone-200/90 bg-stone-50/50 p-2.5">
                    {keywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-stone-800 border border-stone-200 shadow-2xs"
                      >
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(kw)}
                          className="text-stone-400 hover:text-stone-900 cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}

                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addKeyword(keywordInput)
                        }
                      }}
                      placeholder="Add keyword + Enter..."
                      className="flex-1 min-w-[130px] bg-transparent text-xs text-stone-900 focus:outline-none placeholder:text-stone-400"
                    />
                  </div>

                  {/* Suggested Keywords Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-medium text-stone-400">
                      Suggested keywords:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedKeywords.map((sk) => (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => addKeyword(sk)}
                          className="rounded-lg border border-stone-200/80 bg-white px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:border-stone-900 hover:text-stone-950 transition cursor-pointer"
                        >
                          {sk}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-right text-[10px] font-medium text-stone-400">
                    {keywords.length}/20 keywords
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              OR
            </div>

            {/* Any word toggle */}
            <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 p-4">
              <span className="text-xs font-medium text-stone-700">Any word</span>
              <button
                type="button"
                onClick={() => setKeywordType("any")}
                className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                  keywordType === "any" ? "bg-stone-950" : "bg-stone-200"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    keywordType === "any" ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Public reply upsell */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-stone-50 p-4 border border-stone-100">
              <span className="text-xs text-stone-600">
                Automatically reply to comments publicly to boost engagement
              </span>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(340_82%_62%)] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] shrink-0"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: They will optionally get (Screenshot 4)                */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold">
                3
              </div>
              <h2 className="text-sm font-bold text-stone-950">They will optionally get</h2>
            </div>

            {/* An opening DM switch */}
            <div className="rounded-2xl border border-stone-200/80 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-900">an opening DM</p>
                  <p className="text-[11px] text-stone-400">
                    Send an initial message before the main content
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpeningDmEnabled(!openingDmEnabled)
                    setActiveScreen("dm")
                  }}
                  className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                    openingDmEnabled ? "bg-stone-950" : "bg-stone-200"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      openingDmEnabled ? "translate-x-4.5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {openingDmEnabled && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">Opening Message</label>
                    <textarea
                      rows={3}
                      maxLength={200}
                      value={openingMessage}
                      onChange={(e) => {
                        setOpeningMessage(e.target.value)
                        setActiveScreen("dm")
                      }}
                      className="w-full rounded-xl border border-stone-200/90 p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
                    />
                    <div className="text-right text-[10px] text-stone-400">
                      {openingMessage.length}/200 characters
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Button text (what users tap to continue)
                    </label>
                    <Input
                      value={buttonText}
                      onChange={(e) => {
                        setButtonText(e.target.value)
                        setActiveScreen("dm")
                      }}
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              OR
            </div>

            {/* Follow Requirement Pro Feature */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-stone-50 p-4 border border-stone-100">
              <span className="text-xs text-stone-600">
                Require users to follow you before receiving the DM link
              </span>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(340_82%_62%)] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] shrink-0"
              >
                Upgrade to Pro
              </Link>
            </div>

            <div className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              OR
            </div>

            {/* Email Capture Pro Feature */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-stone-50 p-4 border border-stone-100">
              <span className="text-xs text-stone-600">
                Collect email addresses from your audience before sending the DM
              </span>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[hsl(340_82%_62%)] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] shrink-0"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: And they will get a DM with (Screenshot 5)             */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold">
                  4
                </div>
                <h2 className="text-sm font-bold text-stone-950">And they will get a DM with</h2>
              </div>

              <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-stone-500" />
                <span>Use Template</span>
              </span>
            </div>

            {/* Template Selection Cards Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-700">Choose a template:</span>
              <div className="grid grid-cols-1 gap-2">
                {templates.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setFinalMessage(tpl.text.replace("[LINK]", linkUrl))
                      setActiveScreen("dm")
                    }}
                    className="flex flex-col items-start rounded-xl border border-stone-200/80 p-3 text-left hover:border-stone-400 hover:bg-stone-50/50 transition cursor-pointer"
                  >
                    <span className="text-xs font-bold text-stone-900">{tpl.title}</span>
                    <span className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                      {tpl.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Final Message Textarea */}
            <div className="space-y-1.5 pt-2">
              <textarea
                rows={3}
                maxLength={1000}
                value={finalMessage}
                onChange={(e) => {
                  setFinalMessage(e.target.value)
                  setActiveScreen("dm")
                }}
                placeholder="Enter your message here..."
                className="w-full rounded-xl border border-stone-200/90 p-3 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
              />
              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span>0/1000 characters</span>
                <Smile className="h-3.5 w-3.5 cursor-pointer hover:text-stone-700" />
              </div>
            </div>

            {/* Add Link Action */}
            <div className="pt-1">
              {!showAddLink ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddLink(true)}
                  className="w-full rounded-xl text-xs font-bold border-dashed text-stone-700 hover:bg-stone-50"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  <span>Add Link</span>
                </Button>
              ) : (
                <div className="rounded-xl border border-stone-200 p-3 space-y-2 bg-stone-50/50">
                  <label className="text-[11px] font-bold text-stone-700">Link URL</label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => {
                        setLinkUrl(e.target.value)
                        setFinalMessage((prev) =>
                          prev.includes("http")
                            ? prev.replace(/https?:\/\/[^\s]+/, e.target.value)
                            : `${prev} ${e.target.value}`
                        )
                      }}
                      placeholder="https://instadm.link/your-page"
                      className="h-9 rounded-lg text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => setShowAddLink(false)}
                      className="h-9 rounded-lg bg-stone-900 text-xs font-bold text-white"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Settings Collapsible */}
            <div className="pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="flex w-full items-center justify-between text-xs font-bold text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                <span>Advanced Settings</span>
                {advancedOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {advancedOpen && (
                <div className="mt-3 rounded-xl bg-stone-50 p-3 text-xs text-stone-500 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Randomize DM send delays (0.5s - 2.5s)</span>
                    <span className="font-bold text-emerald-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Filter multiple comments from same user</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
