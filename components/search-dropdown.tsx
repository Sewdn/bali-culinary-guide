"use client"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useGlobalSearch } from "@/lib/hooks/use-search"
import Link from "next/link"

interface SearchDropdownProps {
  placeholder?: string
  className?: string
  onSearchStateChange?: (isSearching: boolean) => void
}

export function SearchDropdown({
  placeholder = "Search for dishes...",
  className = "",
  onSearchStateChange,
}: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { performSearch } = useGlobalSearch()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchResults = query.trim() ? performSearch(query).dishes.slice(0, 6) : []

  useEffect(() => {
    onSearchStateChange?.(isOpen && query.trim().length > 0)
  }, [isOpen, query, onSearchStateChange])

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
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 h-5 w-5 z-10" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          className={`pl-12 pr-12 py-4 text-lg bg-white border-2 border-slate-200 shadow-lg focus:shadow-xl transition-all duration-200 placeholder:text-slate-500 text-slate-900 ${
            isFocused ? "ring-2 ring-rose-500 border-rose-300" : "hover:border-slate-300"
          }`}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 z-10 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-[70vh] overflow-hidden z-50">
          <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3">
            <div className="text-sm font-medium text-slate-700">{searchResults.length} dishes found</div>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-60px)] overscroll-contain">
            {searchResults.map((dish) => (
              <Link
                key={dish.id}
                href={`/dish/${dish.id}`}
                onClick={handleResultClick}
                className="flex items-center gap-4 p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors group border-b border-slate-50 last:border-b-0 min-h-[80px]"
              >
                <div className="flex-shrink-0">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors text-base leading-tight mb-1">
                    {dish.name}
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    {dish.region} • {dish.occasion}
                  </div>
                  <div className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{dish.description}</div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className="w-3 h-3 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-50">
          <div className="p-8 text-center">
            <div className="text-slate-600 mb-2 font-medium">No dishes found</div>
            <div className="text-sm text-slate-500 leading-relaxed">
              Try searching for ingredients, regions, or dish names
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
