"use client"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useGlobalSearch } from "@/lib/hooks/use-search"
import Link from "next/link"

interface SearchDropdownProps {
  placeholder?: string
  className?: string
}

export function SearchDropdown({ placeholder = "Search for dishes...", className = "" }: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { performSearch } = useGlobalSearch()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchResults = query.trim() ? performSearch(query).dishes.slice(0, 8) : []

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsOpen(value.trim().length > 0)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    if (query.trim()) {
      setIsOpen(true)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setIsFocused(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          className={`pl-12 pr-12 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-200 ${
            isFocused ? "ring-2 ring-rose-500" : ""
          }`}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 max-h-96 overflow-y-auto z-50">
          <div className="p-2">
            <div className="text-xs text-slate-500 px-3 py-2 border-b border-slate-100">
              {searchResults.length} dishes found
            </div>
            {searchResults.map((dish) => (
              <Link
                key={dish.id}
                href={`/dish/${dish.id}`}
                onClick={handleResultClick}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                <div className="flex-shrink-0">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                    {dish.name}
                  </div>
                  <div className="text-sm text-slate-500 truncate">
                    {dish.region} • {dish.occasion}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1 mt-1">{dish.description}</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim() && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
          <div className="p-6 text-center">
            <div className="text-slate-500 mb-2">No dishes found</div>
            <div className="text-sm text-slate-400">Try searching for ingredients, regions, or dish names</div>
          </div>
        </div>
      )}
    </div>
  )
}
