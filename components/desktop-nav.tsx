"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { regionTagsData } from "@/lib/data/regions"

const chapters = [
  { id: "ceremonial-bali", title: "Ceremoniële & Feestgerechten", icon: "🏛️" },
  { id: "street-food-bali", title: "Market & Street Food", icon: "🏪" },
  { id: "vegetables-bali", title: "Balinese Groentegerechten", icon: "🥬" },
  { id: "fish-bali", title: "Vis Specialiteiten", icon: "🐟" },
  { id: "desserts-bali", title: "Desserts & Zoetigheden", icon: "🍮" },
  { id: "satay-lombok", title: "Lombok Satay & Grill", icon: "🍢" },
  { id: "rice-meals", title: "Rice & Meal Boxes", icon: "🍱" },
  { id: "bakso", title: "Bakso Variaties", icon: "🍲" },
]

const areas = Object.values(regionTagsData)

export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-slate-600 hover:text-rose-600 font-medium">
            Chapters
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <div className="p-2">
            <div className="text-sm font-semibold text-slate-700 mb-2 px-2">All Chapters</div>
            {chapters.map((chapter, index) => (
              <div key={chapter.id}>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/chapter/${chapter.id}`}
                    className="flex items-center px-2 py-2 hover:bg-rose-50 rounded-md cursor-pointer"
                  >
                    <span className="text-lg mr-3">{chapter.icon}</span>
                    <span className="text-sm">{chapter.title}</span>
                  </Link>
                </DropdownMenuItem>
                {index < chapters.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-slate-600 hover:text-rose-600 font-medium">
            Bali Areas
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="end">
          <div className="p-2">
            <div className="text-sm font-semibold text-slate-700 mb-2 px-2">Explore by Area</div>
            {areas.map((area, index) => (
              <div key={area.id}>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/region-tag/${area.id}`}
                    className="flex items-center px-2 py-2 hover:bg-rose-50 rounded-md cursor-pointer"
                  >
                    <span className="text-lg mr-3">{area.icon}</span>
                    <span className="text-sm">{area.name}</span>
                  </Link>
                </DropdownMenuItem>
                {index < areas.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/dishes" className="text-slate-600 hover:text-rose-600 font-medium transition-colors">
        All Dishes
      </Link>

      <Link href="/glossary" className="text-slate-600 hover:text-rose-600 font-medium transition-colors">
        Glossary
      </Link>

      <Link href="/" className="text-slate-600 hover:text-rose-600 font-medium transition-colors">
        Home
      </Link>
    </div>
  )
}
