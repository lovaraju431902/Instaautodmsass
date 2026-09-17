"use client"

import * as React from "react"
import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Compass,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Search,
  Send,
  Settings,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react"
import { BrowserFrame } from "./browser-frame"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = React.useState("Dashboard")

  const weeklyData = [
    { day: "Mon", count: 180, height: "45%" },
    { day: "Tue", count: 240, height: "60%" },
    { day: "Wed", count: 210, height: "52%" },
    { day: "Thu", count: 320, height: "82%", active: true },
    { day: "Fri", count: 290, height: "74%" },
    { day: "Sat", count: 360, height: "92%" },
    { day: "Sun", count: 310, height: "78%" },
  ]

  const recentActivities = [
    {
      type: "New follower detected",
      time: "2m ago",
      desc: "@clara.designs followed your account",
      status: "DM queued",
      icon: UserCheck,
      badgeVariant: "coral" as const,
    },
    {
      type: "Replied to comment",
      time: "14m ago",
      desc: 'Sent resource link for keyword "guide"',
      status: "Sent",
      icon: MessageCircle,
      badgeVariant: "success" as const,
    },
    {
      type: "Campaign completed",
      time: "1h ago",
      desc: "Weekly newsletter invitation batch",
      status: "100% delivered",
      icon: Zap,
      badgeVariant: "subtle" as const,
    },
    {
      type: "New lead captured",
      time: "3h ago",
      desc: "Warm inquiry tagged for coaching",
      status: "Tagged",
      icon: Sparkles,
      badgeVariant: "coral" as const,
    },
    {
      type: "DM sent successfully",
      time: "4h ago",
      desc: 'Delivered "Welcome new community member"',
      status: "Read",
      icon: CheckCircle2,
      badgeVariant: "success" as const,
    },
  ]

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <BrowserFrame url="app.instadm.co/dashboard" title="InstaDM — Creator Workspace">
        <div className="flex min-h-[560px] flex-col text-stone-800 md:flex-row">
          {/* Dashboard Mini Sidebar */}
          <aside className="hidden w-52 shrink-0 flex-col justify-between border-r border-border/70 bg-stone-50/70 p-4 lg:flex">
            <div className="space-y-4">
              {/* Workspace selector */}
              <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-white p-2 shadow-2xs">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-900 text-white">
                  <Send className="h-3.5 w-3.5 -rotate-12" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-foreground">
                    Creator Studio
                  </div>
                  <div className="text-[10px] text-stone-500">Free Tier Demo</div>
                </div>
              </div>

              {/* Nav links */}
              <nav className="space-y-1">
                {[
                  { name: "Dashboard", icon: LayoutDashboard },
                  { name: "Auto DM", icon: Send },
                  { name: "Comment Reply", icon: MessageCircle },
                  { name: "Audience", icon: Users },
                  { name: "Campaigns", icon: Zap },
                  { name: "Templates", icon: MessageSquare },
                  { name: "Analytics", icon: BarChart3 },
                  { name: "Integrations", icon: Compass },
                ].map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.name
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-white text-stone-900 font-semibold shadow-2xs ring-1 ring-border/80"
                          : "text-stone-600 hover:bg-white/80 hover:text-stone-900"
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${
                          isActive ? "text-[hsl(340_82%_55%)]" : "text-stone-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="border-t border-border/60 pt-3">
              <div className="flex items-center gap-2.5 text-xs text-stone-500">
                <Settings className="h-3.5 w-3.5" />
                <span>Settings</span>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <div className="flex flex-1 flex-col bg-white">
            {/* Top Bar */}
            <div className="flex h-14 items-center justify-between border-b border-border/70 px-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    readOnly
                    placeholder="Search conversations..."
                    className="h-8 w-full rounded-md border border-border/70 bg-stone-50/80 pl-8 pr-3 text-xs text-stone-600 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="View notifications"
                  className="relative rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[hsl(340_82%_62%)]" />
                </button>
                <div className="flex items-center gap-2 border-l border-border/60 pl-3">
                  <Avatar className="h-7 w-7 border-border">
                    <AvatarFallback className="bg-stone-800 text-[11px] text-white">
                      RO
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-xs font-medium text-stone-800 sm:inline">
                    Rohan
                  </span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-5 p-4 md:p-6">
              {/* Header greeting */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Good morning, Rohan 👋
                  </h3>
                  <p className="text-xs text-stone-500">
                    Here&apos;s what&apos;s happening with your Instagram automation.
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Automation Active
                  </span>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "DMs sent", value: "1,248", change: "+18%", tag: "7 days" },
                  { label: "New conversations", value: "892", change: "+24%", tag: "7 days" },
                  { label: "Replies received", value: "312", change: "+12%", tag: "7 days" },
                  { label: "Response rate", value: "8.4%", change: "+2.1%", tag: "Avg" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/70 bg-stone-50/50 p-3 transition-colors hover:border-border hover:bg-stone-50"
                  >
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>{stat.label}</span>
                      <span className="font-semibold text-emerald-600">{stat.change}</span>
                    </div>
                    <div className="mt-1 text-lg font-bold tracking-tight text-stone-900 sm:text-xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] text-stone-400">Sample product data</div>
                  </div>
                ))}
              </div>

              {/* Split Activity: Bar Chart + Recent Activity */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                {/* DM Activity Chart (3 cols) */}
                <div className="rounded-xl border border-border/70 bg-white p-4 shadow-2xs lg:col-span-3">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-900">
                        DM Activity (Last 7 Days)
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Triggered DMs vs responses received
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-stone-500">
                      320 DMs sent peak
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="relative mt-5 flex h-40 items-end justify-between gap-2 pt-6">
                    {/* Tooltip on active bar */}
                    <div className="absolute left-[44%] top-0 -translate-x-1/2 rounded-md bg-stone-900 px-2 py-1 text-[10px] font-medium text-white shadow">
                      320 DMs sent
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                    </div>

                    {weeklyData.map((item) => (
                      <div
                        key={item.day}
                        className="group flex flex-1 flex-col items-center gap-2 h-full justify-end"
                      >
                        <div className="relative w-full max-w-[32px] flex items-end h-full">
                          <div
                            style={{ height: item.height }}
                            className={`w-full rounded-t-md transition-all duration-300 ${
                              item.active
                                ? "bg-[hsl(340_82%_62%)] shadow-sm"
                                : "bg-stone-200 group-hover:bg-stone-300"
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-stone-400">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity (2 cols) */}
                <div className="rounded-xl border border-border/70 bg-white p-4 shadow-2xs lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h4 className="text-xs font-semibold text-stone-900">
                      Recent Activity
                    </h4>
                    <span className="text-[10px] font-medium text-[hsl(340_82%_55%)] hover:underline cursor-pointer">
                      View all
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {recentActivities.map((act, i) => {
                      const Icon = act.icon
                      return (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-2 rounded-lg p-1.5 text-xs transition-colors hover:bg-stone-50"
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-600">
                              <Icon className="h-3 w-3" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-medium text-stone-800">
                                {act.type}
                              </p>
                              <p className="truncate text-[10px] text-stone-400">
                                {act.desc}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end shrink-0">
                            <Badge variant={act.badgeVariant} className="text-[9px] py-0 px-1.5 h-4">
                              {act.status}
                            </Badge>
                            <span className="text-[9px] text-stone-400 mt-0.5">{act.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
