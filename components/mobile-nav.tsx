"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Home, Book, ChefHat, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRegions } from "@/lib/hooks/use-regions"
import { usePopularDishes } from "@/lib/hooks/use-dishes"
import { useFoodData } from "@/lib/contexts/food-data-context"
import { regionTagsData } from "@/lib/data/regions"

const areas = Object.values(regionTagsData)

const chapterIcons = {
  "ceremonial-bali": "🏛️",
  "street-food-bali": "🏪",
  "vegetables-bali": "🥬",
  "fish-bali": "🐟",
  "desserts-bali": "🍮",
  "cultural-traditions-bali": "🎭",
  "satay-lombok": "🍢",
  "vegetables-lombok": "🌶️",
  "rice-meals": "🍱",
  bakso: "🍲",
  "vegetables-indonesia": "🥗",
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const { regions } = useRegions()
  const { getChaptersByRegion } = useFoodData()
  const popularDishes = usePopularDishes()

  const chapters = selectedRegion ? getChaptersByRegion(selectedRegion) : []
  const allChapters = regions.flatMap((region) => getChaptersByRegion(region.id))

  const filteredChapters = (selectedRegion ? chapters : allChapters).filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.dishes.some((dish) => dish.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="font-serif font-bold text-xl" onClick={() => setOpen(false)}>
                Bali Food Guide
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-rose-100 text-sm">Een culinaire reis door Bali & Lombok</p>
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search dishes or chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Quick Navigation */}
            <div className="p-4 border-b">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <Home className="w-4 h-4 mr-2 text-rose-600" />
                Quick Access
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Home className="w-4 h-4 mr-3" />
                  Homepage
                </Link>
                <Link
                  href="/dishes"
                  className="flex items-center py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <ChefHat className="w-4 h-4 mr-3" />
                  All Dishes
                </Link>
                <Link
                  href="/glossary"
                  className="flex items-center py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Book className="w-4 h-4 mr-3" />
                  Complete Glossary
                </Link>
              </div>
            </div>

            {/* Bali Areas */}
            <div className="p-4 border-b">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-rose-600" />
                Explore Bali by Area
              </h3>
              <div className="space-y-2">
                {areas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/region-tag/${area.id}`}
                    className="flex items-center py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lg mr-3">{area.emoji}</span>
                    <span className="font-medium text-sm">{area.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 border-b">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-rose-600" />
                Regions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`w-full text-left flex items-center py-2 px-3 rounded-md transition-colors ${
                    selectedRegion === null
                      ? "bg-rose-100 text-rose-700"
                      : "text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  <span className="text-lg mr-3">🌏</span>
                  <span className="font-medium">All Regions</span>
                </button>
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`w-full text-left flex items-center py-2 px-3 rounded-md transition-colors ${
                      selectedRegion === region.id
                        ? "bg-rose-100 text-rose-700"
                        : "text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                    }`}
                  >
                    <span className="text-lg mr-3">{region.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs text-slate-500">{region.chapters.length} chapters</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Dishes */}
            <div className="p-4 border-b">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <ChefHat className="w-4 h-4 mr-2 text-rose-600" />
                Popular Dishes
              </h3>
              <div className="space-y-2">
                {popularDishes.map((dish) => (
                  <Link
                    key={dish.id}
                    href={`/dish/${dish.id}`}
                    className="block py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{dish.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {dish.region.split(" – ")[0]}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Chapters */}
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-3">
                {searchQuery
                  ? `Search Results (${filteredChapters.length})`
                  : selectedRegion
                    ? `${regions.find((r) => r.id === selectedRegion)?.name} Chapters`
                    : "All Chapters"}
              </h3>
              <div className="space-y-3">
                {filteredChapters.map((chapter) => {
                  const icon = chapterIcons[chapter.id as keyof typeof chapterIcons] || "📖"

                  return (
                    <div key={chapter.id} className="space-y-2">
                      <Link
                        href={`/chapter/${chapter.id}`}
                        className="flex items-center py-2 px-3 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors group"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg mr-3">{icon}</span>
                        <div className="flex-1">
                          <div className="font-medium group-hover:text-rose-600">{chapter.title}</div>
                          <div className="text-xs text-slate-500">
                            {chapter.dishes.length} dishes • {regions.find((r) => r.id === chapter.region)?.name}
                          </div>
                        </div>
                      </Link>

                      {/* Show dishes if searching */}
                      {searchQuery &&
                        chapter.dishes.some((dish) => dish.name.toLowerCase().includes(searchQuery.toLowerCase())) && (
                          <div className="ml-6 space-y-1">
                            {chapter.dishes
                              .filter((dish) => dish.name.toLowerCase().includes(searchQuery.toLowerCase()))
                              .map((dish) => (
                                <Link
                                  key={dish.id}
                                  href={`/dish/${dish.id}`}
                                  className="block py-1 px-2 text-sm text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  → {dish.name}
                                </Link>
                              ))}
                          </div>
                        )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-slate-50">
            <p className="text-xs text-slate-500 text-center">© 2024 Bali & Lombok Food Guide</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
