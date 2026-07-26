export interface Region {
  id: string
  name: string
  description: string
  flag: string
  chapters: string[]
}

export interface RegionTag {
  id: string
  name: string
  region: string
  description: string
  emoji: string
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
    chapters: ["ceremonial-lombok", "satay-lombok", "vegetables-lombok"],
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

// Region tags represent specific cities and areas within Bali where dishes are found
export const regionTagsData: Record<string, RegionTag> = {
  denpasar: {
    id: "denpasar",
    name: "Denpasar & South Bali",
    region: "bali",
    description:
      "Bali's bustling capital and southern hub - home to vibrant markets, late-night street food, and everyday warung classics.",
    emoji: "🏙️",
  },
  "ubud-gianyar": {
    id: "ubud-gianyar",
    name: "Ubud & Gianyar",
    region: "bali",
    description:
      "The cultural heart of Bali - famous for ceremonial cooking, babi guling, and dishes rooted in temple traditions.",
    emoji: "🌾",
  },
  karangasem: {
    id: "karangasem",
    name: "Karangasem (East Bali)",
    region: "bali",
    description:
      "The old kingdom of East Bali - birthplace of the megibung communal feast and deeply ceremonial cuisine.",
    emoji: "⛰️",
  },
  "north-bali": {
    id: "north-bali",
    name: "North Bali (Singaraja & Kintamani)",
    region: "bali",
    description:
      "Bali's northern coast and highlands - known for fresh lake fish, coconut-rich dishes, and market sweets.",
    emoji: "🌊",
  },
}
