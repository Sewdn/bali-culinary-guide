"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if this is a back/forward navigation
    const isBackForward = window.performance.getEntriesByType("navigation")[0]?.type === "back_forward"

    if (!isBackForward) {
      // Reset scroll to top for new page navigation
      window.scrollTo(0, 0)
    }
    // If it's back/forward navigation, browser will restore scroll position automatically
  }, [pathname])

  return null
}
