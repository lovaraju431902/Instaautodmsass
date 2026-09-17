"use client"

import * as React from "react"
import Link from "next/link"
import { Tag as TagIcon, Plus } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function TagsPage() {
  const tags = [
    { name: "#reels", usages: 142 },
    { name: "#giveaway", usages: 98 },
    { name: "#ecommerce", usages: 76 },
    { name: "#blackfriday", usages: 54 },
    { name: "#vip-club", usages: 39 },
    { name: "#webinar-live", usages: 28 },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Tags</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">Tags</h2>
          <p className="text-xs text-stone-500 mt-1">Manage tag filters for quick organization and analytics segmentation.</p>
        </div>

        <Button className="h-10 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>Add Tag</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-stone-50/60 px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <TagIcon className="h-3.5 w-3.5 text-stone-400" />
              <span className="font-semibold text-stone-900">{tag.name}</span>
              <span className="rounded-full bg-stone-200/80 px-2 py-0.5 text-[10px] text-stone-600">
                {tag.usages}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
