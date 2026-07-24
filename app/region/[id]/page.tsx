import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChefHat } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useRegion } from "@/lib/hooks/use-regions"

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

export default function RegionPage({ params }: { params: { id: string } }) {
  const { region, chapters, dishes } = useRegion(params.id)

  if (!region) {
    notFound()
  }

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

      {/* Region Header */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-rose-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>

          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{region.flag}</span>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">Regional Cuisine</Badge>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl mb-4">{region.name}</h1>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed">{region.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-white/30">{chapters.length} Chapters</Badge>
            <Badge className="bg-white/10 text-rose-100 border-white/20">{dishes.length} Traditional Dishes</Badge>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-serif font-bold text-3xl text-slate-800 mb-8 text-center">
          Culinary Chapters from {region.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter) => {
            const icon = chapterIcons[chapter.id as keyof typeof chapterIcons] || "📖"

            return (
              <Card
                key={chapter.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{icon}</span>
                    <Badge variant="secondary" className="text-xs">
                      {chapter.dishes.length} dishes
                    </Badge>
                  </div>
                  <CardTitle className="font-serif font-bold text-xl text-slate-800 group-hover:text-rose-600 transition-colors">
                    {chapter.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    {chapter.dishes.slice(0, 3).map((dish) => (
                      <div key={dish.id} className="flex items-center text-sm text-slate-600">
                        <ChefHat className="w-3 h-3 mr-2 text-rose-500" />
                        {dish.name}
                      </div>
                    ))}
                    {chapter.dishes.length > 3 && (
                      <div className="text-sm text-slate-500 italic">+{chapter.dishes.length - 3} more dishes...</div>
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
