"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useAllChapters } from "@/lib/hooks/use-chapters"

const chapterDisplayData = {
  ceremonial: { image: "/balinese-feast.png", color: "bg-rose-600" },
  "street-food": { image: "/balinese-street-food-market.png", color: "bg-pink-500" },
  "rice-meals": { image: "/indonesian-nasi-campur.png", color: "bg-slate-600" },
  "satay-pepes": { image: "/balinese-sate-lilit-grilling.png", color: "bg-rose-500" },
  bakso: { image: "/placeholder-9u1ma.png", color: "bg-slate-700" },
  vegetables: { image: "/indonesian-gado-gado.png", color: "bg-pink-600" },
  "fish-regional": { image: "/indonesian-grilled-fish.png", color: "bg-rose-700" },
  desserts: { image: "/black-sticky-rice-pudding.png", color: "bg-pink-700" },
}

export default function HomePage() {
  const chapters = useAllChapters()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
              Savor the Flavors of Bali
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to authentic Indonesian cuisine, from ceremonial dishes to street food treasures
            </p>
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-3">
              Discover Your Next Culinary Adventure
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <Link href="/" className="font-serif font-bold text-xl text-rose-600">
                Bali Food Guide
              </Link>
            </div>
            <DesktopNav />
          </div>
        </div>
      </nav>

      {/* Chapters Overview */}
      <section id="chapters" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-800 mb-4">Culinary Chapters</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore the rich diversity of Balinese and Indonesian cuisine through our carefully curated chapters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter) => {
            const displayData = chapterDisplayData[chapter.id as keyof typeof chapterDisplayData] || {
              image: "/placeholder.svg",
              color: "bg-slate-600",
            }

            return (
              <Card
                key={chapter.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={displayData.image || "/placeholder.svg"}
                    alt={chapter.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 ${displayData.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {chapter.dishes.length} dishes
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif font-bold text-xl text-slate-800 group-hover:text-rose-600 transition-colors">
                    {chapter.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {chapter.dishes.slice(0, 3).map((dish) => (
                      <Badge key={dish.id} variant="secondary" className="text-xs">
                        {dish.name}
                      </Badge>
                    ))}
                    {chapter.dishes.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{chapter.dishes.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link href={`/chapter/${chapter.id}`}>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium">
                      Explore Chapter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick Access */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-serif font-black text-3xl mb-8">Quick Access</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/glossary">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800 font-medium"
              >
                Complete Glossary
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-medium">
                Search Dishes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Bali Food Guide - Een culinaire reis door Bali en Indonesië</p>
        </div>
      </footer>
    </div>
  )
}
