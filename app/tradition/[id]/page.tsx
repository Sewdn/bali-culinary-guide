"use client"

import { useFoodData } from "@/lib/contexts/food-data-context"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react"

interface TraditionPageProps {
  params: {
    id: string
  }
}

export default function TraditionPage({ params }: TraditionPageProps) {
  const { getCulturalTradition } = useFoodData()
  const tradition = getCulturalTradition(params.id)

  if (!tradition) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={tradition.image || "/placeholder.svg"}
          alt={tradition.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Guide</span>
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{tradition.name}</h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">{tradition.translation}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{tradition.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{tradition.occasion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Traditie Beschrijving</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{tradition.description}</p>
            </section>

            {/* Background */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Achtergrond & Geschiedenis</h2>
              <p className="text-gray-700 leading-relaxed">{tradition.background}</p>
            </section>

            {/* Significance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Culturele Betekenis</h2>
              <p className="text-gray-700 leading-relaxed">{tradition.significance}</p>
            </section>

            {/* Typical Dishes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Typische Gerechten</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tradition.typicalDishes.map((dish, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800 font-medium">{dish}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-600" />
                Snelle Feiten
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Regio:</span>
                  <p className="text-gray-600">{tradition.region}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Gelegenheid:</span>
                  <p className="text-gray-600">{tradition.occasion}</p>
                </div>
              </div>
            </div>

            {/* Glossary */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Woordenlijst</h3>
              <div className="space-y-3">
                {Object.entries(tradition.glossary).map(([term, definition]) => (
                  <div key={term} className="border-b border-gray-100 pb-2 last:border-b-0">
                    <dt className="font-medium text-gray-900 text-sm">{term}</dt>
                    <dd className="text-gray-600 text-sm mt-1">{definition}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
