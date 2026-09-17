import * as React from "react"
import { cn } from "@/lib/utils"

interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string
  title?: string
  children: React.ReactNode
}

export function BrowserFrame({
  url = "app.instadm.co",
  title,
  children,
  className,
  ...props
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Browser Chrome Header */}
      <div className="flex h-11 items-center justify-between border-b border-border/70 bg-stone-100/80 px-4 select-none">
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-stone-300/80 transition-colors group-hover:bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-stone-300/80 transition-colors group-hover:bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-stone-300/80 transition-colors group-hover:bg-emerald-400/80" />
        </div>

        {/* Address Bar / Title */}
        <div className="mx-auto flex h-6 w-full max-w-[280px] items-center justify-center rounded-md border border-border/60 bg-white/70 px-3 text-[11px] font-medium text-stone-500 shadow-2xs">
          <span className="truncate">{title || url}</span>
        </div>

        {/* Action icons dummy */}
        <div className="flex w-10 items-center justify-end gap-1 text-stone-400 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        </div>
      </div>

      {/* Frame Contents */}
      <div className="relative flex-1 overflow-hidden bg-white">
        {children}
      </div>
    </div>
  )
}
