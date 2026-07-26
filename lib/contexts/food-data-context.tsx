"use client"

import { createContext, useContext, type ReactNode } from "react"
import { dishesData, type Dish } from "@/lib/data/dishes"
import { chaptersData, type Chapter } from "@/lib/data/chapters"
import { regionsData, regionTagsData, type Region, type RegionTag } from "@/lib/data/regions"
import { glossaryTerms, type GlossaryTerm } from "@/lib/data/glossary"
import { culturalTraditionsData, type CulturalTradition } from "@/lib/data/cultural-traditions"

interface FoodDataContextType {
  // Dishes
  dishes: Record<string, Dish>
  getDish: (id: string) => Dish | undefined
  getAllDishes: () => Dish[]
  getDishesByChapter: (chapterId: string) => Dish[]
  getDishesByRegion: (regionId: string) => Dish[]

  getDishesByCategory: (category: string) => Dish[]
  getDishesBySpiceLevel: (spiceLevel: string) => Dish[]
  getDishesByDietary: (dietary: string) => Dish[]
  getVegetarianDishes: () => Dish[]
  getQuickDishes: () => Dish[]
  getDishStats: () => { total: number; byRegion: Record<string, number>; byCategory: Record<string, number> }
  filterDishes: (filters: {
    region?: string
    category?: string
    spiceLevel?: string
    dietary?: string[]
    maxCookingTime?: number
  }) => Dish[]

  // Chapters
  chapters: Record<string, Chapter>
  getChapter: (id: string) => Chapter | undefined
  getAllChapters: () => Chapter[]
  getChaptersByRegion: (regionId: string) => Chapter[]

  // Regions
  regions: Record<string, Region>
  getRegion: (id: string) => Region | undefined
  getAllRegions: () => Region[]

  // Region Tags (cities / areas)
  regionTags: Record<string, RegionTag>
  getRegionTag: (id: string) => RegionTag | undefined
  getAllRegionTags: () => RegionTag[]
  getRegionTagsByRegion: (regionId: string) => RegionTag[]
  getDishesByRegionTag: (regionTagId: string) => Dish[]

  // Cultural Traditions
  culturalTraditions: Record<string, CulturalTradition>
  getCulturalTradition: (id: string) => CulturalTradition | undefined
  getAllCulturalTraditions: () => CulturalTradition[]

  // Glossary
  glossary: GlossaryTerm[]
  getGlossaryTerm: (term: string) => GlossaryTerm | undefined
  getGlossaryByCategory: (category: string) => GlossaryTerm[]
  searchGlossary: (query: string) => GlossaryTerm[]

  // Search functionality
  searchDishes: (query: string) => Dish[]
  getPopularDishes: () => Dish[]
  searchDishesByRegion: (query: string, regionId: string) => Dish[]
}

const FoodDataContext = createContext<FoodDataContextType | undefined>(undefined)

interface FoodDataProviderProps {
  children: ReactNode
}

export function FoodDataProvider({ children }: FoodDataProviderProps) {
  // Dish methods
  const getDish = (id: string): Dish | undefined => {
    return dishesData[id]
  }

  const getAllDishes = (): Dish[] => {
    return Object.values(dishesData)
  }

  const getDishesByChapter = (chapterId: string): Dish[] => {
    return Object.values(dishesData).filter((dish) => dish.chapter === chapterId)
  }

  const getDishesByRegion = (regionId: string): Dish[] => {
    const region = regionsData[regionId]
    if (!region) return []

    const regionChapters = region.chapters
    return Object.values(dishesData).filter((dish) => regionChapters.includes(dish.chapter))
  }

  const getDishesByCategory = (category: string): Dish[] => {
    return Object.values(dishesData).filter((dish) => dish.category === category)
  }

  const getDishesBySpiceLevel = (spiceLevel: string): Dish[] => {
    return Object.values(dishesData).filter((dish) => dish.spiceLevel === spiceLevel)
  }

  const getDishesByDietary = (dietary: string): Dish[] => {
    return Object.values(dishesData).filter((dish) => dish.dietaryInfo?.includes(dietary))
  }

  const getVegetarianDishes = (): Dish[] => {
    return Object.values(dishesData).filter(
      (dish) => dish.dietaryInfo?.includes("vegetarian") || dish.dietaryInfo?.includes("vegan"),
    )
  }

  const getQuickDishes = (): Dish[] => {
    return Object.values(dishesData).filter((dish) => {
      if (!dish.cookingTime) return false
      const timeMatch = dish.cookingTime.match(/(\d+)/)
      return timeMatch && Number.parseInt(timeMatch[1]) <= 60 // 1 hour or less
    })
  }

  const getDishStats = () => {
    const allDishes = Object.values(dishesData)
    const byRegion: Record<string, number> = {}
    const byCategory: Record<string, number> = {}

    allDishes.forEach((dish) => {
      // Count by region
      const regionKey = dish.region || "Unknown"
      byRegion[regionKey] = (byRegion[regionKey] || 0) + 1

      // Count by category
      const categoryKey = dish.category || "Unknown"
      byCategory[categoryKey] = (byCategory[categoryKey] || 0) + 1
    })

    return {
      total: allDishes.length,
      byRegion,
      byCategory,
    }
  }

  const filterDishes = (filters: {
    region?: string
    category?: string
    spiceLevel?: string
    dietary?: string[]
    maxCookingTime?: number
  }): Dish[] => {
    return Object.values(dishesData).filter((dish) => {
      // Filter by region
      if (filters.region && dish.region !== filters.region) {
        return false
      }

      // Filter by category
      if (filters.category && dish.category !== filters.category) {
        return false
      }

      // Filter by spice level
      if (filters.spiceLevel && dish.spiceLevel !== filters.spiceLevel) {
        return false
      }

      // Filter by dietary requirements
      if (filters.dietary && filters.dietary.length > 0) {
        const hasDietaryMatch = filters.dietary.some((dietary) => dish.dietaryInfo?.includes(dietary))
        if (!hasDietaryMatch) {
          return false
        }
      }

      // Filter by cooking time
      if (filters.maxCookingTime && dish.cookingTime) {
        const timeMatch = dish.cookingTime.match(/(\d+)/)
        if (timeMatch && Number.parseInt(timeMatch[1]) > filters.maxCookingTime) {
          return false
        }
      }

      return true
    })
  }

  // Chapter methods
  const getChapter = (id: string): Chapter | undefined => {
    return chaptersData[id]
  }

  const getAllChapters = (): Chapter[] => {
    return Object.values(chaptersData)
  }

  const getChaptersByRegion = (regionId: string): Chapter[] => {
    const region = regionsData[regionId]
    if (!region) return []

    return region.chapters.map((chapterId) => chaptersData[chapterId]).filter(Boolean)
  }

  // Region methods
  const getRegion = (id: string): Region | undefined => {
    return regionsData[id]
  }

  const getAllRegions = (): Region[] => {
    return Object.values(regionsData)
  }

  // Region Tag methods
  const getRegionTag = (id: string): RegionTag | undefined => {
    return regionTagsData[id]
  }

  const getAllRegionTags = (): RegionTag[] => {
    return Object.values(regionTagsData)
  }

  const getRegionTagsByRegion = (regionId: string): RegionTag[] => {
    return Object.values(regionTagsData).filter((tag) => tag.region === regionId)
  }

  const getDishesByRegionTag = (regionTagId: string): Dish[] => {
    return Object.values(dishesData).filter((dish) => dish.regionTags?.includes(regionTagId))
  }

  // Cultural Traditions methods
  const getCulturalTradition = (id: string): CulturalTradition | undefined => {
    return culturalTraditionsData[id]
  }

  const getAllCulturalTraditions = (): CulturalTradition[] => {
    return Object.values(culturalTraditionsData)
  }

  // Glossary methods
  const getGlossaryTerm = (term: string): GlossaryTerm | undefined => {
    return glossaryTerms.find((item) => item.term.toLowerCase() === term.toLowerCase())
  }

  const getGlossaryByCategory = (category: string): GlossaryTerm[] => {
    if (category === "All") return glossaryTerms
    return glossaryTerms.filter((item) => item.category === category)
  }

  const searchGlossary = (query: string): GlossaryTerm[] => {
    const lowercaseQuery = query.toLowerCase()
    return glossaryTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(lowercaseQuery) || item.definition.toLowerCase().includes(lowercaseQuery),
    )
  }

  // Search functionality
  const searchDishes = (query: string): Dish[] => {
    const lowercaseQuery = query.toLowerCase()
    return Object.values(dishesData).filter(
      (dish) =>
        dish.name.toLowerCase().includes(lowercaseQuery) ||
        dish.subtitle.toLowerCase().includes(lowercaseQuery) ||
        dish.description.toLowerCase().includes(lowercaseQuery) ||
        dish.region.toLowerCase().includes(lowercaseQuery),
    )
  }

  const searchDishesByRegion = (query: string, regionId: string): Dish[] => {
    const regionDishes = getDishesByRegion(regionId)
    const lowercaseQuery = query.toLowerCase()

    return regionDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(lowercaseQuery) ||
        dish.subtitle.toLowerCase().includes(lowercaseQuery) ||
        dish.description.toLowerCase().includes(lowercaseQuery) ||
        dish.region.toLowerCase().includes(lowercaseQuery),
    )
  }

  const getPopularDishes = (): Dish[] => {
    // Return a curated list of popular dishes
    const popularIds = ["babi-guling", "nasi-campur", "sate-lilit", "gado-gado", "ayam-betutu"]
    return popularIds.map((id) => dishesData[id]).filter(Boolean)
  }

  const contextValue: FoodDataContextType = {
    // Dishes
    dishes: dishesData,
    getDish,
    getAllDishes,
    getDishesByChapter,
    getDishesByRegion,

    getDishesByCategory,
    getDishesBySpiceLevel,
    getDishesByDietary,
    getVegetarianDishes,
    getQuickDishes,
    getDishStats,
    filterDishes,

    // Chapters
    chapters: chaptersData,
    getChapter,
    getAllChapters,
    getChaptersByRegion,

    // Regions
    regions: regionsData,
    getRegion,
    getAllRegions,

    // Region Tags
    regionTags: regionTagsData,
    getRegionTag,
    getAllRegionTags,
    getRegionTagsByRegion,
    getDishesByRegionTag,

    // Cultural Traditions
    culturalTraditions: culturalTraditionsData,
    getCulturalTradition,
    getAllCulturalTraditions,

    // Glossary
    glossary: glossaryTerms,
    getGlossaryTerm,
    getGlossaryByCategory,
    searchGlossary,

    // Search
    searchDishes,
    getPopularDishes,
    searchDishesByRegion,
  }

  return <FoodDataContext.Provider value={contextValue}>{children}</FoodDataContext.Provider>
}

export function useFoodData() {
  const context = useContext(FoodDataContext)
  if (context === undefined) {
    throw new Error("useFoodData must be used within a FoodDataProvider")
  }
  return context
}
