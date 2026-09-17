"use client"

import * as React from "react"
import Link from "next/link"
import { Bookmark, Plus, Sparkles, FolderKanban } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  const categories = [
    { name: "Lead Magnets", count: 14, description: "Free ebooks, guides, and download incentives" },
    { name: "Webinars & Events", count: 8, description: "Sign-up links and early registration alerts" },
    { name: "Product Drops", count: 19, description: "VIP discount links and early cart access" },
    { name: "FAQ & Support", count: 6, description: "Automated support and FAQ redirects" },
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
          <BreadcrumbPage>Categories</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">Categories</h2>
          <p className="text-xs text-stone-500 mt-1">Organize your Instagram trigger campaigns and campaign groups.</p>
        </div>

        <Button className="h-10 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm">
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>New Category</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs hover:border-stone-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
                <Bookmark className="h-4 w-4" />
              </div>
              <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                {cat.count} campaigns
              </span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-stone-900">{cat.name}</h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
