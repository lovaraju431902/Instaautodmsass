"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface NumberAnimationProps {
  number?: number | string
  value?: number | string
  speed?: number
  interval?: number
  rooms?: number
  heightSpaceRatio?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  symbol?: boolean
}

/**
 * NumberAnimation Component
 * Features mechanical rolling odometer reels where individual digit strips (0-9)
 * rotate upward into place with cubic deceleration, triggered by viewport intersection.
 *
 * Example:
 * <NumberAnimation value={98} suffix="%" className="text-4xl font-extrabold" />
 */
export function NumberAnimation({
  number,
  value,
  speed = 900,
  interval = 120,
  rooms = 0,
  heightSpaceRatio = 2.0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  symbol = false,
}: NumberAnimationProps) {
  const targetRaw = value !== undefined ? value : number !== undefined ? number : 0
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  // Extract pure numeric value if passed as a string
  const numericTarget =
    typeof targetRaw === "number"
      ? targetRaw
      : parseFloat(String(targetRaw).replace(/[^0-9.-]+/g, "")) || 0

  const animateTrack = (track: HTMLElement, targetTop: number, duration: number) => {
    const startTime = performance.now()
    const startTop = parseFloat(getComputedStyle(track).top) || 0

    const frame = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic deceleration
      const ease = 1 - Math.pow(1 - progress, 3)
      track.style.top = `${startTop + (targetTop - startTop) * ease}px`

      if (progress < 1) {
        requestAnimationFrame(frame)
      }
    }
    requestAnimationFrame(frame)
  }

  const initOdometer = useCallback(() => {
    const el = elementRef.current
    if (!el || isAnimated) return

    // Accessibility check: Reduced Motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${targetRaw}${suffix}`
      setIsAnimated(true)
      return
    }

    el.style.display = "inline-flex"
    el.style.alignItems = "center"
    el.textContent = String(targetRaw)
    const h = el.offsetHeight || 28
    const space = Math.max(12, h / heightSpaceRatio)
    el.innerHTML = ""

    // Prefix span if provided
    if (prefix) {
      const prefixSpan = document.createElement("span")
      prefixSpan.textContent = prefix
      prefixSpan.style.marginRight = "1px"
      el.appendChild(prefixSpan)
    }

    // Generate reel of digits 0 through 9
    let strip = ""
    for (let i = 0; i < 10; i++) {
      strip += `<span style="display:block;width:${space}px;height:${h}px;line-height:${h}px;text-align:center;">${i}</span>`
    }
    const singleReelHtml = `<div class="_number" style="width:${space}px;height:${h}px;display:flex;"><div style="position:relative;width:${space}px;height:${h}px;overflow:hidden;"><div style="position:absolute;width:100%;top:0;">${strip}</div></div></div>`

    // Process characters (including commas and dots)
    let formattedStr =
      decimals > 0
        ? numericTarget.toFixed(decimals)
        : Math.round(numericTarget).toString()

    if (symbol) {
      formattedStr = Number(formattedStr).toLocaleString()
    }

    const chars = formattedStr.split("")
    while (rooms > 0 && chars.filter((c) => !isNaN(Number(c))).length < rooms) {
      chars.unshift("0")
    }

    // Build DOM structure
    chars.forEach((char) => {
      if (isNaN(Number(char))) {
        // Non-numeric punctuation (e.g. '.', ',')
        const charWrapper = document.createElement("span")
        charWrapper.style.display = "inline-block"
        charWrapper.style.height = `${h}px`
        charWrapper.style.lineHeight = `${h}px`
        charWrapper.style.padding = "0 1px"
        charWrapper.textContent = char
        el.appendChild(charWrapper)
      } else {
        const reelContainer = document.createElement("div")
        reelContainer.innerHTML = singleReelHtml
        el.appendChild(reelContainer.firstElementChild as HTMLElement)
      }
    })

    // Suffix span if provided
    if (suffix) {
      const suffixSpan = document.createElement("span")
      suffixSpan.textContent = suffix
      suffixSpan.style.marginLeft = "1px"
      el.appendChild(suffixSpan)
    }

    // Animate individual reels with staggered delay
    const reels = el.querySelectorAll<HTMLElement>("._number")
    const numericChars = chars.filter((c) => !isNaN(Number(c)))

    reels.forEach((reel, i) => {
      const targetDigit = Number(numericChars[i] ?? 0)
      setTimeout(() => {
        const track = reel.children[0]?.children[0] as HTMLElement
        if (track) {
          animateTrack(track, -h * targetDigit, speed)
        }
      }, interval * (reels.length - i))
    })

    setIsAnimated(true)
  }, [isAnimated, targetRaw, numericTarget, speed, interval, rooms, heightSpaceRatio, prefix, suffix, decimals, symbol])

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          initOdometer()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isAnimated, initOdometer])

  return (
    <span
      ref={elementRef}
      className={cn("tabular-nums inline-flex items-center", className)}
    >
      {prefix}
      {targetRaw}
      {suffix}
    </span>
  )
}

export default NumberAnimation
