"use client"

import { useEffect, useRef } from "react"

export interface ParallaxItemConfig {
  depth?: number
  dirX?: number
  dirY?: number
  scale?: number
}

/**
 * useParallaxEffect Hook
 * Attaches to a container/scene element and applies multi-depth cursor-following
 * 3D translations to child elements marked with `.parallax-effect`.
 *
 * Configurable via data attributes on child elements:
 * - `data-parallax-value` (depth multiplier, default 1)
 * - `data-parallax-x` (direction polarity: 1 or -1)
 * - `data-parallax-y` (direction polarity: 1 or -1)
 */
export const useParallaxEffect = () => {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    // Accessibility check: Reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const elements = scene.querySelectorAll<HTMLElement>(".parallax-effect")
    if (elements.length === 0) return

    const configs = Array.from(elements).map((el) => ({
      element: el,
      depth: parseFloat(el.getAttribute("data-parallax-value") || "1"),
      dirX: parseFloat(el.getAttribute("data-parallax-x") || "1"),
      dirY: parseFloat(el.getAttribute("data-parallax-y") || "1"),
      scale: 20,
    }))

    elements.forEach((el) => {
      el.style.willChange = "transform"
      el.style.transition = "transform 0.1s ease-out"
    })

    let isScheduled = false
    let mouseX = scene.offsetWidth / 2
    let mouseY = scene.offsetHeight / 2

    const update = () => {
      const centerX = scene.offsetWidth / 2
      const centerY = scene.offsetHeight / 2
      const relX = Math.max(-1, Math.min(1, (mouseX - centerX) / (centerX || 1)))
      const relY = Math.max(-1, Math.min(1, (mouseY - centerY) / (centerY || 1)))

      configs.forEach(({ element, depth, dirX, dirY, scale }) => {
        const x = relX * depth * dirX * scale
        const y = relY * depth * dirY * scale
        element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      })
      isScheduled = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      if (!isScheduled) {
        requestAnimationFrame(update)
        isScheduled = true
      }
    }

    scene.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => scene.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return sceneRef
}

export default useParallaxEffect
