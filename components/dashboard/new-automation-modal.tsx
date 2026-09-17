"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, X } from "lucide-react"

interface NewAutomationModalProps {
  open: boolean
  onClose: () => void
}

export function NewAutomationModal({ open, onClose }: NewAutomationModalProps) {
  const router = useRouter()

  if (!open) return null

  const handleSelectType = (type: string) => {
    onClose()
    router.push(`/dashboard/automations/create?type=${type}`)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-automation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              id="new-automation-modal-title"
              className="text-xl font-bold tracking-tight text-stone-950 sm:text-2xl"
            >
              Start a new automation
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Choose what triggers it, or pick a ready-made template.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 3 Trigger Selection Cards (Matching Screenshot 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: COMMENTS */}
          <button
            type="button"
            onClick={() => handleSelectType("comments")}
            className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 text-left shadow-2xs hover:border-stone-400 hover:shadow-xs transition cursor-pointer"
          >
            <div>
              {/* Graphic Illustration Box */}
              <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[hsl(340_82%_62%/0.08)] p-3 transition group-hover:scale-[1.02]">
                <div className="w-full max-w-[140px] rounded-lg bg-white p-2.5 shadow-xs space-y-2 border border-[hsl(340_82%_62%/0.2)]">
                  <div className="h-8 rounded bg-stone-200/70" />
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-stone-300" />
                    <div className="h-1.5 w-16 rounded bg-stone-200" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-stone-300" />
                    <div className="h-1.5 w-12 rounded bg-stone-200" />
                  </div>
                </div>
              </div>

              <span className="mt-4 block text-[10px] font-bold tracking-wider text-[hsl(340_82%_55%)] uppercase">
                COMMENTS
              </span>
              <h3 className="mt-1 text-sm font-bold text-stone-950 group-hover:text-black">
                DM on post or reel
              </h3>
              <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                When someone comments a keyword
              </p>
            </div>

            <div className="mt-4 pt-2 flex items-center gap-1 text-[11px] font-bold text-stone-900 group-hover:text-black">
              <span>Start here</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card 2: STORIES */}
          <button
            type="button"
            onClick={() => handleSelectType("stories")}
            className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 text-left shadow-2xs hover:border-stone-400 hover:shadow-xs transition cursor-pointer"
          >
            <div>
              {/* Graphic Illustration Box */}
              <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[#EFF6FF] p-3 transition group-hover:scale-[1.02]">
                <div className="flex items-center gap-2">
                  <div className="h-16 w-11 rounded-lg border-2 border-blue-200 bg-white shadow-xs flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-blue-300 bg-blue-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>

              <span className="mt-4 block text-[10px] font-bold tracking-wider text-blue-700 uppercase">
                STORIES
              </span>
              <h3 className="mt-1 text-sm font-bold text-stone-950 group-hover:text-black">
                DM on story
              </h3>
              <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                When someone reacts or replies
              </p>
            </div>

            <div className="mt-4 pt-2 flex items-center gap-1 text-[11px] font-bold text-stone-900 group-hover:text-black">
              <span>Start here</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card 3: KEYWORDS */}
          <button
            type="button"
            onClick={() => handleSelectType("keywords")}
            className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4 text-left shadow-2xs hover:border-stone-400 hover:shadow-xs transition cursor-pointer"
          >
            <div>
              {/* Graphic Illustration Box */}
              <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[#FFF1F2] p-3 transition group-hover:scale-[1.02]">
                <div className="w-full max-w-[130px] space-y-2">
                  <div className="h-6 w-16 rounded-lg bg-stone-200/80" />
                  <div className="h-6 w-20 rounded-lg bg-stone-300 ml-auto" />
                  <div className="h-6 w-14 rounded-lg bg-stone-200/80" />
                </div>
              </div>

              <span className="mt-4 block text-[10px] font-bold tracking-wider text-rose-700 uppercase">
                KEYWORDS
              </span>
              <h3 className="mt-1 text-sm font-bold text-stone-950 group-hover:text-black">
                DM on keyword
              </h3>
              <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                When someone DMs a keyword
              </p>
            </div>

            <div className="mt-4 pt-2 flex items-center gap-1 text-[11px] font-bold text-stone-900 group-hover:text-black">
              <span>Start here</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Browse templates link at bottom */}
        <div className="text-center pt-2">
          <Link
            href="/dashboard/templates"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-black transition underline-offset-4 hover:underline"
          >
            <span>Browse templates</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
