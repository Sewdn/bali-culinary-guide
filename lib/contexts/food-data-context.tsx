"use client"

import { createContext, useContext, type ReactNode } from "react"
import { dishesData, type Dish } from "@/lib/data/dishes"
import { chaptersData, type Chapter } from "@/lib/data/chapters"
import { regionsData, type Region } from "@/lib/data/regions"
import { glossaryTerms, type GlossaryTerm } from "@/lib/data/glossary"
import { culturalTraditionsData, type CulturalTradition } from "@/lib/data/cultural-traditions"
import {
  filterDishes,
  getDishesByCategory,
  getVegetarianDishes,
  getVeganDishes,
  getHalalDishes,
  getSpicyDishes,
  getDishesByDifficulty,
  searchDishes as searchDishesUtil,
  getDishesByTags,
  getPopularDishes as getPopularDishesUtil,
  getRandomDishes,
  groupDishesByRegion,
  groupDishesByCategory,
  getDishStats,
  type DishFilters,
} from "@/lib/utils/dish-filters"
import type { DISH_CATEGORIES } from "@/lib/schemas/dish-schema"

interface FoodDataContextType {
  // Dishes
  dishes: Record<string, Dish>
  getDish: (id: string) => Dish | undefined
  getAllDishes: () => Dish[]
  getDishesByChapter: (chapterId: string) => Dish[]
  getDishesByRegion: (regionId: string) => Dish[]

  // Advanced filtering
  filterDishes: (filters: DishFilters) => Dish[]
  getDishesByCategory: (category: keyof typeof DISH_CATEGORIES) => Dish[]
  getVegetarianDishes: () => Dish[]
  getVeganDishes: () => Dish[]
  getHalalDishes: () => Dish[]
  getSpicyDishes: () => Dish[]
  getDishesByDifficulty: (difficulty: "Easy" | "Medium" | "Hard") => Dish[]
  getDishesByTags: (tags: string[]) => Dish[]
  getRandomDishes: (count?: number) => Dish[]

  // Grouping and stats
  groupDishesByRegion: () => Record<string, Dish[]>
  groupDishesByCategory: () => Record<string, Dish[]>
  getDishStats: () => ReturnType<typeof getDishStats>

  // Chapters
  chapters: Record<string, Chapter>
  getChapter: (id: string) => Chapter | undefined
  getAllChapters: () => Chapter[]
  getChaptersByRegion: (regionId: string) => Chapter[]

  // Regions
  regions: Record<string, Region>
  getRegion: (id: string) => Region | undefined
  getAllRegions: () => Region[]

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
  const allDishes = Object.values(dishesData)

  // Dish methods
  const getDish = (id: string): Dish | undefined => {
    return dishesData[id]
  }

  const getAllDishes = (): Dish[] => {
    return allDishes
  }

  const getDishesByChapter = (chapterId: string): Dish[] => {
    return allDishes.filter((dish) => dish.chapter === chapterId)
  }

  const getDishesByRegion = (regionId: string): Dish[] => {
    const region = regionsData[regionId]
    if (!region) return []

    const regionChapters = region.chapters
    return allDishes.filter((dish) => regionChapters.includes(dish.chapter))
  }

  const filterDishesMethod = (filters: DishFilters): Dish[] => {
    return filterDishes(allDishes, filters)
  }

  const getDishesByCategoryMethod = (category: keyof typeof DISH_CATEGORIES): Dish[] => {
    return getDishesByCategory(allDishes, category)
  }

  const getVegetarianDishesMethod = (): Dish[] => {
    return getVegetarianDishes(allDishes)
  }

  const getVeganDishesMethod = (): Dish[] => {
    return getVeganDishes(allDishes)
  }

  const getHalalDishesMethod = (): Dish[] => {
    return getHalalDishes(allDishes)
  }

  const getSpicyDishesMethod = (): Dish[] => {
    return getSpicyDishes(allDishes)
  }

  const getDishesByDifficultyMethod = (difficulty: "Easy" | "Medium" | "Hard"): Dish[] => {
    return getDishesByDifficulty(allDishes, difficulty)
  }

  const getDishesByTagsMethod = (tags: string[]): Dish[] => {
    return getDishesByTags(allDishes, tags)
  }

  const getRandomDishesMethod = (count = 3): Dish[] => {
    return getRandomDishes(allDishes, count)
  }

  const groupDishesByRegionMethod = (): Record<string, Dish[]> => {
    return groupDishesByRegion(allDishes)
  }

  const groupDishesByCategoryMethod = (): Record<string, Dish[]> => {
    return groupDishesByCategory(allDishes)
  }

  const getDishStatsMethod = () => {
    return getDishStats(allDishes)
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
    return searchDishesUtil(allDishes, query)
  }

  const searchDishesByRegion = (query: string, regionId: string): Dish[] => {
    const regionDishes = getDishesByRegion(regionId)
    return searchDishesUtil(regionDishes, query)
  }

  const getPopularDishes = (): Dish[] => {
    return getPopularDishesUtil(allDishes, 6)
  }

  const contextValue: FoodDataContextType = {
    // Dishes
    dishes: dishesData,
    getDish,
    getAllDishes,
    getDishesByChapter,
    getDishesByRegion,

    // Advanced filtering
    filterDishes: filterDishesMethod,
    getDishesByCategory: getDishesByCategoryMethod,
    getVegetarianDishes: getVegetarianDishesMethod,
    getVeganDishes: getVeganDishesMethod,
    getHalalDishes: getHalalDishesMethod,
    getSpicyDishes: getSpicyDishesMethod,
    getDishesByDifficulty: getDishesByDifficultyMethod,
    getDishesByTags: getDishesByTagsMethod,
    getRandomDishes: getRandomDishesMethod,

    // Grouping and stats
    groupDishesByRegion: groupDishesByRegionMethod,
    groupDishesByCategory: groupDishesByCategoryMethod,
    getDishStats: getDishStatsMethod,

    // Chapters
    chapters: chaptersData,
    getChapter,
    getAllChapters,
    getChaptersByRegion,

    // Regions
    regions: regionsData,
    getRegion,
    getAllRegions,

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
