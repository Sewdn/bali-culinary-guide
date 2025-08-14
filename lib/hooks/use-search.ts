"use client"

import { useFoodData } from "@/lib/contexts/food-data-context"
import { useMemo } from "react"

export function useSearch(query: string) {
  const { searchDishes, searchGlossary } = useFoodData()

  return useMemo(() => {
    if (!query || !query.trim()) {
      return {
        dishes: [],
        glossaryTerms: [],
        hasResults: false,
      }
    }

    const dishes = searchDishes(query)
    const glossaryTerms = searchGlossary(query)

    return {
      dishes,
      glossaryTerms,
      hasResults: dishes.length > 0 || glossaryTerms.length > 0,
    }
  }, [searchDishes, searchGlossary, query])
}

export function useGlobalSearch() {
  const { searchDishes, searchGlossary, getPopularDishes } = useFoodData()

  const performSearch = useMemo(
    () => (query: string) => {
      if (!query || !query.trim()) {
        return {
          dishes: getPopularDishes(),
          glossaryTerms: [],
          hasResults: true,
          isPopular: true,
        }
      }

      const dishes = searchDishes(query)
      const glossaryTerms = searchGlossary(query)

      return {
        dishes,
        glossaryTerms,
        hasResults: dishes.length > 0 || glossaryTerms.length > 0,
        isPopular: false,
      }
    },
    [searchDishes, searchGlossary, getPopularDishes],
  )

  return { performSearch }
}
