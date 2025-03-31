import { Check } from "lucide-react"

interface AmenityCategory {
  title: string
  items: string[]
}

const amenities: AmenityCategory[] = [
  {
    title: "Bathroom",
    items: [
      "Hair dryer",
      "Cleaning products",
      "Shampoo",
      "Conditioner",
      "Body soap",
      "Outdoor shower",
      "Hot water",
      "Shower gel"
    ]
  },
  {
    title: "Bedroom and laundry",
    items: [
      "Bed linens",
      "Cotton linens",
      "Extra pillows and blankets",
      "Room-darkening shades",
      "Drying rack for clothing",
      "Safe",
      "Clothing storage: closet"
    ]
  },
  {
    title: "Entertainment",
    items: [
      "Sound system",
      "Board games"
    ]
  },
  {
    title: "Heating and cooling",
    items: [
      "Air conditioning"
    ]
  },
  {
    title: "Home safety",
    items: [
      "Exterior security cameras on property",
      "Cameras on perimeter",
      "First aid kit"
    ]
  },
  {
    title: "Internet and office",
    items: [
      "Wifi",
      "Dedicated workspace"
    ]
  },
  {
    title: "Kitchen and dining",
    items: [
      "Kitchen",
      "Space where guests can cook their own meals",
      "Refrigerator",
      "Cooking basics",
      "Pots and pans, oil, salt and pepper",
      "Dishes and silverware",
      "Bowls, chopsticks, plates, cups, etc.",
      "Freezer",
      "Dishwasher",
      "Stove",
      "Hot water kettle",
      "Coffee maker",
      "Wine glasses",
      "Toaster",
      "Blender",
      "Rice maker",
      "Dining table",
      "Coffee"
    ]
  },
  {
    title: "Location features",
    items: [
      "Beach access – Beachfront",
      "Guests can enjoy a nearby beach",
      "Private entrance",
      "Separate street or building entrance"
    ]
  },
  {
    title: "Outdoor",
    items: [
      "Private backyard",
      "An open space on the property usually covered in grass"
    ]
  },
  {
    title: "Parking and facilities",
    items: [
      "Free parking on premises",
      "Pool"
    ]
  },
  {
    title: "Services",
    items: [
      "Pets allowed",
      "Assistance animals are always allowed",
      "Long term stays allowed",
      "Allow stay for 28 days or more",
      "Housekeeping available 24 hours, 2 days a week - available at extra cost"
    ]
  }
]

export function Amenities() {
  return (
    <section id="amenities" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
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