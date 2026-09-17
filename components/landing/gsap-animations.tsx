"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GsapAnimationWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        return
      }

      // 1. Hero Entrance Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: -15,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          ".hero-headline",
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-paragraph",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-ctas",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-trust",
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-dashboard",
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.4"
        )

      // 2. Scroll Reveal for Below-the-fold sections
      const sections = [
        "#features",
        "#auto-dm",
        "#comments",
        "#audience",
        "#how-it-works",
        "#integrations",
        "#use-cases",
        "#analytics",
        "#pricing",
        "#faq",
      ]

      sections.forEach((selector) => {
        const el = document.querySelector(selector)
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          })
        }
      })
    },
    { scope: containerRef }
  )

  return <div ref={containerRef}>{children}</div>
}
