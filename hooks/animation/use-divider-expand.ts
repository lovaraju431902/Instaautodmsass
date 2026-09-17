"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface UseDividerExpandOptions {
  duration?: number
  delay?: number
  start?: string
  ease?: string
}

/**
 * useDividerExpand Hook
 * Animates a horizontal hairline separator expanding from width 0% to 100% on ScrollTrigger.
 */
export const useDividerExpand = (options: UseDividerExpandOptions = {}) => {
  const lineRef = useRef<HTMLDivElement>(null)
  const { duration = 1.0, delay = 0.2, start = "top 95%", ease = "power2.out" } = options

  useGSAP(
    () => {
      const line = lineRef.current
      if (!line) return

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        gsap.set(line, { width: "100%" })
        return
      }

      gsap.set(line, { width: "0%", transformOrigin: "center" })

      gsap.to(line, {
        width: "100%",
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: line,
          start,
          toggleActions: "play none none none",
        },
      })
    },
    { scope: lineRef, dependencies: [duration, delay, start, ease] }
  )

  return lineRef
}

export default useDividerExpand
