"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useFoodData } from "@/lib/contexts/food-data-context"
import { useRegions, useRegionTags } from "@/lib/hooks/use-regions"

export default function AllDishesPage() {
  const { getAllDishes } = useFoodData()
  const { regions } = useRegions()
  const { regionTags } = useRegionTags()

  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [tagFilter, setTagFilter] = useState<string>("all")

  const allDishes = useMemo(() => getAllDishes(), [getAllDishes])

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      if (regionFilter !== "all" && dish.region !== regionFilter) return false
      if (tagFilter !== "all" && !dish.regionTags?.includes(tagFilter)) return false
      return true
    })
  }, [allDishes, regionFilter, tagFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Navigation */}
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

      {/* Header */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-rose-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
          <h1 className="font-serif font-black text-3xl sm:text-5xl mb-4 text-balance">All Dishes</h1>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed text-pretty">
            Browse the complete collection of {allDishes.length} authentic dishes from Bali, Lombok, and across
            Indonesia.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Filter by region</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={regionFilter === "all" ? "default" : "outline"}
                onClick={() => setRegionFilter("all")}
                className={regionFilter === "all" ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-transparent"}
              >
                All Regions
              </Button>
              {regions.map((region) => (
                <Button
                  key={region.id}
                  size="sm"
                  variant={regionFilter === region.id ? "default" : "outline"}
                  onClick={() => setRegionFilter(region.id)}
                  className={
                    regionFilter === region.id ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-transparent"
                  }
                >
                  <span className="mr-1">{region.flag}</span>
                  {region.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-2">Filter by Bali area</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={tagFilter === "all" ? "default" : "outline"}
                onClick={() => setTagFilter("all")}
                className={tagFilter === "all" ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-transparent"}
              >
                All Areas
              </Button>
              {regionTags.map((tag) => (
                <Button
                  key={tag.id}
                  size="sm"
                  variant={tagFilter === tag.id ? "default" : "outline"}
                  onClick={() => setTagFilter(tag.id)}
                  className={tagFilter === tag.id ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-transparent"}
                >
                  <span className="mr-1">{tag.emoji}</span>
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-slate-600 mb-6">
          Showing {filteredDishes.length} of {allDishes.length} dishes
        </p>

        {filteredDishes.length === 0 ? (
          <p className="text-center text-slate-500 py-12">No dishes match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <Card
                key={dish.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {dish.region}
                  </div>
                  {dish.spiceLevel && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      {dish.spiceLevel}
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors">
                    {dish.name}
                  </CardTitle>
                  <CardDescription className="text-rose-600 text-sm font-medium italic">
                    {dish.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-xs text-slate-500 mb-3">
                    <Clock className="w-3 h-3 mr-1 text-rose-500" />
                    {dish.cookingTime || "Varies"}
                  </div>
                  {dish.regionTags && dish.regionTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {dish.regionTags.map((tagId) => {
                        const tag = regionTags.find((t) => t.id === tagId)
                        if (!tag) return null
                        return (
                          <Badge key={tagId} variant="secondary" className="text-[10px]">
                            {tag.emoji} {tag.name}
                          </Badge>
                        )
                      })}
                    </div>
                  )}
                  <Link href={`/dish/${dish.id}`}>
                    <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs">
                      View Recipe
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
  )
}
