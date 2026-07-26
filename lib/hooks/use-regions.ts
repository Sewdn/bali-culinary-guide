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
  const { getRegion, getChaptersByRegion, getDishesByRegion, getRegionTagsByRegion } = useFoodData()

  const region = useMemo(() => getRegion(regionId), [getRegion, regionId])
  const chapters = useMemo(() => getChaptersByRegion(regionId), [getChaptersByRegion, regionId])
  const dishes = useMemo(() => getDishesByRegion(regionId), [getDishesByRegion, regionId])
  const regionTags = useMemo(() => getRegionTagsByRegion(regionId), [getRegionTagsByRegion, regionId])

  return {
    region,
    chapters,
    dishes,
    regionTags,
  }
}

export function useRegionTags() {
  const { getAllRegionTags, getRegionTag } = useFoodData()

  const regionTags = useMemo(() => getAllRegionTags(), [getAllRegionTags])

  return {
    regionTags,
    getRegionTag,
  }
}

export function useRegionTag(regionTagId: string) {
  const { getRegionTag, getDishesByRegionTag } = useFoodData()

  const regionTag = useMemo(() => getRegionTag(regionTagId), [getRegionTag, regionTagId])
  const dishes = useMemo(() => getDishesByRegionTag(regionTagId), [getDishesByRegionTag, regionTagId])

  return {
    regionTag,
    dishes,
  }
}
