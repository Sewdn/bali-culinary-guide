"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useRegionTag, useRegionTags } from "@/lib/hooks/use-regions"

export default function RegionTagPage({ params }: { params: { id: string } }) {
  const { regionTag, dishes } = useRegionTag(params.id)
  const { regionTags } = useRegionTags()

  if (!regionTag) {
    notFound()
  }

  const otherTags = regionTags.filter((tag) => tag.id !== regionTag.id)

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
          <Link
            href="/dishes"
            className="inline-flex items-center text-rose-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Dishes
          </Link>

          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{regionTag.emoji}</span>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">Bali Area</Badge>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl mb-4 text-balance">{regionTag.name}</h1>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed text-pretty">{regionTag.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-white/30">
              {dishes.length} {dishes.length === 1 ? "Dish" : "Dishes"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-serif font-bold text-3xl text-slate-800 mb-8 text-center text-balance">
          Dishes found in {regionTag.name}
        </h2>

        {dishes.length === 0 ? (
          <p className="text-center text-slate-500">No dishes tagged for this area yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <Card
                key={dish.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {dish.region}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif font-bold text-xl text-slate-800 group-hover:text-rose-600 transition-colors">
                    {dish.name}
                  </CardTitle>
                  <CardDescription className="text-rose-600 font-medium italic">{dish.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-rose-500" />
                      {dish.occasion}
                    </div>
                    <div className="flex items-start text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                      {dish.context}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">{dish.description}</p>
                  <Link href={`/dish/${dish.id}`}>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium">
                      View Recipe & Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Other areas */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif font-bold text-2xl text-slate-800 mb-6 text-center">Explore Other Areas</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherTags.map((tag) => (
              <Link key={tag.id} href={`/region-tag/${tag.id}`}>
                <Button
                  variant="outline"
                  className="hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 bg-transparent"
                >
                  <span className="mr-2">{tag.emoji}</span>
                  {tag.name}
                </Button>
              </Link>
            ))}
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
  )
}
