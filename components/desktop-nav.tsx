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

const chapters = [
  { id: "ceremonial", title: "Ceremoniële & Feestgerechten", icon: "🏛️" },
  { id: "street-food", title: "Market & Street Food", icon: "🏪" },
  { id: "rice-meals", title: "Rice & Meal Boxes", icon: "🍱" },
  { id: "satay-pepes", title: "Satay & Pepes", icon: "🍢" },
  { id: "bakso", title: "Bakso Variaties", icon: "🍲" },
  { id: "vegetables", title: "Aubergine & Groenten", icon: "🥬" },
  { id: "fish-regional", title: "Vis & Regionale Specialiteiten", icon: "🐟" },
  { id: "desserts", title: "Desserts & Zoetigheden", icon: "🍮" },
]

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

      <Link href="/glossary" className="text-slate-600 hover:text-rose-600 font-medium transition-colors">
        Glossary
      </Link>

      <Link href="/" className="text-slate-600 hover:text-rose-600 font-medium transition-colors">
        Home
      </Link>
    </div>
  )
}
