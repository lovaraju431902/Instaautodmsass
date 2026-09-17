import * as React from "react"

export function DashboardFooter() {
  return (
    <footer className="mt-8 py-6 text-center text-xs text-stone-500">
      <span>Built on top of </span>
      <a
        href="https://ui.shadcn.com"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900 transition-colors"
      >
        shadcn/ui
      </a>
      <span>. The source code is available on </span>
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-stone-700 underline underline-offset-4 hover:text-stone-900 transition-colors"
      >
        GitHub
      </a>
      <span>.</span>
    </footer>
  )
}
