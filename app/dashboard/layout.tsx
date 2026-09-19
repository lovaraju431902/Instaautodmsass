"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSheetMenu } from "@/components/dashboard/mobile-sheet-menu"
import { TopBanner } from "@/components/dashboard/top-banner"
import { FloatingStatsWidget } from "@/components/dashboard/floating-stats-widget"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

import { useDashboardStats } from "@/hooks/queries/use-dashboard-stats"
import { NewAutomationModal } from "@/components/dashboard/new-automation-modal"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isNewAutomationOpen, setIsNewAutomationOpen] = React.useState(false)

  React.useEffect(() => {
    if (isSessionPending) return

    if (!session?.user) {
      router.replace("/signin")
      return
    }

    if (!isStatsLoading) {
      if (!statsData || !statsData.account) {
        document.cookie = "instadm_ig_connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        router.replace("/connect-instagram")
      } else {
        document.cookie = "instadm_ig_connected=true; path=/; max-age=2592000; SameSite=Lax"
      }
    }
  }, [session, isSessionPending, statsData, isStatsLoading, router])

  const isVerifying = isSessionPending || isStatsLoading

  if (isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-900 border-t-transparent" />
          <p className="text-xs text-stone-500 font-medium">
            {isSessionPending ? "Checking authorization..." : "Loading workspace data..."}
          </p>
        </div>
      </div>
    )
  }

  if (!session?.user || !statsData?.account) {
    return null
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased flex flex-col">
      {/* 1. CreatorFlow Black Announcement Banner Across Top */}
      <TopBanner />

      {/* 2. Desktop Persistent Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onOpenNewAutomation={() => setIsNewAutomationOpen(true)}
      />

      {/* 3. Mobile Sheet Menu Drawer */}
      <MobileSheetMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        onOpenNewAutomation={() => setIsNewAutomationOpen(true)}
      />

      {/* 4. Start New Automation Modal (Matching Screenshot 1) */}
      <NewAutomationModal
        open={isNewAutomationOpen}
        onClose={() => setIsNewAutomationOpen(false)}
      />

      {/* 4. Main Body Content Area */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-[padding] duration-300 ease-in-out bg-white min-h-screen",
          isSidebarOpen ? "md:pl-64" : "md:pl-[72px]"
        )}
      >
        {/* Mobile top trigger bar */}
        <div className="flex md:hidden items-center justify-between border-b border-stone-100 px-4 py-2.5 bg-white">
          <div className="font-black text-sm tracking-wider uppercase">CREATORFLOW</div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Page Content Container */}
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 5. Fixed Real-time Floating Metrics Widget on Right Edge */}
      <FloatingStatsWidget />
    </div>
  )
}
