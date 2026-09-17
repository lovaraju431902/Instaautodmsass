"use client"

import * as React from "react"
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Tag,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrowserFrame } from "./browser-frame"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AudienceShowcase() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState("All")

  const contacts = [
    {
      name: "Ava Wilson",
      handle: "@ava.creates",
      source: "Comment reply",
      tag: "Warm",
      tagVariant: "coral" as const,
      lastActive: "12m ago",
      status: "Replied",
      statusColor: "text-emerald-600",
      initials: "AW",
    },
    {
      name: "Daniel Lee",
      handle: "@danielstudio",
      source: "Auto DM",
      tag: "New",
      tagVariant: "subtle" as const,
      lastActive: "1h ago",
      status: "Delivered",
      statusColor: "text-stone-600",
      initials: "DL",
    },
    {
      name: "Maya Chen",
      handle: "@mayamakes",
      source: "Campaign",
      tag: "Follow-up",
      tagVariant: "coral" as const,
      lastActive: "3h ago",
      status: "Clicked link",
      statusColor: "text-blue-600",
      initials: "MC",
    },
    {
      name: "Lucas Vance",
      handle: "@vancestudio",
      source: "Story mention",
      tag: "Warm",
      tagVariant: "coral" as const,
      lastActive: "5h ago",
      status: "Replied",
      statusColor: "text-emerald-600",
      initials: "LV",
    },
    {
      name: "Elena Rostova",
      handle: "@elena_brand",
      source: "Auto DM",
      tag: "New",
      tagVariant: "subtle" as const,
      lastActive: "1d ago",
      status: "Delivered",
      statusColor: "text-stone-600",
      initials: "ER",
    },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.handle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === "All" || contact.tag === selectedTag
    return matchesSearch && matchesTag
  })

  return (
    <section id="audience" className="bg-stone-50/50 py-20 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Audience Management Table Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <BrowserFrame url="app.instadm.co/audience" title="InstaDM — Audience & Contact Management">
              <div className="bg-white p-4 sm:p-6">
                {/* Table Header Controls */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      All Contacts
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      892 engaged profiles recorded
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Search Bar */}
                    <div className="relative w-44">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search contacts..."
                        className="h-8 w-full rounded-md border border-border/70 bg-stone-50/60 pl-8 pr-2.5 text-xs text-stone-700 placeholder:text-stone-400 focus:outline-none"
                      />
                    </div>
                    {/* Tag Filter Pills */}
                    <div className="flex items-center gap-1">
                      {["All", "Warm", "New", "Follow-up"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className={`rounded px-2 py-1 text-[10px] font-medium transition-colors ${
                            selectedTag === tag
                              ? "bg-stone-900 text-white"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border/60 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        <th className="py-2.5 px-2">Contact</th>
                        <th className="py-2.5 px-2 hidden sm:table-cell">Source</th>
                        <th className="py-2.5 px-2">Tag</th>
                        <th className="py-2.5 px-2 hidden md:table-cell">Last Interaction</th>
                        <th className="py-2.5 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {filteredContacts.map((contact) => (
                        <tr
                          key={contact.handle}
                          className="transition-colors hover:bg-stone-50/80"
                        >
                          {/* Name & Handle */}
                          <td className="py-2.5 px-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7 border-border/80">
                                <AvatarFallback className="text-[10px] bg-stone-100 font-bold">
                                  {contact.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="font-medium text-stone-900 truncate">
                                  {contact.name}
                                </div>
                                <div className="text-[10px] text-stone-400 font-mono truncate">
                                  {contact.handle}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Source */}
                          <td className="py-2.5 px-2 hidden sm:table-cell text-stone-600 text-[11px]">
                            {contact.source}
                          </td>

                          {/* Tag */}
                          <td className="py-2.5 px-2">
                            <Badge variant={contact.tagVariant} className="text-[10px] py-0 px-2">
                              {contact.tag}
                            </Badge>
                          </td>

                          {/* Last Interaction */}
                          <td className="py-2.5 px-2 hidden md:table-cell text-stone-400 text-[11px]">
                            {contact.lastActive}
                          </td>

                          {/* Status */}
                          <td className={`py-2.5 px-2 text-right text-[11px] font-medium ${contact.statusColor}`}>
                            {contact.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-[11px] text-stone-500">
                  <span>Showing {filteredContacts.length} of 892 contacts (Demo data)</span>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-stone-700">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </div>
                </div>
              </div>
            </BrowserFrame>
          </div>

          {/* Right Column: Copy & Benefits (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
              <Users className="h-3 w-3 text-[hsl(340_82%_55%)]" />
              <span>Know who you&apos;re talking to</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
              Keep every conversation organized.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Give your team a clearer view of contacts, tags, conversation
              history, and follow-up opportunities without losing track inside
              Instagram&apos;s cluttered native DM inbox.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                {
                  title: "Organize contacts with tags",
                  desc: "Categorize leads into Warm, VIP, Follow-up, or Customer automatically.",
                },
                {
                  title: "Search conversations quickly",
                  desc: "Instantly look up past messages, profile handles, and custom notes.",
                },
                {
                  title: "Track follow-up status",
                  desc: "Ensure no high-value inquiry or collaboration request falls through the cracks.",
                },
                {
                  title: "Keep context in one place",
                  desc: "Store full interaction timelines across comments, stories, and DMs.",
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
                <span>Explore Audience CRM</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
