"use client"

import * as React from "react"
import { Users, Search, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactsPage() {
  return (
    <div className="space-y-6 pb-12 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Contacts
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            People who have interacted with your Instagram automations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-12 shadow-2xs text-center flex flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-600 mb-3">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-stone-900">No contacts collected yet</h3>
        <p className="text-xs text-stone-400 max-w-sm mt-1">
          When people comment on your Instagram posts or message your keyword triggers, their contact handles will show up here.
        </p>
      </div>
    </div>
  )
}
