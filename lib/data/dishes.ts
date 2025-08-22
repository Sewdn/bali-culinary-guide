import { validateDishes, type Dish } from "../schemas/dish-schema"
import dishesJson from "./dishes.json"

export const dishesData: Record<string, Dish> = (() => {
  const validatedDishes = validateDishes(dishesJson.dishes)
  const dishMap: Record<string, Dish> = {}

  validatedDishes.forEach((dish) => {
    dishMap[dish.id] = dish
  })

  return dishMap
})()

export type { Dish } from "../schemas/dish-schema"
