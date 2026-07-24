"use client"

import { useMemo } from "react"
import { useFoodData } from "@/lib/contexts/food-data-context"

export function useRegions() {
  const { getAllRegions, getRegion } = useFoodData()

  const regions = useMemo(() => getAllRegions(), [getAllRegions])

  return {
    regions,
    getRegion,
  }
}

export function useRegion(regionId: string) {
  const { getRegion, getChaptersByRegion, getDishesByRegion } = useFoodData()

  const region = useMemo(() => getRegion(regionId), [getRegion, regionId])
  const chapters = useMemo(() => getChaptersByRegion(regionId), [getChaptersByRegion, regionId])
  const dishes = useMemo(() => getDishesByRegion(regionId), [getDishesByRegion, regionId])

  return {
    region,
    chapters,
    dishes,
  }
}
