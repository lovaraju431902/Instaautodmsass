"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronsUpDown, LogOut, Plus, Zap } from "lucide-react"
import { Sheet, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarMenu } from "./sidebar-menu"
import { authClient } from "@/lib/auth-client"

interface MobileSheetMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenNewAutomation?: () => void
}

export function MobileSheetMenu({ open, onOpenChange, onOpenNewAutomation }: MobileSheetMenuProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = React.useState(false)

  // Auto-close sheet when route changes
  React.useEffect(() => {
    if (open) {
      onOpenChange(false)
    }
  }, [pathname])

  const handleSignOut = async () => {
    setLoggingOut(true)
    try {
      await authClient.signOut()
    } catch {
      // ignore
    } finally {
      onOpenChange(false)
      router.push("/login")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange} side="left">
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Header with Brand Logo & Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <Link
              href="/dashboard"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-2"
            >
              <span className="font-black text-base text-stone-950 tracking-wider uppercase">
                CREATORFLOW
              </span>
            </Link>

            <SheetClose onClose={() => onOpenChange(false)} />
          </div>

          {/* Workspace Selector */}
          <div className="pt-3">
            <div className="flex items-center justify-between rounded-xl border border-stone-200/80 bg-stone-50/50 p-2 text-left">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold">
                  MW
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-stone-900">My Workspace</p>
                  <p className="text-[10px] text-stone-400">Free Plan</p>
                </div>
              </div>
              <ChevronsUpDown className="h-3.5 w-3.5 text-stone-400" />
            </div>
          </div>

          {/* New Automation Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onOpenNewAutomation?.()
              }}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[hsl(340_82%_62%)] text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] transition cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>New Automation</span>
            </button>
          </div>
        </div>

        {/* Scrollable Grouped Menu List */}
        <div className="flex-1 overflow-y-auto py-3">
          <SidebarMenu isOpen={true} />
        </div>

        {/* Bottom Plan Quota & Sign Out */}
        <div className="pt-3 border-t border-stone-100 space-y-2.5">
          <div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>DMs sent</span>
              <span className="font-bold text-stone-900">0/500</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
              <div className="h-full bg-[hsl(340_82%_62%)] w-[2%]" />
            </div>
          </div>

          <Button
            variant="outline"
            disabled={loggingOut}
            onClick={handleSignOut}
            className="w-full justify-center gap-2 rounded-xl border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 shadow-2xs cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5 text-stone-500" />
            <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
          </Button>
        </div>
      </div>
    </Sheet>
  )
}
