import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { FoodDataProvider } from "@/lib/contexts/food-data-context"
import { ScrollManager } from "@/components/scroll-manager"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Bali Food Guide - Authentic Indonesian Cuisine",
  description:
    "Your comprehensive guide to traditional Balinese and Indonesian dishes, from ceremonial foods to street food treasures.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body>
        <FoodDataProvider>
          <ScrollManager />
          {children}
        </FoodDataProvider>
      </body>
    </html>
  )
}
