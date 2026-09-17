"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Moon, Sun, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

interface DashboardNavbarProps {
  onOpenMobileMenu: () => void
  title?: string
}

export function DashboardNavbar({
  onOpenMobileMenu,
  title = "Dashboard",
}: DashboardNavbarProps) {
  const router = useRouter()
  const [isDark, setIsDark] = React.useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Toggle dark class on html root
  const toggleTheme = () => {
    setIsDark(!isDark)
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark")
    }
  }

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
    } catch {
      // ignore
    } finally {
      router.push("/login")
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger + Active Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={onOpenMobileMenu}
          className="md:hidden rounded-lg border-stone-200 text-stone-600 hover:bg-stone-100"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Current View Title */}
        <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right: Theme Toggle + User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button (Moon / Sun) */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleTheme}
          className="h-8 w-8 rounded-full text-stone-600 hover:bg-stone-100 hover:text-stone-900 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* User Nav Avatar Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-xs font-bold text-stone-800 transition-all hover:ring-2 hover:ring-stone-900/10 cursor-pointer shadow-2xs"
            aria-label="User menu"
          >
            <span>JD</span>
          </button>

          {/* Floating Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="px-3 py-2 border-b border-stone-100">
                <p className="text-xs font-bold text-stone-900">Jane Doe</p>
                <p className="text-[11px] text-stone-400 truncate">jane.doe@example.com</p>
              </div>

              <div className="py-1 space-y-0.5 text-xs">
                <Link
                  href="/dashboard/account"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-stone-400" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/dashboard/account"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5 text-stone-400" />
                  <span>Account Settings</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-stone-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
