import { z } from "zod"

export const DishSchema = z.object({
  id: z.string().min(1, "Dish ID is required"),
  name: z.string().min(1, "Dish name is required"),
  subtitle: z.string().min(1, "Dish subtitle is required"),
  region: z.enum(["Bali", "Lombok", "Indonesia"], {
    errorMap: () => ({ message: "Region must be Bali, Lombok, or Indonesia" }),
  }),
  occasion: z.string().min(1, "Occasion is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  context: z.string().min(1, "Context is required"),
  chapter: z.string().min(1, "Chapter is required"),
  chapterTitle: z.string().min(1, "Chapter title is required"),
  ingredients: z.array(z.string().min(1)).min(1, "At least one ingredient is required"),
  preparation: z.string().min(1, "Preparation method is required"),
  culturalSignificance: z.string().min(1, "Cultural significance is required"),
  glossary: z
    .array(
      z.object({
        term: z.string().min(1, "Glossary term is required"),
        definition: z.string().min(1, "Glossary definition is required"),
      }),
    )
    .default([]),
  category: z.enum(
    [
      "ceremonial-festive",
      "street-food",
      "rice-meals",
      "satay-grilled",
      "soups-broths",
      "vegetables",
      "seafood-meat",
      "desserts",
      "cultural-traditions",
    ],
    {
      errorMap: () => ({ message: "Invalid category" }),
    },
  ),
  dietaryInfo: z
    .object({
      isVegetarian: z.boolean().default(false),
      isVegan: z.boolean().default(false),
      isHalal: z.boolean().default(true),
      containsNuts: z.boolean().default(false),
      isSpicy: z.boolean().default(false),
    })
    .default({}),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Medium"),
  cookingTime: z.string().optional(),
  servings: z.string().optional(),
  tags: z.array(z.string()).default([]),
})

export type Dish = z.infer<typeof DishSchema>

export const validateDish = (dish: unknown): Dish => {
  return DishSchema.parse(dish)
}

export const validateDishes = (dishes: unknown[]): Dish[] => {
  return dishes.map(validateDish)
}

export const DISH_CATEGORIES = {
  "ceremonial-festive": "Ceremonial & Festive Dishes",
  "street-food": "Street Food & Market Dishes",
  "rice-meals": "Rice & Meal Boxes",
  "satay-grilled": "Satay & Grilled Dishes",
  "soups-broths": "Soups & Broths",
  vegetables: "Vegetables & Salads",
  "seafood-meat": "Seafood & Meat Specialties",
  desserts: "Desserts & Sweets",
  "cultural-traditions": "Cultural Food Traditions",
} as const

export const REGIONS = {
  Bali: "Balinese Cuisine",
  Lombok: "Lombok Sasak Cuisine",
  Indonesia: "Indonesian Specialties",
} as const
