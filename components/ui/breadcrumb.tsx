import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Breadcrumb({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs text-stone-500 font-medium", className)}
    >
      <ol className="flex items-center gap-1.5">{children}</ol>
    </nav>
  )
}

export function BreadcrumbItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <li className={cn("inline-flex items-center gap-1.5", className)}>{children}</li>
}

export function BreadcrumbLink({
  href,
  children,
  className = "",
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn("hover:text-stone-900 transition-colors", className)}
    >
      {children}
    </Link>
  )
}

export function BreadcrumbPage({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      aria-current="page"
      className={cn("font-semibold text-stone-900", className)}
    >
      {children}
    </span>
  )
}

export function BreadcrumbSeparator({
  className = "",
}: {
  className?: string
}) {
  return <ChevronRight className={cn("h-3 w-3 text-stone-400 shrink-0", className)} />
}
