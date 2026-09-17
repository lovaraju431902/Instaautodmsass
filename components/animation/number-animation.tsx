"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NumberAnimationProps {
  value: number | string
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function NumberAnimation({
  value,
  duration = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: NumberAnimationProps) {
  const numericTarget = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0
  const [displayValue, setDisplayValue] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasAnimated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true)
          observer.disconnect()

          const startTime = performance.now()
          const startVal = 0

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const current = startVal + (numericTarget - startVal) * easeProgress

            setDisplayValue(current)

            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setDisplayValue(numericTarget)
            }
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [numericTarget, duration, hasAnimated])

  const formatted = hasAnimated
    ? displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : "0"

  return (
    <span ref={elementRef} className={cn("tabular-nums inline-block", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
