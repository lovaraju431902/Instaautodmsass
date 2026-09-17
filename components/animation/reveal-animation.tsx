"use client"

import React, { cloneElement, isValidElement, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { Springer } from "@/lib/animation/springer"

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
  end?: string
  instant?: boolean
  blur?: boolean
  useSpring?: boolean
  rotation?: number
  animationType?: "from" | "to"
  className?: string
}

export function RevealAnimation({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  direction = "down",
  start = "top 90%",
  end = "top 50%",
  instant = false,
  blur = true,
  useSpring = false,
  rotation = 0,
  animationType = "from",
  className = "",
}: RevealAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  // Resolve direction if "random"
  const resolvedDirection = useRef<"up" | "down" | "left" | "right">("down")
  React.useEffect(() => {
    if (direction === "random") {
      resolvedDirection.current = Math.random() > 0.5 ? "up" : "down"
    } else {
      resolvedDirection.current = direction
    }
  }, [direction])

  useGSAP(
    () => {
      const element = elementRef.current
      if (!element) return

      // Accessibility: respect reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, filter: "blur(0px)", rotation: 0 })
        return
      }

      // Reset base DOM styles so GSAP controls initial-to-final
      element.style.opacity = "1"
      element.style.filter = "blur(0)"

      const springEase = useSpring ? Springer.default(0.2, 0.8) : null
      const isFrom = animationType === "from"
      const blurRadius = blur ? "16px" : "0px"

      const animationProps: gsap.TweenVars = {
        opacity: isFrom ? 0 : 1,
        filter: isFrom ? `blur(${blurRadius})` : "blur(0px)",
        duration: Math.max(0.3, Math.min(duration, 3.0)),
        delay,
        ease: useSpring && springEase ? springEase : "power2.out",
      }

      if (rotation !== 0) {
        animationProps.rotation = rotation
      }

      if (!instant) {
        animationProps.scrollTrigger = {
          trigger: element,
          start,
          end,
          scrub: false,
        }
      }

      // Directional axis configuration
      switch (resolvedDirection.current) {
        case "left":
          animationProps.x = isFrom ? -offset : 0
          if (!isFrom) gsap.set(element, { x: -offset })
          break
        case "right":
          animationProps.x = isFrom ? offset : 0
          if (!isFrom) gsap.set(element, { x: offset })
          break
        case "up":
          animationProps.y = isFrom ? -offset : 0
          if (!isFrom) gsap.set(element, { y: -offset })
          break
        case "down":
        default:
          animationProps.y = isFrom ? offset : 0
          if (!isFrom) gsap.set(element, { y: offset })
          break
      }

      if (isFrom) {
        gsap.from(element, animationProps)
      } else {
        gsap.to(element, animationProps)
      }
    },
    { scope: elementRef, dependencies: [duration, delay, offset, instant, start, end, direction, useSpring, rotation, animationType, blur] }
  )

  if (!children) return null

  // If a single valid React element is passed, clone it to preserve clean DOM hierarchy
  if (isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string; ref?: React.Ref<unknown> }>
    return cloneElement(child, {
      ref: elementRef,
      className: cn(child.props.className, className),
      "data-ns-animate": true,
    } as React.HTMLAttributes<HTMLElement>)
  }

  // Fallback wrapper for fragments, strings, or multiple elements
  return (
    <div
      ref={elementRef}
      className={className || undefined}
      data-ns-animate="true"
    >
      {children}
    </div>
  )
}

// Convenient alias for clean imports
export const Reveal = RevealAnimation
export default RevealAnimation
