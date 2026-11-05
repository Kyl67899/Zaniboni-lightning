export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  /** Blank lines separate paragraphs. "## " starts a heading and "- " a list item. */
  content: string
  author: {
    name: string
    role: string
  }
  category: string
  publishedAt: string
  readTime: string
  image: string
  featured: boolean
}

export const blogCategories = [
  "All Posts",
  "Design Trends",
  "Technology",
  "Applications",
  "Installation Tips",
  "Sustainability",
]

/** Images in /public that the admin editor offers for a post. */
export const blogImages = [
  { label: "Commercial interior", value: "/modern-architectural-lighting-in-luxury-commercial.jpg" },
  { label: "Office with exposed beams", value: "/modern-industrial-office-space-with-exposed-beams-.jpg" },
  { label: "Recessed downlight", value: "/recessed-downlight-ceiling-fixture.jpg" },
  { label: "Track lighting", value: "/modern-track-lighting-system.jpg" },
  { label: "Museum track head", value: "/museum-quality-track-lighting-led.jpg" },
  { label: "Linear pendant", value: "/modern-linear-pendant-lighting-fixture.jpg" },
  { label: "Pendant cluster", value: "/modern-pendant-cluster-dining-lighting.jpg" },
  { label: "Cove lighting", value: "/architectural-cove-lighting-led-strip.jpg" },
  { label: "Quality control", value: "/quality-control-lighting-fixtures.jpg" },
  { label: "CNC machining", value: "/cnc-machining-manufacturing-process.jpg" },
]

const editorial = { name: "Zaniboni Lighting", role: "Editorial" }

export function formatPostDate(date: string) {
  // Dates are stored without a time. UTC keeps server and browser on the same day.
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "modern-lighting-trends",
    title: "Five Ideas Shaping Architectural Lighting",
    excerpt:
      "Smaller apertures, cleaner optics and light that changes through the day: what designers are asking for in modern projects.",
    content: `Architectural lighting has moved on from simply replacing old lamps with LEDs. The questions designers ask now are about comfort, flexibility and how little of the fixture you need to see.

## Smaller, quieter fixtures

As LED sources have shrunk, so have the fixtures around them. Miniature apertures and trimless details let the light take the attention while the hardware almost disappears into the ceiling.

## Optics that control glare

Lumens are no longer the whole story. Regressed sources, louvers and well-designed lenses keep the brightness where it's useful and out of people's eyes, which is why specifiers increasingly look at glare ratings as well as output.

## Light that changes

Tunable white adjusts colour temperature across the day. Warm dim mimics the way an incandescent lamp grows warmer as it dims, which is especially flattering in restaurants and hospitality spaces.

## Controls that are simpler to install

Wireless protocols such as Bluetooth mesh make it practical to add scenes and sensors, including on renovation projects where running new control wiring would be disruptive.

## Where it's made

Domestic content requirements such as the Build America, Buy America Act have made sourcing a design-stage question on many public projects, and shorter supply chains can also make lead times easier to plan.`,
    author: editorial,
    category: "Design Trends",
    publishedAt: "2025-01-15",
    readTime: "3 min read",
    image: "/modern-architectural-lighting-in-luxury-commercial.jpg",
    featured: true,
  },
  {
    id: 2,
    slug: "led-technology-efficiency",
    title: "Reading an LED Spec Sheet: What the Numbers Mean",
    excerpt:
      "Efficacy, CRI, CCT and lumen maintenance explained, and how each one affects the way a space looks and performs.",
    content: `A fixture's spec sheet tells you a great deal about how it will perform once it's installed, provided you know which numbers matter for your project.

## Lumens and efficacy

Lumens measure how much light a fixture delivers. Efficacy, in lumens per watt, tells you how efficiently it does so. Always compare delivered lumens from the complete fixture rather than the rating of the bare LED, because optics and trims absorb some of the light.

## Colour temperature (CCT)

Measured in kelvin, CCT describes how warm or cool white light appears. Around 2700K feels warm and residential, 3000K to 3500K suits most hospitality and retail spaces, and 4000K reads as crisp and neutral.

## Colour rendering (CRI)

CRI indicates how faithfully a light source reveals colours compared with a reference source. A CRI of 90 or above is the usual expectation where materials and finishes matter. The R9 value, which covers saturated reds, is worth checking too because it strongly affects skin tones and food.

## Lumen maintenance

LEDs rarely fail outright. They dim gradually instead. An L70 rating estimates how long a fixture takes to fall to 70% of its initial output, so you can compare expected service life on a like-for-like basis.

## Beam angle

The same lumens feel completely different at a 10° spot and a 60° flood. Choose the beam for the surface you're lighting: narrow for accents, wider for general illumination.`,
    author: editorial,
    category: "Technology",
    publishedAt: "2025-01-10",
    readTime: "3 min read",
    image: "/recessed-downlight-ceiling-fixture.jpg",
    featured: true,
  },
  {
    id: 3,
    slug: "commercial-office-lighting-guide",
    title: "Lighting the Modern Office",
    excerpt: "Layered light, glare control and flexible controls for workplaces people actually want to come back to.",
    content: `Good office lighting does more than meet a target on a light meter. It should reduce eye strain, flatter the architecture and adapt to the way the space is used.

## Build it in layers

Combine ambient light for general visibility, task light where people read and work, and accent light to give walls and materials some depth. Lighting vertical surfaces in particular makes a room feel brighter and more open than the numbers alone suggest.

## Control glare

Screens have made glare the main complaint in many offices. Look at Unified Glare Rating (UGR) figures: a value of 19 or below is the common benchmark for office work. Well-shielded fixtures make it far easier to achieve.

## Set appropriate light levels

Task areas are commonly designed to somewhere around 300 to 500 lux, though the right figure depends on the work being done and on the standards that apply to your project. Your lighting designer should confirm these targets.

## Plan for flexibility

Offices change. Track and modular systems let you adapt without rewiring, and tunable white lets you shift the character of a space from focused to relaxed.

## Use controls to save energy

Occupancy sensors, daylight harvesting and zoned dimming reduce energy use and are required in many jurisdictions under the local energy code, so involve your controls specialist early in the design.`,
    author: editorial,
    category: "Applications",
    publishedAt: "2025-01-05",
    readTime: "3 min read",
    image: "/modern-industrial-office-space-with-exposed-beams-.jpg",
    featured: true,
  },
  {
    id: 4,
    slug: "residential-lighting-installation",
    title: "DIY or Professional? When to Call a Lighting Expert",
    excerpt: "Which lighting jobs a confident homeowner can take on, and when a licensed electrician is the right call.",
    content: `Swapping a lamp is one thing. Adding circuits or cutting into a ceiling is another. Here's a practical way to think about where the line sits.

## Generally suitable for homeowners

- Replacing lamps and plug-in fixtures
- Adding plug-in table and floor lamps to build up layers of light

## Call a licensed electrician

- Adding new circuits, switches or recessed fixtures
- Any work in a panel, or anywhere you find older wiring
- Fixtures in bathrooms, near water or outdoors, which have specific ratings and protection requirements

Electrical work is regulated, and permit requirements vary by location. If you aren't sure, ask. Always follow the manufacturer's installation instructions and turn off the power at the breaker before touching any fixture.

## Questions worth asking before you buy

**Is it rated for the location?** Recessed fixtures installed in contact with insulation need to be IC-rated, and damp or wet locations need the matching rating.

**Will it work with your dimmer?** Not every LED driver works with every dimmer. An incompatible pairing can cause flicker or a limited dimming range, so check compatibility first.

**Is the layout right?** A lighting designer or manufacturer's representative can help with spacing and beam angles. It's far easier to change a plan than a ceiling.`,
    author: editorial,
    category: "Installation Tips",
    publishedAt: "2024-12-28",
    readTime: "3 min read",
    image: "/modern-track-lighting-system.jpg",
    featured: false,
  },
  {
    id: 5,
    slug: "sustainable-lighting-solutions",
    title: "What Sustainable Lighting Really Means",
    excerpt: "Efficiency is only the start. Materials, longevity, sourcing and light pollution all play a part.",
    content: `LEDs have made energy efficiency close to a baseline. A more complete view of sustainability looks at the whole life of a fixture and at what its light does once it leaves the building.

## Use less, then control it

Efficient fixtures reduce demand, and controls reduce it further. Dimming, sensors and well-planned zones mean light is only on where and when it's needed.

## Build it to last

A fixture that lasts and can be serviced avoids the materials and transport of a replacement. Durable housings and accessible components matter as much as the efficacy figure on the spec sheet.

## Think about sourcing and finishes

Where raw materials come from, how far they travel and how a fixture is finished all contribute to its footprint. Sourcing metals regionally and choosing cleaner powder coating processes both help.

## Respect the night

Poorly aimed outdoor lighting wastes energy and disrupts nocturnal wildlife. Shielded fixtures, warmer colour temperatures and wildlife-friendly spectra keep the light where it belongs.

## Ask for evidence

Certifications and published data are a better guide than general claims. Ask manufacturers how and where their products are made.`,
    author: editorial,
    category: "Sustainability",
    publishedAt: "2024-12-20",
    readTime: "2 min read",
    image: "/quality-control-lighting-fixtures.jpg",
    featured: false,
  },
  {
    id: 6,
    slug: "restaurant-lighting-ambiance",
    title: "Designing Ambiance: Lighting for Restaurants",
    excerpt: "Warm colour, tight beams and flexible scenes that carry a dining room from lunch service to late evening.",
    content: `In a restaurant, lighting shapes how the food looks, how the guests look, and how long people want to stay.

## Choose warm, high-quality light

Warm colour temperatures around 2700K create a sense of intimacy. High colour rendering matters just as much, because food and skin tones lose their appeal under poor light. Check the R9 value along with the overall CRI.

## Light the table, not the guest

Narrow beams aimed at tables create pools of light and a feeling of privacy. Keep the source shielded so guests don't look straight into it. Regressed optics and accessories such as louvers help here.

## Give the walls something to do

Grazing a textured wall or lighting artwork adds depth and draws the eye through the room. Without some vertical light, even a beautiful interior can feel like a dark cave.

## Plan scenes for the whole day

A dining room needs to work at lunch, at dusk and late in the evening. Dimming and preset scenes let staff change the mood with one button. Warm dim fixtures grow warmer as they dim, which makes the transition feel natural.

## Don't forget the working areas

Host stands, bars and back-of-house areas need task lighting that won't spill into the dining room.`,
    author: editorial,
    category: "Applications",
    publishedAt: "2024-12-15",
    readTime: "2 min read",
    image: "/modern-pendant-cluster-dining-lighting.jpg",
    featured: false,
  },
]
