"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: "left" | "right"
  className?: string
}

export function Sheet({
  open,
  onOpenChange,
  children,
  side = "left",
  className = "",
}: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-50 flex h-full w-72 flex-col bg-white p-6 shadow-2xl transition-transform animate-in duration-200 ease-out",
          side === "left"
            ? "slide-in-from-left"
            : "ml-auto slide-in-from-right",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function SheetClose({
  onClose,
  className = "",
}: {
  onClose: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        "rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-pointer",
        className
      )}
      aria-label="Close menu"
    >
      <X className="h-4 w-4" />
    </button>
  )
}
