export interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  price: number
  featured?: boolean
  specs: {
    wattage?: string
    lumen?: string
    colorTemp?: string
    cri?: string
    dimming?: string
    finish?: string
  }
}

export const categories = [
  "All Products",
  "Commercial",
  "Architectural",
  "Retail",
  "Hospitality",
  "Residential",
  "Industrial",
]

export const products: Product[] = [
  {
    id: "1",
    name: "Linear Pendants",
    description: "Sleek and modern linear lighting perfect for commercial spaces and open office environments.",
    image: "/modern-linear-pendant-lighting-fixture.jpg",
    category: "Commercial",
    price: 1299,
    featured: true,
    specs: {
      wattage: "40W",
      lumen: "4000lm",
      colorTemp: "3000K-4000K",
      cri: "90+",
      dimming: "0-10V",
      finish: "Brushed Aluminum",
    },
  },
  {
    id: "2",
    name: "Recessed Downlights",
    description: "Precision-engineered recessed fixtures with customizable beam angles and color temperatures.",
    image: "/recessed-downlight-ceiling-fixture.jpg",
    category: "Architectural",
    price: 849,
    featured: true,
    specs: {
      wattage: "25W",
      lumen: "2500lm",
      colorTemp: "2700K-5000K",
      cri: "95+",
      dimming: "DALI",
      finish: "White",
    },
  },
  {
    id: "3",
    name: "Track Systems",
    description: "Flexible track lighting solutions for galleries, retail spaces, and dynamic environments.",
    image: "/modern-track-lighting-system.jpg",
    category: "Retail",
    price: 1599,
    featured: true,
    specs: {
      wattage: "35W per head",
      lumen: "3500lm",
      colorTemp: "3000K",
      cri: "92+",
      dimming: "Triac",
      finish: "Matte Black",
    },
  },
  {
    id: "4",
    name: "Wall Sconces",
    description: "Elegant wall-mounted fixtures that blend form and function for hospitality and residential.",
    image: "/modern-architectural-wall-sconce.jpg",
    category: "Hospitality",
    price: 699,
    featured: true,
    specs: {
      wattage: "18W",
      lumen: "1800lm",
      colorTemp: "2700K",
      cri: "90+",
      dimming: "ELV",
      finish: "Brushed Brass",
    },
  },
  {
    id: "5",
    name: "Chandelier Collection",
    description: "Statement pieces that transform spaces with artistic design and warm ambient lighting.",
    image: "/modern-architectural-chandelier-lighting.jpg",
    category: "Hospitality",
    price: 3299,
    specs: {
      wattage: "60W",
      lumen: "5000lm",
      colorTemp: "2700K-3000K",
      cri: "95+",
      dimming: "0-10V",
      finish: "Antique Brass",
    },
  },
  {
    id: "6",
    name: "Industrial High Bay",
    description: "High-performance lighting for warehouses, factories, and large commercial spaces.",
    image: "/industrial-high-bay-led-lighting.jpg",
    category: "Industrial",
    price: 899,
    specs: {
      wattage: "150W",
      lumen: "18000lm",
      colorTemp: "5000K",
      cri: "80+",
      dimming: "Optional 0-10V",
      finish: "Powder Coated Steel",
    },
  },
  {
    id: "7",
    name: "Cove Lighting System",
    description: "Indirect lighting solution for elegant ambient illumination in architectural applications.",
    image: "/architectural-cove-lighting-led-strip.jpg",
    category: "Architectural",
    price: 699,
    specs: {
      wattage: "12W/ft",
      lumen: "1200lm/ft",
      colorTemp: "2700K-6500K",
      cri: "95+",
      dimming: "DMX",
      finish: "Aluminum Channel",
    },
  },
  {
    id: "8",
    name: "Pendant Cluster",
    description: "Multi-pendant arrangement perfect for dining areas and commercial spaces.",
    image: "/modern-pendant-cluster-dining-lighting.jpg",
    category: "Residential",
    price: 1999,
    specs: {
      wattage: "8W per pendant",
      lumen: "800lm per pendant",
      colorTemp: "3000K",
      cri: "90+",
      dimming: "Triac",
      finish: "Clear Glass / Brass",
    },
  },
  {
    id: "9",
    name: "Retail Spotlights",
    description: "Adjustable spotlights designed to highlight merchandise with precision and style.",
    image: "/retail-track-spotlight-adjustable-led.jpg",
    category: "Retail",
    price: 449,
    specs: {
      wattage: "20W",
      lumen: "2000lm",
      colorTemp: "3000K-4000K",
      cri: "95+",
      dimming: "Phase Cut",
      finish: "Matte Black / White",
    },
  },
  {
    id: "10",
    name: "Outdoor Wall Pack",
    description: "Weather-resistant exterior lighting for commercial buildings and pathways.",
    image: "/commercial-outdoor-wall-pack-led-lighting.jpg",
    category: "Commercial",
    price: 349,
    specs: {
      wattage: "30W",
      lumen: "3600lm",
      colorTemp: "4000K-5000K",
      cri: "80+",
      dimming: "Photocell",
      finish: "Bronze / Graphite",
    },
  },
  {
    id: "11",
    name: "Museum Track Head",
    description: "Precision optics and color rendering for gallery and museum installations.",
    image: "/museum-quality-track-lighting-led.jpg",
    category: "Architectural",
    price: 789,
    specs: {
      wattage: "22W",
      lumen: "2200lm",
      colorTemp: "3000K",
      cri: "98+",
      dimming: "DALI",
      finish: "Matte White",
    },
  },
  {
    id: "12",
    name: "Floor Lamp Series",
    description: "Modern floor lamps with adjustable arms for residential and office environments.",
    image: "/modern-architectural-floor-lamp-adjustable.jpg",
    category: "Residential",
    price: 999,
    specs: {
      wattage: "15W",
      lumen: "1500lm",
      colorTemp: "2700K-5000K",
      cri: "90+",
      dimming: "Touch Control",
      finish: "Matte Black / Brass",
    },
  },
]
