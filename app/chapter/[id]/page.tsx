import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"
import { useChapter, useAllChapters } from "@/lib/hooks/use-chapters"
import { useRegions } from "@/lib/hooks/use-regions"

export default function ChapterPage({ params }: { params: { id: string } }) {
  const chapter = useChapter(params.id)
  const allChapters = useAllChapters()
  const { regions } = useRegions()

  if (!chapter) {
    notFound()
  }

  const chapterRegion = regions.find((region) => region.id === chapter.region)
  const regionChapters = allChapters.filter((c) => c.region === chapter.region)

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

      {/* Chapter Header */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-rose-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chapters
          </Link>

          {chapterRegion && (
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{chapterRegion.flag}</span>
              <Badge className="bg-white/20 text-white border-white/30 text-sm">{chapterRegion.name} Cuisine</Badge>
            </div>
          )}

          <h1 className="font-serif font-black text-3xl sm:text-5xl mb-4">{chapter.title}</h1>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed">{chapter.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-white/30">{chapter.dishes.length} Traditional Dishes</Badge>
            {chapterRegion && (
              <Badge className="bg-white/10 text-rose-100 border-white/20">
                {chapterRegion.description.split(" - ")[0]}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapter.dishes.map((dish) => (
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
      </section>

      {/* Navigation to Other Chapters */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-serif font-bold text-2xl text-slate-800 mb-6 text-center">
              {chapterRegion ? `More ${chapterRegion.name} Chapters` : "Explore Other Chapters"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {regionChapters
                .filter((chapterData) => chapterData.id !== params.id)
                .map((chapterData) => (
                  <Link key={chapterData.id} href={`/chapter/${chapterData.id}`}>
                    <Button
                      variant="outline"
                      className="hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 bg-transparent"
                    >
                      {chapterData.title}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl text-slate-700 mb-4 text-center">Explore Other Regions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {regions
                .filter((region) => region.id !== chapter.region)
                .map((region) => {
                  const firstChapter = allChapters.find((c) => c.region === region.id)
                  return firstChapter ? (
                    <Link key={region.id} href={`/chapter/${firstChapter.id}`}>
                      <Button variant="ghost" className="hover:bg-rose-50 hover:text-rose-600 text-slate-600">
                        <span className="mr-2">{region.flag}</span>
                        {region.name}
                      </Button>
                    </Link>
                  ) : null
                })}
            </div>
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
