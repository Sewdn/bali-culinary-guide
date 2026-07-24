export interface Region {
  id: string
  name: string
  description: string
  flag: string
  chapters: string[]
}

export const regionsData: Record<string, Region> = {
  bali: {
    id: "bali",
    name: "Bali",
    description:
      "The Island of the Gods - Known for its complex spice pastes (Base Genep), ceremonial dishes, and Hindu-influenced culinary traditions",
    flag: "🏝️",
    chapters: [
      "ceremonial-bali",
      "street-food-bali",
      "vegetables-bali",
      "fish-bali",
      "desserts-bali",
      "cultural-traditions-bali",
    ],
  },
  lombok: {
    id: "lombok",
    name: "Lombok",
    description:
      "The Spice Island - Home to the Sasak people, featuring fiery sambals, fresh seafood, and bold chili-forward flavors",
    flag: "🌶️",
    chapters: ["ceremonial-lombok", "satay-lombok", "vegetables-lombok", "fish-lombok"],
  },
  indonesia: {
    id: "indonesia",
    name: "Indonesia",
    description:
      "Broader Indonesian specialties - Rice dishes, bakso varieties, and regional favorites from across the archipelago",
    flag: "🇮🇩",
    chapters: ["rice-meals", "bakso", "vegetables-indonesia"],
  },
}
