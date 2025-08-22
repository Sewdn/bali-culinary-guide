import type { Dish, DISH_CATEGORIES, REGIONS } from "../schemas/dish-schema"

export interface DishFilters {
  region?: keyof typeof REGIONS
  category?: keyof typeof DISH_CATEGORIES
  isVegetarian?: boolean
  isVegan?: boolean
  isHalal?: boolean
  isSpicy?: boolean
  difficulty?: "Easy" | "Medium" | "Hard"
  tags?: string[]
  searchQuery?: string
}

export const filterDishes = (dishes: Dish[], filters: DishFilters): Dish[] => {
  return dishes.filter((dish) => {
    // Region filter
    if (filters.region && dish.region !== filters.region) {
      return false
    }

    // Category filter
    if (filters.category && dish.category !== filters.category) {
      return false
    }

    // Dietary filters
    if (filters.isVegetarian && !dish.dietaryInfo?.isVegetarian) {
      return false
    }

    if (filters.isVegan && !dish.dietaryInfo?.isVegan) {
      return false
    }

    if (filters.isHalal && !dish.dietaryInfo?.isHalal) {
      return false
    }

    if (filters.isSpicy && !dish.dietaryInfo?.isSpicy) {
      return false
    }

    // Difficulty filter
    if (filters.difficulty && dish.difficulty !== filters.difficulty) {
      return false
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) =>
        dish.tags?.some((dishTag) => dishTag.toLowerCase().includes(tag.toLowerCase())),
      )
      if (!hasAllTags) {
        return false
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = [
        dish.name,
        dish.subtitle,
        dish.description,
        dish.context,
        ...dish.ingredients,
        ...dish.tags,
      ]
        .join(" ")
        .toLowerCase()

      if (!searchableText.includes(query)) {
        return false
      }
    }

    return true
  })
}

export const getDishesByRegion = (dishes: Dish[], region: keyof typeof REGIONS): Dish[] => {
  return filterDishes(dishes, { region })
}

export const getDishesByCategory = (dishes: Dish[], category: keyof typeof DISH_CATEGORIES): Dish[] => {
  return filterDishes(dishes, { category })
}

export const getDishesByChapter = (dishes: Dish[], chapter: string): Dish[] => {
  return dishes.filter((dish) => dish.chapter === chapter)
}

export const getVegetarianDishes = (dishes: Dish[]): Dish[] => {
  return filterDishes(dishes, { isVegetarian: true })
}

export const getVeganDishes = (dishes: Dish[]): Dish[] => {
  return filterDishes(dishes, { isVegan: true })
}

export const getHalalDishes = (dishes: Dish[]): Dish[] => {
  return filterDishes(dishes, { isHalal: true })
}

export const getSpicyDishes = (dishes: Dish[]): Dish[] => {
  return filterDishes(dishes, { isSpicy: true })
}

export const getDishesByDifficulty = (dishes: Dish[], difficulty: "Easy" | "Medium" | "Hard"): Dish[] => {
  return filterDishes(dishes, { difficulty })
}

export const searchDishes = (dishes: Dish[], query: string): Dish[] => {
  return filterDishes(dishes, { searchQuery: query })
}

export const getDishesByTags = (dishes: Dish[], tags: string[]): Dish[] => {
  return filterDishes(dishes, { tags })
}

export const getPopularDishes = (dishes: Dish[], limit = 6): Dish[] => {
  // Return dishes with common tags like "traditional", "popular", "ceremonial"
  const popularTags = ["traditional", "popular", "ceremonial", "street-food"]
  const popularDishes = dishes.filter((dish) => dish.tags?.some((tag) => popularTags.includes(tag.toLowerCase())))

  return popularDishes.slice(0, limit)
}

export const getRandomDishes = (dishes: Dish[], count = 3): Dish[] => {
  const shuffled = [...dishes].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const groupDishesByRegion = (dishes: Dish[]): Record<string, Dish[]> => {
  return dishes.reduce(
    (groups, dish) => {
      const region = dish.region
      if (!groups[region]) {
        groups[region] = []
      }
      groups[region].push(dish)
      return groups
    },
    {} as Record<string, Dish[]>,
  )
}

export const groupDishesByCategory = (dishes: Dish[]): Record<string, Dish[]> => {
  return dishes.reduce(
    (groups, dish) => {
      const category = dish.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(dish)
      return groups
    },
    {} as Record<string, Dish[]>,
  )
}

export const getDishStats = (dishes: Dish[]) => {
  const stats = {
    total: dishes.length,
    byRegion: groupDishesByRegion(dishes),
    byCategory: groupDishesByCategory(dishes),
    vegetarian: getVegetarianDishes(dishes).length,
    vegan: getVeganDishes(dishes).length,
    halal: getHalalDishes(dishes).length,
    spicy: getSpicyDishes(dishes).length,
    byDifficulty: {
      Easy: getDishesByDifficulty(dishes, "Easy").length,
      Medium: getDishesByDifficulty(dishes, "Medium").length,
      Hard: getDishesByDifficulty(dishes, "Hard").length,
    },
  }

  return stats
}
