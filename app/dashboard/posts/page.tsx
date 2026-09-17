"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, MessageCircle, Send, ArrowUpRight, MoreVertical } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function PostsPage() {
  const posts = [
    {
      id: "1",
      title: "How to Scale Organic Leads with Instagram Reels",
      trigger: "KEYWORD: 'SCALE'",
      dmsSent: 482,
      clicks: 341,
      status: "Active",
      date: "Sep 16, 2026",
    },
    {
      id: "2",
      title: "Creator Playbook 2026 Free PDF Download",
      trigger: "KEYWORD: 'PLAYBOOK'",
      dmsSent: 890,
      clicks: 720,
      status: "Active",
      date: "Sep 15, 2026",
    },
    {
      id: "3",
      title: "VIP Early Access Link for Autumn Product Drop",
      trigger: "KEYWORD: 'VIP'",
      dmsSent: 215,
      clicks: 180,
      status: "Paused",
      date: "Sep 12, 2026",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
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
          <BreadcrumbPage>Posts</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Header with Title and Create Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">Posts & Automations</h2>
          <p className="text-xs text-stone-500 mt-1">Manage comment triggers and direct message automation rules for your Instagram posts.</p>
        </div>

        <Button asChild className="h-10 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm">
          <Link href="/dashboard/posts/new">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            <span>New Post Automation</span>
          </Link>
        </Button>
      </div>

      {/* Posts Table Card Container */}
      <div className="rounded-2xl border border-stone-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-stone-100 bg-stone-50/70 text-[11px] font-bold uppercase tracking-wider text-stone-400">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Post Title</th>
                <th className="py-3.5 px-4">Trigger</th>
                <th className="py-3.5 px-4 text-center">DMs Sent</th>
                <th className="py-3.5 px-4 text-center">Clicks</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-semibold text-stone-900">{post.title}</div>
                    <div className="text-[11px] text-stone-400 mt-0.5">{post.date}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-800">
                      {post.trigger}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-stone-800">{post.dmsSent}</td>
                  <td className="py-4 px-4 text-center font-semibold text-stone-800">{post.clicks}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        post.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-stone-100 text-stone-600 border border-stone-200"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <Button variant="ghost" size="icon-xs" className="h-7 w-7 rounded-lg text-stone-400 hover:text-stone-900">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
