"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Home, Book, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAllChapters } from "@/lib/hooks/use-chapters"
import { usePopularDishes } from "@/lib/hooks/use-dishes"

const chapterIcons = {
  ceremonial: "🏛️",
  "street-food": "🏪",
  "rice-meals": "🍱",
  "satay-pepes": "🍢",
  bakso: "🍲",
  vegetables: "🥬",
  "fish-regional": "🐟",
  desserts: "🍮",
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const chapters = useAllChapters()
  const popularDishes = usePopularDishes()

  const filteredChapters = chapters.filter(
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
            <p className="text-rose-100 text-sm">Een culinaire reis door Bali</p>
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
                  href="/glossary"
                  className="flex items-center py-2 px-3 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Book className="w-4 h-4 mr-3" />
                  Complete Glossary
                </Link>
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
                        {dish.chapter}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Chapters */}
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-3">
                {searchQuery ? `Search Results (${filteredChapters.length})` : "All Chapters"}
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
                          <div className="text-xs text-slate-500">{chapter.dishes.length} dishes</div>
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
            <p className="text-xs text-slate-500 text-center">© 2024 Bali Food Guide</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
