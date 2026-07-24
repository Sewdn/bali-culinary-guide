"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"
import { DesktopNav } from "./desktop-nav"

interface SmartHeaderProps {
  isSearching?: boolean
}

export function SmartHeader({ isSearching = false }: SmartHeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (isSearching) {
        setIsVisible(false)
      } else if (currentScrollY < 100) {
        // Always show when near top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Show when scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isSearching])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-slate-900 hover:text-rose-600 transition-colors">
            Bali Food Guide
          </Link>

          <div className="flex items-center gap-4">
            <DesktopNav />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
