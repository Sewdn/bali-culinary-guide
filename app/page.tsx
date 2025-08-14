"use client"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useAllChapters } from "@/lib/hooks/use-chapters"
import { useGlobalSearch } from "@/lib/hooks/use-search" // Updated import to use useGlobalSearch

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
  const { performSearch } = useGlobalSearch() // Use useGlobalSearch hook
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearching(true)
      const results = performSearch(query) // Use performSearch function
      setSearchResults(results.dishes) // Extract dishes from results
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

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

            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for dishes, ingredients, or regions..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 pr-12 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-shadow"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

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

      {isSearching && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="font-serif font-bold text-2xl text-slate-800 mb-2">Search Results for "{searchQuery}"</h2>
            <p className="text-slate-600">Found {searchResults.length} dishes</p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {searchResults.map((dish) => (
                <Card key={dish.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-rose-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {dish.region}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors">
                      {dish.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-600 line-clamp-2">
                      {dish.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/dish/${dish.id}`}>
                      <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                        View Recipe
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No dishes found matching your search.</p>
              <p className="text-slate-400 mt-2">Try searching for ingredients, regions, or dish names.</p>
            </div>
          )}
        </section>
      )}

      {!isSearching && (
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
      )}

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
