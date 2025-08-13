export interface Dish {
  id: string
  name: string
  subtitle: string
  region: string
  occasion: string
  description: string
  image: string
  context: string
  chapter: string
  chapterTitle: string
  ingredients: string[]
  preparation: string
  culturalSignificance: string
  glossary: Array<{
    term: string
    definition: string
  }>
}

export const dishesData: Record<string, Dish> = {
  "babi-guling": {
    id: "babi-guling",
    name: "Babi Guling",
    subtitle: "Spit-roasted Suckling Pig",
    region: "Bali – Gianyar",
    occasion: "Ceremonies, bruiloften, speciale gelegenheden",
    description: "Heel speenvarken gevuld met Base Genep en langzaam geroosterd voor krokant vel en sappig vlees.",
    image: "/balinese-babi-guling.png",
    context: "Een symbool van gemeenschap en overvloed; traditioneel geserveerd tijdens tempelrituelen.",
    chapter: "ceremonial",
    chapterTitle: "Ceremoniële & Feestgerechten",
    ingredients: [
      "Heel speenvarken",
      "Base Genep (complete Balinese kruidenpasta):",
      "- Knoflook",
      "- Sjalot",
      "- Gember",
      "- Laos (greater galangal)",
      "- Kencur (lesser galangal)",
      "- Kunyit (kurkuma)",
      "- Sereh (citroengras)",
      "- Daun jeruk (kaffir limoenbladeren)",
      "- Kemiri (candlenuts)",
      "- Terasi (garnalenpasta)",
      "- Koriander",
      "- Tamarind",
      "- Palmkristalsuiker",
      "- Zout en peper",
      "- Kruidnagel",
      "- Nootmuskaat",
      "- Olie",
      "- Optioneel: salam blad",
    ],
    preparation:
      "Het speenvarken wordt gevuld met de Base Genep kruidenpasta en langzaam geroosterd aan het spit tot het vel krokant is en het vlees perfect gaar.",
    culturalSignificance:
      "Babi Guling is meer dan alleen een gerecht - het is een symbool van gemeenschap, overvloed en spiritualiteit in de Balinese cultuur. Traditioneel wordt het geserveerd tijdens belangrijke tempelrituelen en ceremonies.",
    glossary: [
      {
        term: "Base Genep",
        definition: "Volledige Balinese kruidenpasta die de basis vormt voor veel traditionele gerechten",
      },
      {
        term: "Laos",
        definition: "Greater galangal - een wortel uit de gemberfamilie met een scherpe, citrusachtige smaak",
      },
      { term: "Kencur", definition: "Lesser galangal - mildere variant van laos met een meer aardse smaak" },
      { term: "Kunyit", definition: "Kurkuma - geeft de karakteristieke gele kleur en aardse smaak" },
      {
        term: "Kemiri",
        definition: "Candlenuts - noten die gebruikt worden om sauzen te verdikken en een romige textuur te geven",
      },
      { term: "Terasi", definition: "Garnalenpasta - gefermenteerde garnalen die umami toevoegen" },
    ],
  },
  "ayam-betutu": {
    id: "ayam-betutu",
    name: "Ayam Betutu",
    subtitle: "Spiced Steamed Chicken",
    region: "Bali",
    occasion: "Ceremonies, feestmaaltijden",
    description: "Hele kip in Base Genep, soms gevuld (isi), langzaam gegaard.",
    image: "/balinese-ayam-betutu.png",
    context: "Langzaam gegaard in bananenblad; staat voor geduld en zorg.",
    chapter: "ceremonial",
    chapterTitle: "Ceremoniële & Feestgerechten",
    ingredients: [
      "Hele kip",
      "Base Genep (zie Babi Guling voor volledige lijst)",
      "Bananenblad voor inpakken",
      "Optioneel: vulling (isi) van kruiden en groenten",
    ],
    preparation:
      "De kip wordt ingesmeerd met Base Genep, soms gevuld met kruidenmengsel, ingewikkeld in bananenblad en urenlang langzaam gegaard.",
    culturalSignificance:
      "Ayam Betutu vertegenwoordigt geduld en zorgvuldigheid in de Balinese keuken. Het langzame gaarproces in bananenblad geeft de kip een unieke smaak en textuur.",
    glossary: [
      {
        term: "Betutu",
        definition: "Traditionele Balinese bereidingswijze waarbij vlees langzaam wordt gegaard in kruiden",
      },
      { term: "Isi", definition: "Vulling van kruiden en groenten die soms in de kip wordt gestopt" },
      {
        term: "Bananenblad",
        definition: "Natuurlijke verpakking die aroma toevoegt en vocht vasthoudt tijdens het garen",
      },
    ],
  },
  "bebek-betutu": {
    id: "bebek-betutu",
    name: "Bebek Betutu",
    subtitle: "Spiced Steamed Duck",
    region: "Bali",
    occasion: "Ceremonies, speciale gelegenheden",
    description: "Hele eend in Base Genep kruiden, langzaam gegaard in bananenblad.",
    image: "/balinese-bebek-betutu.png",
    context: "Luxere variant van betutu; eend heeft rijkere smaak dan kip.",
    chapter: "ceremonial",
    chapterTitle: "Ceremoniële & Feestgerechten",
    ingredients: [
      "Hele eend",
      "Base Genep (complete Balinese kruidenpasta):",
      "- Knoflook",
      "- Sjalot",
      "- Gember",
      "- Laos (greater galangal)",
      "- Kencur (lesser galangal)",
      "- Kunyit (kurkuma)",
      "- Sereh (citroengras)",
      "- Daun jeruk (kaffir limoenbladeren)",
      "- Kemiri (candlenuts)",
      "- Terasi (garnalenpasta)",
      "- Koriander",
      "- Tamarind",
      "- Palmkristalsuiker",
      "- Zout en peper",
      "- Kruidnagel",
      "- Nootmuskaat",
      "- Bananenblad voor inpakken",
    ],
    preparation:
      "De eend wordt grondig ingesmeerd met Base Genep kruiden, stevig ingewikkeld in bananenblad en 6-8 uur langzaam gegaard tot het vlees van het bot valt.",
    culturalSignificance:
      "Bebek Betutu wordt beschouwd als de luxere variant van betutu. De eend heeft een rijkere, intensere smaak dan kip en wordt vaak geserveerd bij zeer speciale gelegenheden en belangrijke ceremonies.",
    glossary: [
      {
        term: "Bebek",
        definition: "Eend - heeft een rijkere, intensere smaak dan kip en meer vet",
      },
      {
        term: "Betutu",
        definition: "Traditionele Balinese bereidingswijze waarbij vlees langzaam wordt gegaard in kruiden",
      },
      {
        term: "Base Genep",
        definition: "Volledige Balinese kruidenpasta die de basis vormt voor veel traditionele gerechten",
      },
      {
        term: "Bananenblad",
        definition: "Natuurlijke verpakking die aroma toevoegt en vocht vasthoudt tijdens het lange gaarproces",
      },
    ],
  },
  "terong-balado": {
    id: "terong-balado",
    name: "Terong Balado",
    subtitle: "Eggplant in Spicy Sauce",
    region: "Sumatra",
    occasion: "Lunch/diner",
    description: "Gefrituurde aubergine met balado-sambal (tomaat & chili).",
    image: "/indonesian-terong-balado.png",
    context: "Popular Sumatran dish featuring the signature balado sauce with tomatoes and chilies.",
    chapter: "vegetables",
    chapterTitle: "Aubergine & Groentegerechten",
    ingredients: [
      "Aubergines (terong)",
      "Balado sauce:",
      "- Rode chilies",
      "- Tomaten",
      "- Sjalot",
      "- Knoflook",
      "- Palmsuiker",
      "- Zout",
      "- Olie voor frituren",
      "- Tamarind water",
    ],
    preparation:
      "Aubergines worden in plakken gesneden en gefrituurd tot goudbruin. De balado-saus wordt gemaakt door chilies, tomaten en kruiden te bakken tot een dikke, pittige saus. De gefrituurde aubergine wordt door de saus gemengd.",
    culturalSignificance:
      "Terong Balado is een klassiek Sumatraans gerecht dat de kenmerkende balado-saus toont - een pittige tomatensaus die door heel Indonesië populair is geworden.",
    glossary: [
      { term: "Terong", definition: "Aubergine - populaire groente in de Indonesische keuken" },
      { term: "Balado", definition: "Pittige saus op basis van chili en tomaat, oorspronkelijk uit Sumatra" },
      { term: "Sambal", definition: "Algemene term voor chili-gebaseerde sauzen in Indonesië" },
    ],
  },
  "terong-santan": {
    id: "terong-santan",
    name: "Terong Santan",
    subtitle: "Eggplant in Coconut Sauce",
    region: "Bali",
    occasion: "Lunch/diner",
    description: "Aubergine in romige kokos saus met Base Genep-kruiden.",
    image: "/balinese-terong-santan.png",
    context: "Creamy Balinese eggplant curry showcasing the island's love for coconut milk.",
    chapter: "vegetables",
    chapterTitle: "Aubergine & Groentegerechten",
    ingredients: [
      "Aubergines",
      "Kokosmelk (santan)",
      "Base Genep kruiden:",
      "- Knoflook",
      "- Sjalot",
      "- Gember",
      "- Kunyit",
      "- Kemiri",
      "- Sereh",
      "- Daun jeruk",
      "- Chili",
      "- Zout",
      "- Palmsuiker",
    ],
    preparation:
      "Aubergines worden gesneden en licht gebakken. Base Genep wordt gebakken tot geurig, kokosmelk wordt toegevoegd en de aubergine wordt zachtjes gestooft tot romig en gaar.",
    culturalSignificance:
      "Dit gerecht toont de Balinese voorliefde voor kokosmelk en de complexe smaaklagen van Base Genep kruiden, wat resulteert in een troostend en aromatisch gerecht.",
    glossary: [
      { term: "Santan", definition: "Kokosmelk - essentieel ingrediënt in veel Indonesische curry's" },
      { term: "Base Genep", definition: "Complete Balinese kruidenpasta" },
      { term: "Kemiri", definition: "Candlenuts - gebruikt om sauzen te verdikken" },
    ],
  },
  "tipat-kantok": {
    id: "tipat-kantok",
    name: "Tipat Kantok",
    subtitle: "Rice Cake Salad with Peanut Sauce",
    region: "Bali – Ubud",
    occasion: "Lunch, streetfood",
    description: "Ketupat met blanchée groenten, pindasaus en gebakken sjalot.",
    image: "/balinese-tipat-kantok.png",
    context: "Popular street food combining textures and flavors.",
    chapter: "street-food",
    chapterTitle: "Balinese Market & Street Food",
    ingredients: [
      "Ketupat (geperste rijstcake)",
      "Long beans (kousenband)",
      "Taugé (sojascheuten)",
      "Pindapuree",
      "Palmsuiker",
      "Chilipoeder",
      "Zout",
      "Gefrituurde sjalot",
    ],
    preparation:
      "Ketupat wordt in blokjes gesneden, groenten worden geblancheerd, en alles wordt geserveerd met een rijke pindasaus en krokante gefrituurde sjalot.",
    culturalSignificance:
      "Tipat Kantok is een perfecte balans van texturen en smaken die de essentie van Balinese straatvoedsel weergeeft - eenvoudig maar vol smaak.",
    glossary: [
      { term: "Ketupat", definition: "Geperste rijstcake gekookt in geweven palmtak-omhulsel" },
      { term: "Taugé", definition: "Sojascheuten - knapperige groente die textuur toevoegt" },
      { term: "Long beans", definition: "Kousenband - lange groene bonen populair in Aziatische keuken" },
    ],
  },
  "nasi-campur": {
    id: "nasi-campur",
    name: "Nasi Campur",
    subtitle: "Mixed Rice Plate",
    region: "Indonesië breed (ook Bali stijl)",
    occasion: "Lunch/diner",
    description: "Rijst met gevarieerde bijgerechten: vlees, vis, tempeh, saté, sambal, groenten.",
    image: "/indonesian-nasi-campur.png",
    context: "The ultimate Indonesian mixed plate experience.",
    chapter: "rice-meals",
    chapterTitle: "Rice & Meal Boxes",
    ingredients: [
      "Witte rijst als basis",
      "Variabele bijgerechten:",
      "- Vlees (kip, rund, of varken)",
      "- Vis (gegrild of gefrituurd)",
      "- Tempeh en/of tofu",
      "- Saté",
      "- Sambal (verschillende soorten)",
      "- Groenten (gado-gado stijl)",
      "- Ei (gekookt of gebakken)",
      "- Kerupuk (kroepoek)",
    ],
    preparation:
      "Rijst wordt geserveerd met een selectie van verschillende bijgerechten, waarbij elke warung zijn eigen specialiteiten heeft.",
    culturalSignificance:
      "Nasi Campur is de ultieme expressie van Indonesische eetcultuur - diversiteit, balans en de mogelijkheid om verschillende smaken te combineren in één maaltijd.",
    glossary: [
      { term: "Nasi", definition: "Rijst - het basisvoedsel van Indonesië" },
      { term: "Campur", definition: "Gemengd - verwijst naar de variëteit aan bijgerechten" },
      { term: "Tempeh", definition: "Gefermenteerde sojabonen - traditionele Indonesische eiwitbron" },
      { term: "Kerupuk", definition: "Kroepoek - knapperige crackers gemaakt van tapioca of rijst" },
    ],
  },
  "sate-lilit": {
    id: "sate-lilit",
    name: "Sate Lilit",
    subtitle: "Wrapped Satay",
    region: "Bali",
    occasion: "Lunch/diner/snack",
    description: "Gehakt met kokos en kruiden, gewikkeld rond citroengras/bamboestok, gegrild.",
    image: "/balinese-sate-lilit.png",
    context: "Unique Balinese twist on traditional satay.",
    chapter: "satay-pepes",
    chapterTitle: "Satay & Pepes",
    ingredients: [
      "Gehakt (kip, vis of varken)",
      "Kokosrasp",
      "Knoflook",
      "Sjalot",
      "Sereh (citroengras)",
      "Kemiri (candlenuts)",
      "Kunyit (kurkuma)",
      "Sambal",
      "Palmsuiker",
      "Zout en peper",
      "Tamarind",
      "Citroengras of bamboestokken",
    ],
    preparation:
      "Het gehakt wordt gemengd met kokos en kruiden, rond citroengras of bamboestokken gewikkeld en gegrild tot goudbruin.",
    culturalSignificance:
      "Sate Lilit is uniek Balinees - in tegenstelling tot traditionele saté wordt het vlees niet geregen maar gewikkeld, wat een andere textuur en smaakervaring geeft.",
    glossary: [
      { term: "Lilit", definition: "Wikkelen - verwijst naar de manier waarop het vlees rond de stok wordt gewikkeld" },
      { term: "Sereh", definition: "Citroengras - geeft een frisse, citrusachtige smaak" },
      { term: "Saté", definition: "Traditioneel gegrild vlees aan stokjes" },
    ],
  },
  "gado-gado": {
    id: "gado-gado",
    name: "Gado-Gado",
    subtitle: "Mixed Vegetable Salad with Peanut Sauce",
    region: "Indonesië breed",
    occasion: "Lunch/diner",
    description: "Gekookte groenten met tofu/tempeh en pindasaus.",
    image: "/indonesian-gado-gado.png",
    context: "Indonesia's most famous vegetable salad.",
    chapter: "vegetables",
    chapterTitle: "Aubergine & Groentegerechten",
    ingredients: [
      "Gekookte groenten:",
      "- Kool",
      "- Sperziebonen",
      "- Taugé",
      "- Wortel",
      "- Komkommer",
      "Tofu en tempeh",
      "Gekookt ei",
      "Pindasaus:",
      "- Pinda's",
      "- Chili",
      "- Knoflook",
      "- Palmsuiker",
      "- Tamarind",
      "- Zout",
    ],
    preparation:
      "Groenten worden geblancheerd, tofu en tempeh gebakken, en alles wordt geserveerd met een rijke, pittige pindasaus.",
    culturalSignificance:
      "Gado-Gado betekent letterlijk 'mix-mix' en vertegenwoordigt de diversiteit van Indonesië - verschillende ingrediënten die samen een harmonieus geheel vormen.",
    glossary: [
      { term: "Gado-Gado", definition: "Letterlijk 'mix-mix' - verwijst naar de variëteit aan ingrediënten" },
      { term: "Pindasaus", definition: "Rijke saus op basis van pinda's, de signature saus van dit gerecht" },
      { term: "Blancheren", definition: "Kort koken in kokend water om groenten gaar maar knapperig te houden" },
    ],
  },
}
