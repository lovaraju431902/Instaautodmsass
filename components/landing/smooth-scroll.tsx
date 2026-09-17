"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProviderProps {
  children: React.ReactNode
  duration?: number
  headerOffset?: number
}

export function SmoothScrollProvider({
  children,
  duration = 1.1,
  headerOffset = -100,
}: SmoothScrollProviderProps) {
  const lenisRef = React.useRef<Lenis | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevPathRef = React.useRef<string>(pathname)
  const isInitial = React.useRef(true)

  // Initialize Lenis with GSAP ScrollTrigger integration
  React.useEffect(() => {
    // Accessibility check: Reduced Motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [duration])

  // Reset scroll position on route change in Next.js App Router
  React.useEffect(() => {
    if (!isInitial.current && prevPathRef.current !== pathname) {
      lenisRef.current?.scrollTo(0, { immediate: true })
    }
    prevPathRef.current = pathname
    isInitial.current = false
  }, [pathname, searchParams])

  // Intercept anchor navigation matching .lenis-scroll-to or hash links
  React.useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(href, { offset: headerOffset })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [headerOffset, pathname])

  return <>{children}</>
}

