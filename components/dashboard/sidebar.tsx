"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ExternalLink,
  HelpCircle,
  LogOut,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { SidebarMenu } from "./sidebar-menu"
import { authClient } from "@/lib/auth-client"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onOpenNewAutomation?: () => void
}

export function Sidebar({ isOpen, setIsOpen, onOpenNewAutomation }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 hidden md:flex flex-col border-r border-stone-200/90 bg-white transition-[width] duration-300 ease-in-out select-none",
        isOpen ? "w-64" : "w-[72px]"
      )}
    >
      {/* Brand & Collapse Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-stone-100">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 overflow-hidden transition-all",
            isOpen ? "w-auto" : "w-10 justify-center"
          )}
        >
          {isOpen ? (
            <div className="flex items-center gap-1.5 font-black text-stone-950 tracking-wider text-base uppercase">
              <span>CREATORFLOW</span>
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-white font-black text-xs">
              CF
            </div>
          )}
        </Link>

        {/* Retractable Collapse / Expand Toggle Button (< / >) */}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-7 w-7 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-transform cursor-pointer",
            !isOpen && "absolute -right-3 top-4 z-50 bg-white border border-stone-200 shadow-xs text-stone-700"
          )}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Workspace Selector Dropdown Bar */}
      <div className="px-3 pt-3">
        {isOpen ? (
          <div className="flex items-center justify-between rounded-xl border border-stone-200/80 bg-stone-50/50 p-2 text-left hover:bg-stone-100/70 transition cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold overflow-hidden">
                <span className="text-[11px]">MW</span>
              </div>
              <div className="overflow-hidden leading-tight">
                <p className="text-xs font-bold text-stone-900 truncate">My Workspace</p>
                <p className="text-[10px] text-stone-400">Free Plan</p>
              </div>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 text-stone-400" />
          </div>
        ) : (
          <div className="flex justify-center">
            <Tooltip content="My Workspace (Free Plan)" side="right">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white text-xs font-bold cursor-pointer">
                MW
              </div>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Main Call To Action Button (+ New Automation in landing page primary coral color) */}
      <div className="px-3 pt-3">
        {isOpen ? (
          <button
            type="button"
            onClick={onOpenNewAutomation}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[hsl(340_82%_62%)] text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] active:scale-[0.98] transition cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>New Automation</span>
          </button>
        ) : (
          <div className="flex justify-center">
            <Tooltip content="New Automation" side="right">
              <button
                type="button"
                onClick={onOpenNewAutomation}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(340_82%_62%)] text-white shadow-xs hover:bg-[hsl(340_82%_55%)] active:scale-95 transition cursor-pointer"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Scrollable Navigation Menu Area */}
      <div className="flex-1 overflow-y-auto py-3 px-1 scrollbar-thin scrollbar-thumb-stone-200">
        <SidebarMenu isOpen={isOpen} />
      </div>

      {/* Bottom Quota & Upgrade Tracker Section (Matching CreatorFlow layout with landing page primary color) */}
      <div className="p-3 border-t border-stone-100 bg-white">
        {isOpen ? (
          <div className="space-y-2.5">
            {/* DMs sent progress bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>DMs sent</span>
                <span className="font-bold text-stone-900">0/500</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-[hsl(340_82%_62%)] w-[2%]" />
              </div>
            </div>

            {/* IG accounts progress bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>IG accounts</span>
                <span className="font-bold text-stone-900">1/1</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full bg-[hsl(340_82%_62%)] w-full" />
              </div>
            </div>

            {/* Buy more DMs link */}
            <div className="text-center pt-0.5">
              <Link
                href="/pricing"
                className="text-[10px] font-bold text-stone-600 hover:text-stone-950 underline-offset-2 hover:underline"
              >
                Buy More DMs
              </Link>
            </div>

            {/* Upgrade Pill Button */}
            <Link
              href="/pricing"
              className="flex h-8 w-full items-center justify-center gap-1.5 rounded-full bg-[hsl(340_82%_62%)] text-[11px] font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] active:scale-[0.98] transition cursor-pointer"
            >
              <Zap className="h-3 w-3 fill-white text-white" />
              <span>Upgrade</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Tooltip content="DMs Sent: 0/500 | IG Accounts: 1/1" side="right">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-stone-100 text-[10px] font-bold text-stone-700">
                0/500
              </div>
            </Tooltip>
            <Tooltip content="Upgrade Plan" side="right">
              <Link
                href="/pricing"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-[hsl(340_82%_62%)] text-white font-bold"
              >
                <Zap className="h-3.5 w-3.5 fill-white text-white" />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
    </aside>
  )
}
