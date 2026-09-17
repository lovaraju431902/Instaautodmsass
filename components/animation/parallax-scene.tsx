"use client"

import * as React from "react"
import { useParallaxEffect } from "@/hooks/animation/use-parallax-effect"
import { cn } from "@/lib/utils"

export interface ParallaxSceneProps {
  children: React.ReactNode
  className?: string
}

export interface ParallaxItemProps {
  children: React.ReactNode
  depth?: number
  dirX?: 1 | -1
  dirY?: 1 | -1
  className?: string
}

/**
 * ParallaxScene Container
 * Wraps floating visual elements to enable multi-depth cursor parallax.
 */
export function ParallaxScene({ children, className = "" }: ParallaxSceneProps) {
  const sceneRef = useParallaxEffect()

  return (
    <div ref={sceneRef} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  )
}

/**
 * ParallaxItem
 * An individual floating element within a ParallaxScene.
 */
export function ParallaxItem({
  children,
  depth = 1,
  dirX = 1,
  dirY = 1,
  className = "",
}: ParallaxItemProps) {
  return (
    <div
      className={cn("parallax-effect", className)}
      data-parallax-value={depth}
      data-parallax-x={dirX}
      data-parallax-y={dirY}
    >
      {children}
    </div>
  )
}
