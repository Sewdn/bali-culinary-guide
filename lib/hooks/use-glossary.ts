"use client"

import { useFoodData } from "@/lib/contexts/food-data-context"
import { useMemo } from "react"

export function useGlossary() {
  const { glossary, getGlossaryTerm, getGlossaryByCategory, searchGlossary } = useFoodData()

  return {
    glossary,
    getGlossaryTerm,
    getGlossaryByCategory,
    searchGlossary,
  }
}

export function useGlossaryTerm(term: string) {
  const { getGlossaryTerm } = useFoodData()

  return useMemo(() => getGlossaryTerm(term), [getGlossaryTerm, term])
}

export function useGlossaryByCategory(category: string) {
  const { getGlossaryByCategory } = useFoodData()

  return useMemo(() => getGlossaryByCategory(category), [getGlossaryByCategory, category])
}

export function useSearchGlossary(query: string) {
  const { searchGlossary } = useFoodData()

  return useMemo(() => {
    if (!query.trim()) return []
    return searchGlossary(query)
  }, [searchGlossary, query])
}

export function useGlossaryCategories() {
  const { glossary } = useFoodData()

  return useMemo(() => {
    const categories = new Set(glossary.map((term) => term.category))
    return ["All", ...Array.from(categories).sort()]
  }, [glossary])
}
