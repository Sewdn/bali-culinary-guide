import { z } from "zod"

export const DishSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  subtitle: z.string(),
  region: z.enum(["bali", "lombok", "indonesia"], {
    errorMap: () => ({ message: "Region must be 'bali', 'lombok', or 'indonesia'" }),
  }),
  occasion: z.string(),
  description: z.string().min(1, "Description is required"),
  image: z
    .string()
    .min(1, "Image path is required")
    .refine(
      (val) => val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://"),
      "Image must be a valid URL or relative path starting with /",
    ),
  context: z.string(),
  chapter: z.string().min(1, "Chapter is required"),
  chapterTitle: z.string().min(1, "Chapter title is required"),
  category: z.enum(
    [
      "ceremonial-festive",
      "street-food",
      "rice-meals",
      "satay-grilled",
      "soup-stew",
      "vegetables",
      "seafood-meat",
      "desserts",
      "cultural-traditions",
    ],
    {
      errorMap: () => ({ message: "Invalid category" }),
    },
  ),
  spiceLevel: z.enum(["mild", "medium", "hot", "very-hot"]).optional(),
  dietaryInfo: z
    .array(z.enum(["vegetarian", "vegan", "halal", "contains-pork", "contains-beef", "gluten-free"]))
    .default([]),
  cookingTime: z.string().optional(),
  servingSize: z.string().optional(),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  preparation: z.string().min(1, "Preparation instructions are required"),
  culturalSignificance: z.string(),
  glossary: z
    .array(
      z.object({
        term: z.string().min(1, "Glossary term is required"),
        definition: z.string().min(1, "Glossary definition is required"),
      }),
    )
    .default([]),
  tags: z.array(z.string()).default([]),
  relatedDishes: z.array(z.string()).default([]),
})

export type Dish = z.infer<typeof DishSchema>

export function validateDish(dish: unknown): Dish {
  return DishSchema.parse(dish)
}

export function validateDishes(dishes: unknown[]): Dish[] {
  return dishes.map(validateDish)
}

export function isDishFromRegion(dish: Dish, region: Dish["region"]): boolean {
  return dish.region === region
}

export function isDishFromCategory(dish: Dish, category: Dish["category"]): boolean {
  return dish.category === category
}

export function isDishSpiceLevel(dish: Dish, spiceLevel: NonNullable<Dish["spiceLevel"]>): boolean {
  return dish.spiceLevel === spiceLevel
}
