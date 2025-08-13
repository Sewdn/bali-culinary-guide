"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Book, Filter } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"

const glossaryTerms = [
  {
    term: "Ayam",
    definition: "Kip",
    category: "Ingredients",
    relatedDishes: ["Ayam Betutu", "Ayam Taliwang", "Soto Ayam Lamongan"],
  },
  {
    term: "Babi Guling",
    definition: "Geroosterd speenvarken",
    category: "Dishes",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Balado",
    definition: "Pittige saus op basis van chili en tomaat",
    category: "Sauces",
    relatedDishes: ["Terong Balado"],
  },
  {
    term: "Base Genep",
    definition:
      "Volledige Balinese kruidenpasta die de basis vormt voor veel traditionele gerechten. Bevat knoflook, sjalot, gember, laos, kencur, kunyit, sereh, daun jeruk, kemiri, terasi, koriander, tamarind, palmsuiker, zout, peper, kruidnagel, nootmuskaat en olie.",
    category: "Spice Pastes",
    relatedDishes: ["Babi Guling", "Ayam Betutu", "Bebek Betutu"],
  },
  {
    term: "Betutu",
    definition: "Traditionele Balinese bereidingswijze waarbij vlees langzaam wordt gegaard in kruiden",
    category: "Cooking Methods",
    relatedDishes: ["Ayam Betutu", "Bebek Betutu"],
  },
  {
    term: "Blancheren",
    definition: "Kort koken in kokend water om groenten gaar maar knapperig te houden",
    category: "Cooking Methods",
    relatedDishes: ["Gado-Gado", "Tipat Kantok"],
  },
  {
    term: "Bumbu",
    definition: "Kruidenmix of seasoning in Indonesisch",
    category: "Spice Pastes",
    relatedDishes: [],
  },
  {
    term: "Campur",
    definition: "Gemengd - verwijst naar de variëteit aan bijgerechten",
    category: "Terms",
    relatedDishes: ["Nasi Campur"],
  },
  {
    term: "Daun Jeruk",
    definition: "Kaffir limoenblad - aromatisch blad dat citrusaroma toevoegt",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Pepes Ikan"],
  },
  {
    term: "Gado-Gado",
    definition: "Letterlijk 'mix-mix' - verwijst naar de variëteit aan ingrediënten in deze groentesalade",
    category: "Dishes",
    relatedDishes: ["Gado-Gado"],
  },
  {
    term: "Ikan",
    definition: "Vis",
    category: "Ingredients",
    relatedDishes: ["Pepes Ikan", "Ikan Nyat-Nyat", "Bakso Ikan"],
  },
  {
    term: "Isi",
    definition: "Vulling van kruiden en groenten die soms in vlees wordt gestopt",
    category: "Terms",
    relatedDishes: ["Ayam Betutu"],
  },
  {
    term: "Jukut",
    definition: "Soep of curry (Balinees)",
    category: "Dishes",
    relatedDishes: ["Jukut Terong"],
  },
  {
    term: "Kemiri",
    definition: "Candlenuts - noten die gebruikt worden om sauzen te verdikken en een romige textuur te geven",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Kencur",
    definition: "Lesser galangal - mildere variant van laos met een meer aardse smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Kerupuk",
    definition: "Kroepoek - knapperige crackers gemaakt van tapioca of rijst",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur"],
  },
  {
    term: "Ketupat",
    definition: "Geperste rijstcake gekookt in geweven palmtak-omhulsel",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok"],
  },
  {
    term: "Kunyit",
    definition: "Kurkuma - geeft de karakteristieke gele kleur en aardse smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Laklak",
    definition: "Balinese rijstpannenkoekjes",
    category: "Dishes",
    relatedDishes: ["Laklak"],
  },
  {
    term: "Laos",
    definition: "Greater galangal - een wortel uit de gemberfamilie met een scherpe, citrusachtige smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Lawar",
    definition: "Balinees gehaktgerecht met kokos en specerijen",
    category: "Dishes",
    relatedDishes: ["Lawar"],
  },
  {
    term: "Lilit",
    definition: "Wikkelen - verwijst naar de manier waarop het vlees rond de stok wordt gewikkeld",
    category: "Cooking Methods",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Long beans",
    definition: "Kousenband - lange groene bonen populair in Aziatische keuken",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok"],
  },
  {
    term: "Matah",
    definition: "Rauwe (sambal), met citruselementen zoals sereh en daun jeruk",
    category: "Sauces",
    relatedDishes: ["Sambal Matah"],
  },
  {
    term: "Nasi",
    definition: "Rijst - het basisvoedsel van Indonesië",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur", "Nasi Bungkus", "Nasi Kotak", "Nasi Jinggo"],
  },
  {
    term: "Pepes",
    definition: "Bereiding in bananenblad waarbij ingrediënten worden gestoomd of gegrild",
    category: "Cooking Methods",
    relatedDishes: ["Pepes Ikan"],
  },
  {
    term: "Penyet",
    definition: "Pletten (bijvoorbeeld terong penyet)",
    category: "Cooking Methods",
    relatedDishes: ["Terong Penyet"],
  },
  {
    term: "Pindasaus",
    definition: "Rijke saus op basis van pinda's, de signature saus van Gado-Gado",
    category: "Sauces",
    relatedDishes: ["Gado-Gado", "Tipat Kantok"],
  },
  {
    term: "Rujak",
    definition: "Fruit met pittige of zure saus",
    category: "Dishes",
    relatedDishes: ["Rujak Kuah Pindang"],
  },
  {
    term: "Sambal",
    definition: "Chili saus of pasta throughout Indonesië",
    category: "Sauces",
    relatedDishes: ["Sambal Terong", "Sambal Matah"],
  },
  {
    term: "Sambal Matah",
    definition: "Rauw Balinese sambal met shallot, sereh, daun jeruk, olie, limoen",
    category: "Sauces",
    relatedDishes: ["Sambal Matah"],
  },
  {
    term: "Sambal Terasi",
    definition: "Sambal met garnalenpasta",
    category: "Sauces",
    relatedDishes: [],
  },
  {
    term: "Sate Lilit",
    definition: "Gehakt saté gewikkeld om stick (sereh)",
    category: "Dishes",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Saté",
    definition: "Traditioneel gegrild vlees aan stokjes",
    category: "Dishes",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Sereh",
    definition: "Citroengras - geeft een frisse, citrusachtige smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Soto",
    definition: "Soep (zoals Soto Ayam)",
    category: "Dishes",
    relatedDishes: ["Soto Ayam Lamongan"],
  },
  {
    term: "Taliwang",
    definition: "Lombok gegrilde kipstijl",
    category: "Cooking Methods",
    relatedDishes: ["Ayam Taliwang"],
  },
  {
    term: "Taugé",
    definition: "Sojascheuten - knapperige groente die textuur toevoegt",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok", "Gado-Gado"],
  },
  {
    term: "Tempeh",
    definition: "Gefermenteerde sojabonen - traditionele Indonesische eiwitbron",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur", "Gado-Gado"],
  },
  {
    term: "Terasi",
    definition: "Garnalenpasta - gefermenteerde garnalen die umami toevoegen",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Terong",
    definition: "Aubergine",
    category: "Ingredients",
    relatedDishes: ["Terong Balado", "Terong Santan", "Terong Penyet", "Jukut Terong", "Sambal Terong"],
  },
  {
    term: "Urap",
    definition: "Groentesalade met kokos (vergelijkbaar met lawar)",
    category: "Dishes",
    relatedDishes: [],
  },
  {
    term: "Warung",
    definition: "Eetkraam of lokaal eetzaakje",
    category: "Terms",
    relatedDishes: [],
  },
]

const categories = ["All", "Dishes", "Ingredients", "Sauces", "Spice Pastes", "Cooking Methods", "Terms"]

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const groupedTerms = useMemo(() => {
    const grouped: { [key: string]: typeof glossaryTerms } = {}

    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase()
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = []
      }
      grouped[firstLetter].push(term)
    })

    // Sort each group
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return grouped
  }, [filteredTerms])

  const alphabetLetters = Object.keys(groupedTerms).sort()

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
            <Book className="w-8 h-8 mr-4" />
            <h1 className="font-serif font-black text-3xl sm:text-5xl">Complete Glossary</h1>
          </div>
          <p className="text-xl text-rose-100 max-w-3xl leading-relaxed">
            Your comprehensive guide to Indonesian culinary terms, ingredients, and cooking methods
          </p>
          <div className="mt-6">
            <Badge className="bg-white/20 text-white border-white/30">{filteredTerms.length} Terms Available</Badge>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search terms or definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 text-sm text-slate-600">
              Found {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </div>
          )}
        </div>

        {/* Alphabet Navigation */}
        {!searchQuery && selectedCategory === "All" && (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <h3 className="font-semibold text-slate-800 mb-3">Jump to Letter</h3>
            <div className="flex flex-wrap gap-2">
              {alphabetLetters.map((letter) => (
                <Button
                  key={letter}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const element = document.getElementById(`letter-${letter}`)
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-10 h-10 p-0 hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Glossary Terms */}
        <div className="space-y-8">
          {alphabetLetters.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="font-serif font-bold text-xl text-slate-600 mb-2">No terms found</h3>
                <p className="text-slate-500">Try adjusting your search query or selecting a different category.</p>
              </CardContent>
            </Card>
          ) : (
            alphabetLetters.map((letter) => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="font-serif font-black text-3xl text-slate-800 mb-6 border-b-2 border-rose-200 pb-2">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedTerms[letter].map((item, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="font-serif font-bold text-xl text-rose-600">{item.term}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-slate-700 leading-relaxed mb-4">{item.definition}</p>

                        {item.relatedDishes.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Related Dishes:</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedDishes.map((dish) => (
                                <Badge key={dish} variant="outline" className="text-xs">
                                  {dish}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
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
