"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Users, ChefHat, Heart, Sparkles, Flame, Timer } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useFoodData } from "@/lib/contexts/food-data-context"

function getRelevantTraditions(dishName: string, occasion: string, chapter: string) {
  const traditions = []

  // Add Megibung for communal dishes
  if (
    chapter === "ceremonial-festive" ||
    occasion.toLowerCase().includes("ceremony") ||
    occasion.toLowerCase().includes("celebration")
  ) {
    traditions.push({
      name: "Megibung",
      description:
        "Traditional communal dining from Karangasem where people share food from one large tray (dulang), symbolizing togetherness (menyama braya – living as kin).",
      relevance: "This dish is often enjoyed during Megibung gatherings, strengthening community bonds.",
    })
  }

  // Add Mebanten for ceremonial dishes
  if (
    chapter === "ceremonial-festive" ||
    dishName.toLowerCase().includes("lawar") ||
    dishName.toLowerCase().includes("babi")
  ) {
    traditions.push({
      name: "Mebanten / Yadnya Offerings",
      description:
        "Sacred food offerings placed at temples and shrines, where entire dishes are offered to the gods before being shared among the community.",
      relevance:
        "This dish is commonly prepared as a temple offering, serving as a bridge between the material world and the divine.",
    })
  }

  // Add Ngelawar tradition for lawar dishes
  if (dishName.toLowerCase().includes("lawar")) {
    traditions.push({
      name: "Ngelawar Tradition",
      description:
        "The collective preparation of lawar by men in the family or village before ceremonies, combining cooking with social bonding.",
      relevance: "The preparation of this dish brings together community members in a shared cooking experience.",
    })
  }

  // Add Nasi Tumpeng for rice dishes and celebrations
  if (
    dishName.toLowerCase().includes("nasi") ||
    occasion.toLowerCase().includes("celebration") ||
    occasion.toLowerCase().includes("birthday")
  ) {
    traditions.push({
      name: "Nasi Tumpeng",
      description:
        "A cone-shaped mound of yellow rice surrounded by side dishes, used in celebrations. The cone symbolizes Mount Meru, the sacred cosmic mountain.",
      relevance: "Often served alongside this dish during important celebrations and ceremonies.",
    })
  }

  // Add Otonan for traditional dishes
  if (chapter === "ceremonial-festive" || occasion.toLowerCase().includes("ritual")) {
    traditions.push({
      name: "Otonan (Balinese Birthday)",
      description:
        "A ritual held every 210 days based on the Balinese Pawukon calendar, involving symbolic foods to pray for health and balance.",
      relevance: "This dish may be prepared during Otonan celebrations as part of the ritual feast.",
    })
  }

  // Add Banjar communal feasts for most traditional dishes
  if (chapter === "ceremonial-festive" || chapter === "market-street-food") {
    traditions.push({
      name: "Banjar Communal Feasts",
      description:
        "Village community-organized ceremonies where food preparation is collective, with everyone contributing ingredients, labor, or money.",
      relevance:
        "This dish is often prepared collectively by the banjar community, strengthening social ties through shared cooking.",
    })
  }

  return traditions.slice(0, 3) // Limit to 3 most relevant traditions
}

export default function DishPage({ params }: { params: { id: string } }) {
  const { getDish } = useFoodData()
  const dish = getDish(params.id)

  if (!dish) {
    notFound()
  }

  const relevantTraditions = getRelevantTraditions(dish.name, dish.occasion, dish.chapter)

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

      {/* Dish Hero */}
      <section className="relative">
        <div className="h-96 relative overflow-hidden">
          <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/chapter/${dish.chapter}`}
              className="inline-flex items-center text-rose-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {dish.chapterTitle}
            </Link>
            <h1 className="font-serif font-black text-4xl sm:text-6xl mb-2">{dish.name}</h1>
            <p className="text-xl text-rose-100 italic mb-4">{dish.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-rose-600 text-white border-rose-500">
                <MapPin className="w-3 h-3 mr-1" />
                {dish.region}
              </Badge>
              <Badge className="bg-pink-600 text-white border-pink-500">
                <Clock className="w-3 h-3 mr-1" />
                {dish.occasion}
              </Badge>
              {dish.spiceLevel && (
                <Badge className="bg-red-600 text-white border-red-500">
                  <Flame className="w-3 h-3 mr-1" />
                  {dish.spiceLevel}
                </Badge>
              )}
              {dish.cookingTime && (
                <Badge className="bg-blue-600 text-white border-blue-500">
                  <Timer className="w-3 h-3 mr-1" />
                  {dish.cookingTime}
                </Badge>
              )}
              {dish.dietaryInfo && dish.dietaryInfo.length > 0 && (
                <Badge className="bg-green-600 text-white border-green-500">
                  {dish.dietaryInfo.includes("vegetarian")
                    ? "Vegetarian"
                    : dish.dietaryInfo.includes("vegan")
                      ? "Vegan"
                      : dish.dietaryInfo.includes("halal")
                        ? "Halal"
                        : dish.dietaryInfo[0]}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800 flex items-center">
                  <ChefHat className="w-6 h-6 mr-3 text-rose-600" />
                  About This Dish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-slate-700 leading-relaxed">{dish.description}</p>
                <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-600">
                  <h4 className="font-semibold text-slate-800 mb-2">Cultural Context</h4>
                  <p className="text-slate-700">{dish.context}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-slate-800 mb-2">Cultural Significance</h4>
                  <p className="text-slate-700">{dish.culturalSignificance}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-rose-600" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className={`${
                        ingredient.startsWith("-")
                          ? "ml-4 text-slate-600"
                          : ingredient.endsWith(":")
                            ? "font-semibold text-slate-800 mt-3"
                            : "text-slate-700"
                      }`}
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Preparation */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800">Preparation Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{dish.preparation}</p>
              </CardContent>
            </Card>

            {relevantTraditions.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-serif font-bold text-2xl text-slate-800 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-rose-600" />
                    Cultural Food Traditions
                  </CardTitle>
                  <CardDescription>How this dish connects to Balinese culture and community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {relevantTraditions.map((tradition, index) => (
                    <div key={index} className="border-l-4 border-pink-400 pl-4 py-2">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-2">{tradition.name}</h4>
                          <p className="text-slate-700 mb-3 leading-relaxed">{tradition.description}</p>
                          <div className="bg-pink-50 p-3 rounded-lg">
                            <p className="text-sm text-pink-800 font-medium">
                              <span className="text-pink-600">Connection:</span> {tradition.relevance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-200">
                    <p className="text-sm text-slate-700 italic">
                      <strong>Cultural Note:</strong> In Bali, food traditions are inseparable from religion and
                      community. Eating together reinforces cosmic harmony, social solidarity, and gratitude to the
                      gods.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Region:</span>
                  <span className="ml-2 text-slate-600 capitalize">{dish.region}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Best for:</span>
                  <span className="ml-2 text-slate-600">{dish.occasion}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Chapter:</span>
                  <span className="ml-2 text-slate-600">{dish.chapterTitle}</span>
                </div>
                {dish.cookingTime && (
                  <div className="flex items-center text-sm">
                    <Timer className="w-4 h-4 mr-2 text-rose-500" />
                    <span className="font-medium">Cooking Time:</span>
                    <span className="ml-2 text-slate-600">{dish.cookingTime}</span>
                  </div>
                )}
                {dish.servingSize && (
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-rose-500" />
                    <span className="font-medium">Serves:</span>
                    <span className="ml-2 text-slate-600">{dish.servingSize}</span>
                  </div>
                )}
                {dish.spiceLevel && (
                  <div className="flex items-center text-sm">
                    <Flame className="w-4 h-4 mr-2 text-rose-500" />
                    <span className="font-medium">Spice Level:</span>
                    <span className="ml-2 text-slate-600 capitalize">{dish.spiceLevel}</span>
                  </div>
                )}
                {dish.dietaryInfo && dish.dietaryInfo.length > 0 && (
                  <div className="flex items-start text-sm">
                    <Heart className="w-4 h-4 mr-2 text-rose-500 mt-0.5" />
                    <span className="font-medium">Dietary:</span>
                    <div className="ml-2 flex flex-wrap gap-1">
                      {dish.dietaryInfo.map((info, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {info.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {dish.tags && dish.tags.length > 0 && (
                  <div className="flex items-start text-sm">
                    <Sparkles className="w-4 h-4 mr-2 text-rose-500 mt-0.5" />
                    <span className="font-medium">Tags:</span>
                    <div className="ml-2 flex flex-wrap gap-1">
                      {dish.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Glossary for this dish */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Glossary</CardTitle>
                <CardDescription>Key terms for this dish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dish.glossary.map((item, index) => (
                  <div key={index} className="border-b border-slate-100 pb-3 last:border-b-0">
                    <h4 className="font-semibold text-rose-600 mb-1">{item.term}</h4>
                    <p className="text-sm text-slate-600">{item.definition}</p>
                  </div>
                ))}
                <Link href="/glossary">
                  <Button
                    variant="outline"
                    className="w-full mt-4 hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    View Complete Glossary
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Dishes */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/chapter/${dish.chapter}`}>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                    More from {dish.chapterTitle}
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full hover:bg-rose-50 hover:border-rose-300 bg-transparent">
                    All Chapters
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
