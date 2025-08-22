"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRegions } from "@/lib/hooks/use-regions"
import { useFoodData } from "@/lib/contexts/food-data-context"
import { SearchDropdown } from "@/components/search-dropdown"
import { SmartHeader } from "@/components/smart-header"

const chapterDisplayData = {
  "ceremonial-bali": { image: "/balinese-feast.png", color: "bg-rose-600" },
  "street-food-bali": { image: "/balinese-street-food-market.png", color: "bg-pink-500" },
  "vegetables-bali": { image: "/indonesian-gado-gado.png", color: "bg-pink-600" },
  "fish-bali": { image: "/balinese-ikan-nyat-nyat.png", color: "bg-rose-700" },
  "desserts-bali": { image: "/balinese-bubur-injin.png", color: "bg-pink-700" },
  "cultural-traditions-bali": { image: "/balinese-megibung-tradition.png", color: "bg-rose-500" },
  "satay-lombok": { image: "/lombok-sate-rembiga.png", color: "bg-red-600" },
  "vegetables-lombok": { image: "/lombok-plecing-kangkung.png", color: "bg-green-600" },
  "rice-meals": { image: "/indonesian-nasi-campur.png", color: "bg-slate-600" },
  bakso: { image: "/indonesian-bakso-balung.png", color: "bg-slate-700" },
  "vegetables-indonesia": { image: "/indonesian-gado-gado.png", color: "bg-emerald-600" },
}

export default function HomePage() {
  const { regions } = useRegions()
  const { getChaptersByRegion, getDishStats, getPopularDishes, getVegetarianDishes, getQuickDishes } = useFoodData()
  const [isSearching, setIsSearching] = useState(false)

  const dishStats = getDishStats()
  const popularDishes = getPopularDishes()
  const vegetarianDishes = getVegetarianDishes()
  const quickDishes = getQuickDishes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <SmartHeader isSearching={isSearching} />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
                Savor the Flavors of Bali & Lombok
              </h1>
              <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Your comprehensive guide to authentic Indonesian cuisine, from Balinese ceremonial dishes to Lombok's
                fiery specialties
              </p>

              <div className="max-w-2xl mx-auto mb-8">
                <SearchDropdown
                  placeholder="Search for dishes, ingredients, or regions..."
                  onSearchStateChange={setIsSearching}
                />
              </div>

              <div className="flex justify-center gap-8 mb-8 text-center">
                <div>
                  <div className="text-3xl font-bold">{dishStats.total}</div>
                  <div className="text-sm opacity-90">Total Dishes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{vegetarianDishes.length}</div>
                  <div className="text-sm opacity-90">Vegetarian</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{quickDishes.length}</div>
                  <div className="text-sm opacity-90">Quick Dishes</div>
                </div>
              </div>

              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-semibold text-lg px-8 py-3">
                Discover Your Next Culinary Adventure
              </Button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-800 mb-4">Popular Dishes</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Start your culinary journey with these beloved Indonesian favorites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {popularDishes.map((dish) => (
              <Card key={dish.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {dish.dietaryInfo?.includes("vegetarian") && (
                      <Badge className="bg-green-500 text-white text-xs">V</Badge>
                    )}
                    {dish.spiceLevel && <Badge className="bg-red-500 text-white text-xs">{dish.spiceLevel}</Badge>}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                    {dish.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600">
                    {dish.region} • {dish.cookingTime || "30 min"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={`/dish/${dish.id}`}>
                    <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs">
                      View Recipe
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Regional Sections */}
        {regions.map((region) => {
          const chapters = getChaptersByRegion(region.id)
          if (chapters.length === 0) return null

          return (
            <section key={region.id} className="max-w-7xl mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-4">{region.flag}</span>
                  <Badge className="bg-rose-100 text-rose-700 text-lg px-4 py-2">{region.name} Cuisine</Badge>
                  <Badge variant="outline" className="ml-2">
                    {dishStats.byRegion[region.name] || 0} dishes
                  </Badge>
                </div>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-slate-800 mb-4">{region.name}</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{region.description}</p>
                <div className="mt-4">
                  <Link href={`/region/${region.id}`}>
                    <Button
                      variant="outline"
                      className="hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 bg-transparent"
                    >
                      Explore All {region.name} Chapters
                    </Button>
                  </Link>
                </div>
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
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          {region.name}
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="font-serif font-bold text-xl text-slate-800 group-hover:text-rose-600 transition-colors">
                          {chapter.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 leading-relaxed">
                          {chapter.description}
                        </CardDescription>
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
          )
        })}

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
            <p className="text-slate-400">
              © 2024 Bali & Lombok Food Guide - Een culinaire reis door Bali, Lombok en Indonesië
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
