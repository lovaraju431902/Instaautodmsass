"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

/**
 * useModalAnimation Hook
 * Provides React 19-safe contextSafe GSAP animations for dialog/modal entrances
 * and dismissals, with integrated body scroll locking.
 */
export const useModalAnimation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const { contextSafe } = useGSAP({ scope: modalRef })

  const openModal = contextSafe(() => {
    if (isOpen || isAnimating.current || !contentRef.current) return
    isAnimating.current = true
    setIsOpen(true)
    document.body.style.overflow = "hidden"

    gsap.set(contentRef.current, { opacity: 0, y: -40, scale: 0.96 })
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        isAnimating.current = false
      },
    })
  })

  const closeModal = contextSafe(async () => {
    if (!isOpen || isAnimating.current || !contentRef.current) return
    isAnimating.current = true
    document.body.style.overflow = "auto"

    await gsap.to(contentRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.96,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false)
        isAnimating.current = false
      },
    })
  })

  return { isOpen, openModal, closeModal, modalRef, contentRef }
}

export default useModalAnimation
