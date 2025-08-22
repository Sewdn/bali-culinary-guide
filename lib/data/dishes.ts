import { validateDishes, type Dish } from "../schemas/dish-schema"
import dishesJson from "./dishes.json"

export const dishesData: Record<string, Dish> = (() => {
  const validatedDishes = validateDishes(dishesJson)
  const dishesMap: Record<string, Dish> = {}

  validatedDishes.forEach((dish) => {
    dishesMap[dish.id] = dish
  })

  return dishesMap
})()

export type { Dish } from "../schemas/dish-schema"
