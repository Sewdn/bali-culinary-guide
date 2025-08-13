"use client"

import { useFoodData } from "@/lib/contexts/food-data-context"
import { useMemo } from "react"

export function useDishes() {
  const { dishes, getDish, getAllDishes, getDishesByChapter, searchDishes, getPopularDishes } = useFoodData()

  return {
    dishes,
    getDish,
    getAllDishes,
    getDishesByChapter,
    searchDishes,
    getPopularDishes,
  }
}

export function useDish(id: string) {
  const { getDish } = useFoodData()

  return useMemo(() => getDish(id), [getDish, id])
}

export function useChapterDishes(chapterId: string) {
  const { getDishesByChapter } = useFoodData()

  return useMemo(() => getDishesByChapter(chapterId), [getDishesByChapter, chapterId])
}

export function useSearchDishes(query: string) {
  const { searchDishes } = useFoodData()

  return useMemo(() => {
    if (!query.trim()) return []
    return searchDishes(query)
  }, [searchDishes, query])
}

export function usePopularDishes() {
  const { getPopularDishes } = useFoodData()

  return useMemo(() => getPopularDishes(), [getPopularDishes])
}
