"use client"

import { useFoodData } from "@/lib/contexts/food-data-context"
import { useMemo } from "react"

export function useChapters() {
  const { chapters, getChapter, getAllChapters } = useFoodData()

  return {
    chapters,
    getChapter,
    getAllChapters,
  }
}

export function useChapter(id: string) {
  const { getChapter } = useFoodData()

  return useMemo(() => getChapter(id), [getChapter, id])
}

export function useAllChapters() {
  const { getAllChapters } = useFoodData()

  return useMemo(() => getAllChapters(), [getAllChapters])
}
