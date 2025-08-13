"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeft, ChefHat, Clock, MapPin } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"

// Sample dishes data for search
const allDishes = [
  {
    id: "babi-guling",
    name: "Babi Guling",
    subtitle: "Spit-roasted Suckling Pig",
    region: "Bali – Gianyar",
    occasion: "Ceremonies, bruiloften",
    description: "Heel speenvarken gevuld met Base Genep en langzaam geroosterd voor krokant vel en sappig vlees.",
    image: "/balinese-babi-guling.png",
    chapter: "ceremonial",
    chapterTitle: "Ceremoniële & Feestgerechten",
  },
  {
    id: "ayam-betutu",
    name: "Ayam Betutu",
    subtitle: "Spiced Steamed Chicken",
    region: "Bali",
    occasion: "Ceremonies, feestmaaltijden",
    description: "Hele kip in Base Genep, soms gevuld (isi), langzaam gegaard.",
    image: "/balinese-ayam-betutu.png",
    chapter: "ceremonial",
    chapterTitle: "Ceremoniële & Feestgerechten",
  },
  {
    id: "tipat-kantok",
    name: "Tipat Kantok",
    subtitle: "Rice Cake Salad with Peanut Sauce",
    region: "Bali – Ubud",
    occasion: "Lunch, streetfood",
    description: "Ketupat met blanchée groenten, pindasaus en gebakken sjalot.",
    image: "/balinese-tipat-kantok.png",
    chapter: "street-food",
    chapterTitle: "Balinese Market & Street Food",
  },
  {
    id: "nasi-campur",
    name: "Nasi Campur",
    subtitle: "Mixed Rice Plate",
    region: "Indonesië breed",
    occasion: "Lunch/diner",
    description: "Rijst met gevarieerde bijgerechten: vlees, vis, tempeh, saté, sambal, groenten.",
    image: "/indonesian-nasi-campur.png",
    chapter: "rice-meals",
    chapterTitle: "Rice & Meal Boxes",
  },
  {
    id: "sate-lilit",
    name: "Sate Lilit",
    subtitle: "Wrapped Satay",
    region: "Bali",
    occasion: "Lunch/diner/snack",
    description: "Gehakt met kokos en kruiden, gewikkeld rond citroengras/bamboestok, gegrild.",
    image: "/balinese-sate-lilit.png",
    chapter: "satay-pepes",
    chapterTitle: "Satay & Pepes",
  },
  {
    id: "gado-gado",
    name: "Gado-Gado",
    subtitle: "Mixed Vegetable Salad with Peanut Sauce",
    region: "Indonesië breed",
    occasion: "Lunch/diner",
    description: "Gekookte groenten met tofu/tempeh en pindasaus.",
    image: "/indonesian-gado-gado.png",
    chapter: "vegetables",
    chapterTitle: "Aubergine & Groentegerechten",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDishes = useMemo(() => {
    if (!searchQuery.trim()) return []

    return allDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

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
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <Search className="w-8 h-8 mr-4" />
            <h1 className="font-serif font-black text-3xl sm:text-5xl">Search Dishes</h1>
          </div>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed">
            Find your perfect Indonesian dish by name, region, or ingredients
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
            <Input
              placeholder="Search for dishes, regions, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {searchQuery && (
            <div className="mt-4 text-sm text-slate-600">
              {filteredDishes.length === 0
                ? `No dishes found matching "${searchQuery}"`
                : `Found ${filteredDishes.length} dish${filteredDishes.length !== 1 ? "es" : ""} matching "${searchQuery}"`}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {!searchQuery.trim() ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-xl text-slate-600 mb-2">Start Your Culinary Search</h3>
                <p className="text-slate-500 mb-6">
                  Enter a dish name, region, or ingredient to discover authentic Indonesian cuisine.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("Bali")}
                    className="hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    Try "Bali"
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("rice")}
                    className="hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    Try "rice"
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery("satay")}
                    className="hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    Try "satay"
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : filteredDishes.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-xl text-slate-600 mb-2">No dishes found</h3>
                <p className="text-slate-500 mb-6">
                  Try searching for different terms or browse our chapters to discover new dishes.
                </p>
                <Link href="/">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">Browse All Chapters</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
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
                    <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                        {dish.chapterTitle}
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Bali Food Guide - Een culinaire reis door Bali en Indonesië</p>
        </div>
      </footer>
    </div>
  )
}
