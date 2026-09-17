"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  disabled?: boolean
  className?: string
}

export function Tooltip({
  children,
  content,
  side = "right",
  sideOffset = 10,
  disabled = false,
  className = "",
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false)

  if (disabled || !content) {
    return <>{children}</>
  }

  const getPositionClasses = () => {
    switch (side) {
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2"
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2"
      case "right":
      default:
        return "left-full top-1/2 -translate-y-1/2 ml-2"
    }
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-stone-900 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md animate-in fade-in zoom-in-95 duration-150",
            getPositionClasses(),
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
