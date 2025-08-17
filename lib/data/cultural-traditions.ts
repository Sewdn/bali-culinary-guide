export interface CulturalTradition {
  id: string
  name: string
  translation: string
  region: string
  occasion: string
  description: string
  background: string
  significance: string
  typicalDishes: string[]
  image: string
  glossary: Record<string, string>
}

export const culturalTraditionsData: Record<string, CulturalTradition> = {
  megibung: {
    id: "megibung",
    name: "Megibung",
    translation: "van gibung = 'samen delen' → letterlijk: 'samen eten uit één schaal'",
    region: "Bali – Karangasem (Oost-Bali)",
    occasion: "Ceremoniële feesten, huwelijken, tempelvieringen",
    description:
      "Een grote schaal rijst wordt in het midden geplaatst, omringd door verschillende gerechten (vlees, groenten, sambals). Iedereen zit in een kring (sekaha) en deelt van dezelfde schalen, vaak met de hand etend.",
    background:
      "Oorspronkelijk ontwikkeld tijdens de tijd van het Karangasem-koninkrijk (17e eeuw), waar krijgers en soldaten na veldslagen samen aten. Tegenwoordig wordt het gebruikt bij ceremoniële feesten en ook aangeboden als een culturele ervaring voor bezoekers in Karangasem.",
    significance:
      "Symboliseert gelijkheid, saamhorigheid en solidariteit, omdat iedereen hetzelfde eet van dezelfde schotel. Het versterkt de gemeenschapsbanden en toont respect voor traditie.",
    typicalDishes: [
      "Lawar (mixed salad)",
      "Urutan (Balinese sausage)",
      "Sate Lilit (wrapped satay)",
      "Ayam Betutu (spiced chicken)",
      "Jukut Ares (banana stem soup)",
      "Verschillende sambals",
      "Nasi (rijst als basis)",
    ],
    image: "/balinese-megibung-tradition.png",
    glossary: {
      Gibung: "Samen delen, gemeenschappelijk eten",
      Sekaha: "Kring of cirkel waarin mensen zitten tijdens Megibung",
      Karangasem: "Oostelijk regentschap van Bali, oorsprong van Megibung traditie",
      "Jukut Ares": "Traditionele soep gemaakt van bananenstam",
      Saamhorigheid: "Gevoel van verbondenheid en eenheid binnen de gemeenschap",
    },
  },
}
