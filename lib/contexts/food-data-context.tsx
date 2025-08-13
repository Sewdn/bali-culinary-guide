"use client"

import { createContext, useContext, type ReactNode } from "react"
import { dishesData, type Dish } from "@/lib/data/dishes"
import { chaptersData, type Chapter } from "@/lib/data/chapters"
import { glossaryTerms, type GlossaryTerm } from "@/lib/data/glossary"

interface FoodDataContextType {
  // Dishes
  dishes: Record<string, Dish>
  getDish: (id: string) => Dish | undefined
  getAllDishes: () => Dish[]
  getDishesByChapter: (chapterId: string) => Dish[]

  // Chapters
  chapters: Record<string, Chapter>
  getChapter: (id: string) => Chapter | undefined
  getAllChapters: () => Chapter[]

  // Glossary
  glossary: GlossaryTerm[]
  getGlossaryTerm: (term: string) => GlossaryTerm | undefined
  getGlossaryByCategory: (category: string) => GlossaryTerm[]
  searchGlossary: (query: string) => GlossaryTerm[]

  // Search functionality
  searchDishes: (query: string) => Dish[]
  getPopularDishes: () => Dish[]
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

  // Chapter methods
  const getChapter = (id: string): Chapter | undefined => {
    return chaptersData[id]
  }

  const getAllChapters = (): Chapter[] => {
    return Object.values(chaptersData)
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

    // Chapters
    chapters: chaptersData,
    getChapter,
    getAllChapters,

    // Glossary
    glossary: glossaryTerms,
    getGlossaryTerm,
    getGlossaryByCategory,
    searchGlossary,

    // Search
    searchDishes,
    getPopularDishes,
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
