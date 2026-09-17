"use client"

import * as React from "react"
import { RevealAnimation } from "./reveal-animation"
import { cn } from "@/lib/utils"

export interface TextRevealProps {
  children?: React.ReactNode
  text?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  by?: "word" | "element"
  stagger?: number
  delay?: number
  duration?: number
  offset?: number
  useSpring?: boolean
  className?: string
}

/**
 * TextReveal Component
 * Provides soft optical blur-to-sharp entrance for headings, phrases, and copy.
 * Supports both whole-element reveal and staggered word-by-word reveals.
 *
 * Example:
 * <TextReveal as="h1" text="Automate smarter. Grow faster." className="text-4xl font-bold" />
 */
export function TextReveal({
  children,
  text,
  as: Component = "p",
  by = "element",
  stagger = 0.08,
  delay = 0,
  duration = 0.6,
  offset = 40,
  useSpring = false,
  className = "",
}: TextRevealProps) {
  const content = text || (typeof children === "string" ? children : null)

  if (by === "word" && content) {
    const words = content.split(" ")
    return (
      <Component className={cn("inline-flex flex-wrap gap-x-1.5", className)}>
        {words.map((word, index) => (
          <RevealAnimation
            key={index}
            delay={delay + index * stagger}
            duration={duration}
            offset={offset}
            useSpring={useSpring}
            blur={true}
            direction="down"
            className="inline-block"
          >
            <span>{word}</span>
          </RevealAnimation>
        ))}
      </Component>
    )
  }

  return (
    <RevealAnimation
      delay={delay}
      duration={duration}
      offset={offset}
      useSpring={useSpring}
      blur={true}
      direction="down"
    >
      <Component className={className}>{children || text}</Component>
    </RevealAnimation>
  )
}

export default TextReveal
