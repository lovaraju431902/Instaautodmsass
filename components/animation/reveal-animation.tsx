"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface RevealAnimationProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right" | "random"
  start?: string
  instant?: boolean
  blur?: boolean
  className?: string
}

export function RevealAnimation({
  children,
  duration = 0.8,
  delay = 0,
  offset = 45,
  direction = "up",
  start = "top 88%",
  instant = false,
  blur = true,
  className = "",
}: RevealAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Resolve direction if "random"
  const resolvedDirection = useRef<"up" | "down" | "left" | "right">("up")

  useEffect(() => {
    if (direction === "random") {
      resolvedDirection.current = Math.random() > 0.5 ? "up" : "down"
    } else {
      resolvedDirection.current = direction
    }
  }, [direction])

  useGSAP(
    () => {
      const element = containerRef.current
      if (!element) return

      // Accessibility: respect reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, filter: "blur(0)" })
        return
      }

      let startX = 0
      let startY = 0

      switch (resolvedDirection.current) {
        case "down":
          startY = -offset // slides down into place from above
          break
        case "left":
          startX = offset // slides in from right to left
          break
        case "right":
          startX = -offset // slides in from left to right
          break
        case "up":
        default:
          startY = offset // slides up into place from below
          break
      }

      // Initial state
      gsap.set(element, {
        opacity: 0,
        x: startX,
        y: startY,
        filter: blur ? "blur(10px)" : "none",
      })

      const animProps: gsap.TweenVars = {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0)",
        duration: Math.max(0.4, Math.min(duration, 2.0)),
        delay: delay,
        ease: "power2.out",
      }

      if (!instant) {
        animProps.scrollTrigger = {
          trigger: element,
          start: start,
          toggleActions: "play none none none",
          once: true,
        }
      }

      gsap.to(element, animProps)
    },
    { scope: containerRef, dependencies: [duration, delay, offset, start, instant, blur] }
  )

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  )
}
