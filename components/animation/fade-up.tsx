"use client"

import * as React from "react"
import { RevealAnimation, type RevealAnimationProps } from "./reveal-animation"

export interface FadeUpProps extends Omit<RevealAnimationProps, "direction"> {
  children: React.ReactNode
}

/**
 * Shorthand wrapper for standard blur-to-sharp fade-up element entrance
 * Usage: <FadeUp delay={0.2} duration={0.8}><YourComponent /></FadeUp>
 */
export function FadeUp({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  blur = true,
  useSpring = false,
  ...props
}: FadeUpProps) {
  return (
    <RevealAnimation
      direction="down"
      duration={duration}
      delay={delay}
      offset={offset}
      blur={blur}
      useSpring={useSpring}
      {...props}
    >
      {children}
    </RevealAnimation>
  )
}

export default FadeUp
