export interface GlossaryTerm {
  term: string
  definition: string
  category: string
  relatedDishes: string[]
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Ayam",
    definition: "Kip",
    category: "Ingredients",
    relatedDishes: ["Ayam Betutu", "Ayam Taliwang", "Soto Ayam Lamongan"],
  },
  {
    term: "Babi Guling",
    definition: "Geroosterd speenvarken",
    category: "Dishes",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Balado",
    definition: "Pittige saus op basis van chili en tomaat",
    category: "Sauces",
    relatedDishes: ["Terong Balado"],
  },
  {
    term: "Base Genep",
    definition:
      "Volledige Balinese kruidenpasta die de basis vormt voor veel traditionele gerechten. Bevat knoflook, sjalot, gember, laos, kencur, kunyit, sereh, daun jeruk, kemiri, terasi, koriander, tamarind, palmsuiker, zout, peper, kruidnagel, nootmuskaat en olie.",
    category: "Spice Pastes",
    relatedDishes: ["Babi Guling", "Ayam Betutu", "Bebek Betutu"],
  },
  {
    term: "Betutu",
    definition: "Traditionele Balinese bereidingswijze waarbij vlees langzaam wordt gegaard in kruiden",
    category: "Cooking Methods",
    relatedDishes: ["Ayam Betutu", "Bebek Betutu"],
  },
  {
    term: "Blancheren",
    definition: "Kort koken in kokend water om groenten gaar maar knapperig te houden",
    category: "Cooking Methods",
    relatedDishes: ["Gado-Gado", "Tipat Kantok"],
  },
  {
    term: "Bumbu",
    definition: "Kruidenmix of seasoning in Indonesisch",
    category: "Spice Pastes",
    relatedDishes: [],
  },
  {
    term: "Campur",
    definition: "Gemengd - verwijst naar de variëteit aan bijgerechten",
    category: "Terms",
    relatedDishes: ["Nasi Campur"],
  },
  {
    term: "Daun Jeruk",
    definition: "Kaffir limoenblad - aromatisch blad dat citrusaroma toevoegt",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Pepes Ikan"],
  },
  {
    term: "Gado-Gado",
    definition: "Letterlijk 'mix-mix' - verwijst naar de variëteit aan ingrediënten in deze groentesalade",
    category: "Dishes",
    relatedDishes: ["Gado-Gado"],
  },
  {
    term: "Ikan",
    definition: "Vis",
    category: "Ingredients",
    relatedDishes: ["Pepes Ikan", "Ikan Nyat-Nyat", "Bakso Ikan"],
  },
  {
    term: "Isi",
    definition: "Vulling van kruiden en groenten die soms in vlees wordt gestopt",
    category: "Terms",
    relatedDishes: ["Ayam Betutu"],
  },
  {
    term: "Jukut",
    definition: "Soep of curry (Balinees)",
    category: "Dishes",
    relatedDishes: ["Jukut Terong"],
  },
  {
    term: "Kemiri",
    definition: "Candlenuts - noten die gebruikt worden om sauzen te verdikken en een romige textuur te geven",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Kencur",
    definition: "Lesser galangal - mildere variant van laos met een meer aardse smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Kerupuk",
    definition: "Kroepoek - knapperige crackers gemaakt van tapioca of rijst",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur"],
  },
  {
    term: "Ketupat",
    definition: "Geperste rijstcake gekookt in geweven palmtak-omhulsel",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok"],
  },
  {
    term: "Kunyit",
    definition: "Kurkuma - geeft de karakteristieke gele kleur en aardse smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Laklak",
    definition: "Balinese rijstpannenkoekjes",
    category: "Dishes",
    relatedDishes: ["Laklak"],
  },
  {
    term: "Laos",
    definition: "Greater galangal - een wortel uit de gemberfamilie met een scherpe, citrusachtige smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Lawar",
    definition: "Balinees gehaktgerecht met kokos en specerijen",
    category: "Dishes",
    relatedDishes: ["Lawar"],
  },
  {
    term: "Lilit",
    definition: "Wikkelen - verwijst naar de manier waarop het vlees rond de stok wordt gewikkeld",
    category: "Cooking Methods",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Long beans",
    definition: "Kousenband - lange groene bonen populair in Aziatische keuken",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok"],
  },
  {
    term: "Matah",
    definition: "Rauwe (sambal), met citruselementen zoals sereh en daun jeruk",
    category: "Sauces",
    relatedDishes: ["Sambal Matah"],
  },
  {
    term: "Nasi",
    definition: "Rijst - het basisvoedsel van Indonesië",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur", "Nasi Bungkus", "Nasi Kotak", "Nasi Jinggo"],
  },
  {
    term: "Pepes",
    definition: "Bereiding in bananenblad waarbij ingrediënten worden gestoomd of gegrild",
    category: "Cooking Methods",
    relatedDishes: ["Pepes Ikan"],
  },
  {
    term: "Penyet",
    definition: "Pletten (bijvoorbeeld terong penyet)",
    category: "Cooking Methods",
    relatedDishes: ["Terong Penyet"],
  },
  {
    term: "Pindasaus",
    definition: "Rijke saus op basis van pinda's, de signature saus van Gado-Gado",
    category: "Sauces",
    relatedDishes: ["Gado-Gado", "Tipat Kantok"],
  },
  {
    term: "Rujak",
    definition: "Fruit met pittige of zure saus",
    category: "Dishes",
    relatedDishes: ["Rujak Kuah Pindang"],
  },
  {
    term: "Sambal",
    definition: "Chili saus of pasta throughout Indonesië",
    category: "Sauces",
    relatedDishes: ["Sambal Terong", "Sambal Matah"],
  },
  {
    term: "Sambal Matah",
    definition: "Rauw Balinese sambal met shallot, sereh, daun jeruk, olie, limoen",
    category: "Sauces",
    relatedDishes: ["Sambal Matah"],
  },
  {
    term: "Sambal Terasi",
    definition: "Sambal met garnalenpasta",
    category: "Sauces",
    relatedDishes: [],
  },
  {
    term: "Sate Lilit",
    definition: "Gehakt saté gewikkeld om stick (sereh)",
    category: "Dishes",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Saté",
    definition: "Traditioneel gegrild vlees aan stokjes",
    category: "Dishes",
    relatedDishes: ["Sate Lilit"],
  },
  {
    term: "Sereh",
    definition: "Citroengras - geeft een frisse, citrusachtige smaak",
    category: "Ingredients",
    relatedDishes: ["Babi Guling", "Sate Lilit"],
  },
  {
    term: "Soto",
    definition: "Soep (zoals Soto Ayam)",
    category: "Dishes",
    relatedDishes: ["Soto Ayam Lamongan"],
  },
  {
    term: "Taliwang",
    definition: "Lombok gegrilde kipstijl",
    category: "Cooking Methods",
    relatedDishes: ["Ayam Taliwang"],
  },
  {
    term: "Taugé",
    definition: "Sojascheuten - knapperige groente die textuur toevoegt",
    category: "Ingredients",
    relatedDishes: ["Tipat Kantok", "Gado-Gado"],
  },
  {
    term: "Tempeh",
    definition: "Gefermenteerde sojabonen - traditionele Indonesische eiwitbron",
    category: "Ingredients",
    relatedDishes: ["Nasi Campur", "Gado-Gado"],
  },
  {
    term: "Terasi",
    definition: "Garnalenpasta - gefermenteerde garnalen die umami toevoegen",
    category: "Ingredients",
    relatedDishes: ["Babi Guling"],
  },
  {
    term: "Terong",
    definition: "Aubergine",
    category: "Ingredients",
    relatedDishes: ["Terong Balado", "Terong Santan", "Terong Penyet", "Jukut Terong", "Sambal Terong"],
  },
  {
    term: "Urap",
    definition: "Groentesalade met kokos (vergelijkbaar met lawar)",
    category: "Dishes",
    relatedDishes: [],
  },
  {
    term: "Warung",
    definition: "Eetkraam of lokaal eetzaakje",
    category: "Terms",
    relatedDishes: [],
  },
]
