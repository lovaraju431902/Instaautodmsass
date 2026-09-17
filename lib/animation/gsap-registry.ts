"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let registered = false

export function registerGSAP() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

// Auto-register on module load in client context
if (typeof window !== "undefined") {
  registerGSAP()
}

export { gsap, ScrollTrigger }
export default gsap
