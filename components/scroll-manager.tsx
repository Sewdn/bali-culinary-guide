"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollManager() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousPathnameRef = useRef<string>()

  useEffect(() => {
    const currentPath = pathname + searchParams.toString()
    const previousPath = previousPathnameRef.current

    // Store current scroll position before navigation
    if (previousPath && previousPath !== currentPath) {
      sessionStorage.setItem(`scroll-${previousPath}`, window.scrollY.toString())
    }

    // Handle scroll restoration
    const handleScrollRestoration = () => {
      // Check if we're navigating back/forward by looking at stored scroll position
      const storedScrollPosition = sessionStorage.getItem(`scroll-${currentPath}`)

      if (storedScrollPosition && previousPath) {
        // Restore previous scroll position
        window.scrollTo(0, Number.parseInt(storedScrollPosition, 10))
      } else {
        // New navigation - scroll to top
        window.scrollTo(0, 0)
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(handleScrollRestoration)

    // Update previous pathname
    previousPathnameRef.current = currentPath

    // Cleanup function to store scroll position when component unmounts
    return () => {
      if (currentPath) {
        sessionStorage.setItem(`scroll-${currentPath}`, window.scrollY.toString())
      }
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentPath = pathname + searchParams.toString()
      sessionStorage.setItem(`scroll-${currentPath}`, window.scrollY.toString())
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [pathname, searchParams])

  return null
}
