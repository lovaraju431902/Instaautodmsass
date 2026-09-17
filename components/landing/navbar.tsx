"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Menu, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-[hsl(var(--background))/0.85] shadow-xs backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Original InstaDM Logo */}
        <Link href="/" className="group flex items-center gap-2.5 outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-white shadow-xs transition-transform group-hover:scale-105">
            <Send className="h-4 w-4 -rotate-12 translate-x-px -translate-y-px text-stone-100" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[hsl(340_82%_62%)] ring-2 ring-white" />
          </div>
          <div className="flex items-center gap-1 font-semibold tracking-tight text-foreground">
            <span className="text-lg font-bold">Insta</span>
            <span className="text-lg font-extrabold text-[hsl(340_82%_55%)]">DM</span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="flex items-center gap-1 text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            Product
            <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
          </Link>
          <Link
            href="#use-cases"
            className="flex items-center gap-1 text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            Solutions
            <ChevronDown className="h-3.5 w-3.5 text-stone-400" />
          </Link>
          <Link
            href="#integrations"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            Integrations
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium text-stone-600 hover:text-foreground"
            onClick={() => {
              const el = document.getElementById("pricing")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Log in
          </Button>
          <Button
            size="sm"
            className="group relative h-9 rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-stone-800 hover:shadow"
            onClick={() => {
              const el = document.getElementById("pricing")
              el?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span>Get started</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-[hsl(var(--background))] px-4 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              Product Features
            </Link>
            <Link
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              Solutions
            </Link>
            <Link
              href="#integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              Integrations
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-foreground"
            >
              FAQ
            </Link>
            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-border">
              <Button
                variant="outline"
                className="w-full justify-center text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Button>
              <Button
                className="w-full justify-center bg-stone-900 text-sm font-semibold text-white hover:bg-stone-800"
                onClick={() => {
                  setMobileMenuOpen(false)
                  const el = document.getElementById("pricing")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span>Get started</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
