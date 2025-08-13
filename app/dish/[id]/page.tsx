import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Users, ChefHat } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { DesktopNav } from "@/components/desktop-nav"

const dishesData = {
  "babi-guling": {
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
  "terong-balado": {
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

export default function DishPage({ params }: { params: { id: string } }) {
  const dish = dishesData[params.id as keyof typeof dishesData]

  if (!dish) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <Link href="/" className="font-serif font-bold text-xl text-rose-600">
                Bali Food Guide
              </Link>
            </div>
            <DesktopNav />
          </div>
        </div>
      </nav>

      {/* Dish Hero */}
      <section className="relative">
        <div className="h-96 relative overflow-hidden">
          <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/chapter/${dish.chapter}`}
              className="inline-flex items-center text-rose-200 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {dish.chapterTitle}
            </Link>
            <h1 className="font-serif font-black text-4xl sm:text-6xl mb-2">{dish.name}</h1>
            <p className="text-xl text-rose-100 italic mb-4">{dish.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-rose-600 text-white border-rose-500">
                <MapPin className="w-3 h-3 mr-1" />
                {dish.region}
              </Badge>
              <Badge className="bg-pink-600 text-white border-pink-500">
                <Clock className="w-3 h-3 mr-1" />
                {dish.occasion}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800 flex items-center">
                  <ChefHat className="w-6 h-6 mr-3 text-rose-600" />
                  About This Dish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-slate-700 leading-relaxed">{dish.description}</p>
                <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-600">
                  <h4 className="font-semibold text-slate-800 mb-2">Cultural Context</h4>
                  <p className="text-slate-700">{dish.context}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                  <h4 className="font-semibold text-slate-800 mb-2">Cultural Significance</h4>
                  <p className="text-slate-700">{dish.culturalSignificance}</p>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-rose-600" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className={`${
                        ingredient.startsWith("-")
                          ? "ml-4 text-slate-600"
                          : ingredient.endsWith(":")
                            ? "font-semibold text-slate-800 mt-3"
                            : "text-slate-700"
                      }`}
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Preparation */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-2xl text-slate-800">Preparation Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{dish.preparation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Region:</span>
                  <span className="ml-2 text-slate-600">{dish.region}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Best for:</span>
                  <span className="ml-2 text-slate-600">{dish.occasion}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-rose-500" />
                  <span className="font-medium">Chapter:</span>
                  <span className="ml-2 text-slate-600">{dish.chapterTitle}</span>
                </div>
              </CardContent>
            </Card>

            {/* Glossary for this dish */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Glossary</CardTitle>
                <CardDescription>Key terms for this dish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dish.glossary.map((item, index) => (
                  <div key={index} className="border-b border-slate-100 pb-3 last:border-b-0">
                    <h4 className="font-semibold text-rose-600 mb-1">{item.term}</h4>
                    <p className="text-sm text-slate-600">{item.definition}</p>
                  </div>
                ))}
                <Link href="/glossary">
                  <Button
                    variant="outline"
                    className="w-full mt-4 hover:bg-rose-50 hover:border-rose-300 bg-transparent"
                  >
                    View Complete Glossary
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Dishes */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-bold text-xl text-slate-800">Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/chapter/${dish.chapter}`}>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                    More from {dish.chapterTitle}
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full hover:bg-rose-50 hover:border-rose-300 bg-transparent">
                    All Chapters
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 Bali Food Guide - Een culinaire reis door Bali en Indonesië</p>
        </div>
      </footer>
    </div>
  )
}
