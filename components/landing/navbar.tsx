"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  CornerDownRight,
  GraduationCap,
  HelpCircle,
  Link as LinkIcon,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  Video,
  X,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveMenu(menuName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 200)
  }

  return (
    <div className="sticky top-4 z-50 mx-auto w-full px-4 sm:px-6 pointer-events-none">
      <header
        className="relative mx-auto w-full max-w-5xl pointer-events-auto transition-all duration-300"
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Centered Thick Pill Navbar */}
        <div
          className={`relative flex items-center justify-between rounded-full border bg-white/95 px-5 py-3 sm:px-7 sm:py-3.5 backdrop-blur-md transition-all duration-300 shadow-md ${
            scrolled || activeMenu
              ? "border-stone-300/80 shadow-xl ring-1 ring-stone-900/5"
              : "border-stone-200/90 shadow-md"
          }`}
        >
          {/* Left: Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5 outline-none">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white shadow-sm transition-transform group-hover:scale-105">
              <Send className="h-4.5 w-4.5 -rotate-12 translate-x-px -translate-y-px text-stone-100" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(340_82%_62%)] ring-2 ring-white" />
            </div>
            <div className="flex items-center gap-0.5 tracking-tight text-foreground">
              <span className="text-lg font-bold sm:text-xl">Insta</span>
              <span className="text-lg font-extrabold sm:text-xl text-[hsl(340_82%_55%)]">DM</span>
            </div>
          </Link>

          {/* Center: Navigation Links with Hover Triggers */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9">
            {/* Solutions - Mega Menu Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter("solutions")}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground outline-none cursor-pointer ${
                  activeMenu === "solutions" ? "text-foreground font-semibold" : "text-stone-600"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${
                    activeMenu === "solutions" ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </button>
            </div>

            {/* Agencies / Use Cases */}
            <Link
              href="/#use-cases"
              onMouseEnter={() => handleMouseEnter("")}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
            >
              Agencies
            </Link>

            {/* Pricing */}
            <Link
              href="/pricing"
              onMouseEnter={() => handleMouseEnter("")}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
            >
              Pricing
            </Link>

            {/* Resources - Dropdown Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={() => handleMouseEnter("resources")}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground outline-none cursor-pointer ${
                  activeMenu === "resources" ? "text-foreground font-semibold" : "text-stone-600"
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${
                    activeMenu === "resources" ? "rotate-180 text-foreground" : ""
                  }`}
                />
              </button>
            </div>

            {/* Dedicated Blog Route Link */}
            <Link
              href="/blog"
              onMouseEnter={() => handleMouseEnter("")}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground flex items-center gap-1.5"
            >
              <span>Blog</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(340_82%_62%)]" />
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-stone-600 hover:text-foreground hover:bg-stone-100 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="group relative inline-flex h-10 items-center justify-center rounded-full bg-stone-900 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow-md"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-stone-600 hover:bg-stone-100 hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SOLUTIONS MEGA MENU CARD (Exact match to user reference screenshot)      */}
        {/* ========================================================================= */}
        {activeMenu === "solutions" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[840px] max-w-[95vw] rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-[330px_1fr_1fr] gap-7 items-stretch">
              {/* Left Column: Featured Card */}
              <div className="flex flex-col justify-between rounded-2xl border border-stone-200/70 bg-stone-50/70 p-5">
                {/* Mockup Preview Video Box */}
                <div className="rounded-xl border border-stone-200/80 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white">
                        <Play className="h-3.5 w-3.5 fill-white translate-x-0.5" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2.5 w-20 rounded-full bg-stone-200" />
                        <div className="h-2 w-12 rounded-full bg-stone-100" />
                      </div>
                    </div>
                    <span className="rounded bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)] font-bold text-[11px] px-2 py-0.5 uppercase tracking-wider">
                      Link
                    </span>
                  </div>

                  {/* Simulated Action Pill Button */}
                  <div className="mt-4 flex justify-end">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs">
                      <span>instadm.link</span>
                      <ArrowRight className="h-3 w-3 text-[hsl(340_82%_62%)]" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-stone-900">
                    Comment to DM, automatically
                  </h4>
                  <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
                    See how a single reel turns into emails and sales, automatically.
                  </p>

                  <Link
                    href="/#comments"
                    onClick={() => setActiveMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-[hsl(340_82%_55%)] transition-colors"
                  >
                    <span>Watch it work</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Middle Column: BY USE CASE */}
              <div className="flex flex-col min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 px-2">
                  BY USE CASE
                </div>

                <div className="space-y-1">
                  {[
                    { title: "Comment-to-DM", icon: MessageCircle, href: "/#comments" },
                    { title: "Auto-Send Links", icon: Send, href: "/#auto-dm" },
                    { title: "Lead Capture", icon: Mail, href: "/#audience" },
                    { title: "Story Replies", icon: CornerDownRight, href: "/#features" },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-semibold text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 whitespace-nowrap"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="truncate">{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: BY CREATOR TYPE */}
              <div className="flex flex-col min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 px-2">
                  BY CREATOR TYPE
                </div>

                <div className="space-y-1">
                  {[
                    { title: "Content Creators", icon: Video, href: "/#use-cases" },
                    { title: "Affiliate Creators", icon: LinkIcon, href: "/#use-cases" },
                    { title: "Coaches & Educators", icon: GraduationCap, href: "/#use-cases" },
                    { title: "Service Businesses", icon: Calendar, href: "/#use-cases" },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-semibold text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 whitespace-nowrap"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="truncate">{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* RESOURCES DROPDOWN MENU                                                  */}
        {/* ========================================================================= */}
        {activeMenu === "resources" && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[500px] rounded-3xl border border-stone-200/90 bg-white p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200 before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  title: "Blog & Playbooks",
                  desc: "Creator tactics, case studies, and DM strategies.",
                  icon: BookOpen,
                  href: "/blog",
                  badge: "New",
                },
                {
                  title: "Help Center & FAQ",
                  desc: "Common setup questions and account guidance.",
                  icon: HelpCircle,
                  href: "/#faq",
                },
                {
                  title: "Interactive Features",
                  desc: "Explore trigger workflows and comment replies.",
                  icon: Zap,
                  href: "/#features",
                },
                {
                  title: "Tools & Integrations",
                  desc: "Connect your CRM, webhooks, and spreadsheets.",
                  icon: Sparkles,
                  href: "/#integrations",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-stone-50 border border-transparent hover:border-stone-200/60"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-[hsl(340_82%_55%)] transition-colors">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="rounded bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)] text-[9px] font-bold px-1.5 py-0.2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Floating Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-border bg-white/95 p-4 shadow-xl backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2.5 text-xs">
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                Product Features
              </Link>
              <Link
                href="/#use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                Solutions
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground flex items-center justify-between"
              >
                <span>Blog & Playbooks</span>
                <span className="rounded bg-[hsl(340_82%_62%/0.15)] text-[hsl(340_82%_55%)] font-bold text-[9px] px-1.5 py-0.5">
                  New
                </span>
              </Link>
              <Link
                href="/#integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                Integrations
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                How it works
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                Pricing
              </Link>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-medium text-stone-700 hover:bg-stone-100 hover:text-foreground"
              >
                FAQ
              </Link>
              <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-border">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-full items-center justify-center rounded-full border border-stone-200 bg-white text-xs font-semibold text-stone-800 hover:bg-stone-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-stone-900 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
