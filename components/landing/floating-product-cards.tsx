import * as React from "react"
import { CheckCircle2, MessageSquare, UserCheck, Zap } from "lucide-react"

export function FloatingProductCards() {
  return (
    <>
      {/* Floating Card 1: Top Left */}
      <div className="absolute -left-6 top-16 z-20 hidden items-center gap-3 rounded-xl border border-border/80 bg-white/95 p-3 shadow-lg backdrop-blur-md transition-all hover:scale-105 xl:flex animate-bounce-subtle">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(340_82%_62%/0.12)] text-[hsl(340_82%_55%)]">
          <UserCheck className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground">
            New follower detected
          </div>
          <div className="text-[11px] text-stone-500">
            Sending welcome DM...
          </div>
        </div>
        <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Floating Card 2: Bottom Right */}
      <div className="absolute -right-6 bottom-16 z-20 hidden items-center gap-3 rounded-xl border border-border/80 bg-white/95 p-3 shadow-lg backdrop-blur-md transition-all hover:scale-105 xl:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground">
            DM sent successfully
          </div>
          <div className="text-[11px] text-stone-500">
            &ldquo;Hey! Thanks for following ✨&rdquo;
          </div>
        </div>
        <span className="text-[10px] font-medium text-stone-400">Just now</span>
      </div>

      {/* Floating Card 3: Bottom Left */}
      <div className="absolute left-8 -bottom-4 z-20 hidden items-center gap-2.5 rounded-lg border border-border/70 bg-stone-900 px-3.5 py-2 text-white shadow-md lg:flex">
        <Zap className="h-3.5 w-3.5 text-[hsl(340_82%_62%)]" />
        <span className="text-xs font-medium">Comment reply flow is active</span>
      </div>
    </>
  )
}
