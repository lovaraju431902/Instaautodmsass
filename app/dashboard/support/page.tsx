"use client"

import * as React from "react"
import { HelpCircle, MessageSquare, Mail, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="space-y-6 pb-12 select-none">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Support & Help Center
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Need help setting up your Instagram automation triggers? We are here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-900">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">Live Chat</h3>
          <p className="text-xs text-stone-500">
            Chat directly with our support team using the floating messenger button at the bottom right.
          </p>
          <Button
            onClick={() => alert("Connecting to CreatorFlow Support Chat...")}
            className="rounded-full bg-stone-900 text-xs font-bold text-white hover:bg-stone-800"
          >
            Start Chat
          </Button>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-2xs space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-900">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">Documentation & Setup Guides</h3>
          <p className="text-xs text-stone-500">
            Step-by-step guides on connecting your Instagram Professional account and configuring Meta API webhooks.
          </p>
          <Button variant="outline" className="rounded-full text-xs font-bold">
            Read Docs
          </Button>
        </div>
      </div>
    </div>
  )
}
