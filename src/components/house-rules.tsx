import { Info, AlertCircle } from "lucide-react"

interface RuleSection {
  title: string
  items: string[]
  type?: 'info' | 'warning'
}

const rules: RuleSection[] = [
  {
    title: "Getting Here",
    items: [
      "You can fly into SJO or Liberia airports, though there are more connecting flight options to SJO",
      "From the airport(s), take a charter flight to Cobano at flysansa.com or costaricagreenair.com",
      "From Cobano, arrange a taxi to take you to Manzanillo (about 1 Hour)",
      "If flying in, please always arrange a 4x4 rental car or ATV in advance; they get booked up quickly",
      "By car from San Jose: two hours to Puntarenas, then 1.5 hour ferry, then 1.5 hour drive",
      "By car from Liberia: 4 hours (80% great roads)",
      "Ferry schedule available at nicoyapeninsula.com/travel-info/ferry/"
    ],
    type: 'info'
  },
  {
    title: "Safety Guidelines",
    items: [
      "Sometimes cars drive fast, and there are accidents. Be SAFE! Drive safe and be aware at all times",
      "You MUST wear goggles and a bandana while on ATV or Bike",
      "Don't leave valuables in a parked car or unattended on the beach",
      "Please be extremely careful when swimming; there are many rip currents",
      "If you get caught in a rip current, do not try to swim against it; instead, let it take you, then swim back outside the channel"
    ],
    type: 'warning'
  },
  {
    title: "Local Shopping",
    items: [
      "Super Campos: located on the road to the village, amazing selections of vegetables and locally grown meats",
      "Small shop near the restaurant on the beach",
      "Look for fishing boats on the beach and buy directly from fishermen (one big fish can be $10-20)"
    ]
  },
  {
    title: "Recommended Restaurants",
    items: [
      "De Raíz: just down the street, walk to the town (9am - 3pm during high season, might be closed July-November)",
      "Atardecer Dorado: down on the beach with selection of fresh food from local ingredients (11am-10pm)",
      "Brekkie: the best breakfast in town",
      "Mantarraya Cafe: cute amazing breakfast",
      "The Bakery: good breakfast and lunch, healthy options, best croissants",
      "Koji's: excellent sushi fusion spot, amazing ice cream and desserts",
      "Tipsy Wine Bar: spot to go to on Thursdays for happy hour (6/7ish)",
      "Katana: Asian Fusion/Sushi, favorite restaurant, amazing salad and fish skewers",
      "Kika's: relaxed vibe for dinner and live music (starts at 10 pm)",
      "Soda Tiquicia: local food, authentic and yummy",
      "Rocamar: beachfront vibes with great juices, salads, and wraps",
      "Banana Beach: great for sunset and drinks (food not recommended except ceviche)",
      "Rancho Itauna: beachfront spot, Brazilian kitchen, best seafood",
      "Carmen: newly updated restaurant on the beach, pizzas",
      "El Facon: steak"
    ]
  },
  {
    title: "Beaches and Surf",
    items: [
      "Ocean Tribe - Surf Lessons & Camp available in front of our house (+506 8763 0820)",
      "Local surf spot on playa Manzanillo (good at high tide only, advanced only due to rocks)",
      "Hermosa (any level)"
    ]
  },
  {
    title: "Nearby Attractions",
    items: [
      "Habitas and Nantipa - hip hotels in the area",
      "San Jose: Coffee shops, restaurants, boutique hotels, and cool stores",
      "Arenal volcano/La fortuna area: Hot springs, waterfalls, chocolate tour, wildlife refuge, and more",
      "Osa Peninsula: One of the most biodiverse places on Earth, must-see destination"
    ]
  }
]

export function HouseRules() {
  return (
    <section id="rules" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">House Rules & Local Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {section.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                {section.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start space-x-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 