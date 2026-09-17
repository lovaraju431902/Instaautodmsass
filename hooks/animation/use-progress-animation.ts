"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface UseProgressAnimationOptions {
  target: number
  duration?: number
  delay?: number
  start?: string
  ease?: string
}

/**
 * useProgressAnimation Hook
 * Smoothly tweens a progress percentage or numerical value from 0 to target
 * using GSAP ScrollTrigger.
 */
export const useProgressAnimation = ({
  target,
  duration = 2.0,
  delay = 0,
  start = "top 90%",
  ease = "power2.out",
}: UseProgressAnimationOptions) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useGSAP(
    () => {
      const trigger = triggerRef.current
      if (!trigger) return

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        setValue(target)
        return
      }

      const counter = { val: 0 }

      gsap.to(counter, {
        val: target,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger,
          start,
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setValue(Math.round(counter.val))
        },
      })
    },
    { scope: triggerRef, dependencies: [target, duration, delay, start, ease] }
  )

  return { triggerRef, value }
}

export default useProgressAnimation
