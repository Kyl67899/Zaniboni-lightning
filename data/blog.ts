export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    avatar: string
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
  "Product Spotlight",
  "Installation Tips",
  "Industry News",
  "Case Studies",
]

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "modern-lighting-trends-2025",
    title: "Top 5 Modern Lighting Trends to Watch in 2025",
    excerpt:
      "Discover the latest innovations in architectural lighting design, from sustainable LED technology to smart home integration.",
    content: "Full article content here...",
    author: {
      name: "Sarah Chen",
      role: "Design Director",
      avatar: "female designer professional portrait",
    },
    category: "Design Trends",
    publishedAt: "2025-01-15",
    readTime: "5 min read",
    image: "modern architectural lighting showcase display",
    featured: true,
  },
  {
    id: 2,
    slug: "led-technology-efficiency",
    title: "Understanding LED Technology: Efficiency Meets Beauty",
    excerpt:
      "A deep dive into how LED technology is revolutionizing the lighting industry with unprecedented energy savings and design flexibility.",
    content: "Full article content here...",
    author: {
      name: "James Chen",
      role: "Head of Engineering",
      avatar: "male engineer technical professional portrait",
    },
    category: "Product Spotlight",
    publishedAt: "2025-01-10",
    readTime: "7 min read",
    image: "led lighting technology close up detail",
    featured: true,
  },
  {
    id: 3,
    slug: "commercial-office-lighting-guide",
    title: "The Complete Guide to Commercial Office Lighting",
    excerpt:
      "Learn how proper lighting design can boost productivity, employee well-being, and create inspiring workspaces.",
    content: "Full article content here...",
    author: {
      name: "Michael Torres",
      role: "Lighting Consultant",
      avatar: "male consultant professional portrait",
    },
    category: "Case Studies",
    publishedAt: "2025-01-05",
    readTime: "10 min read",
    image: "modern office space with architectural lighting",
    featured: true,
  },
  {
    id: 4,
    slug: "residential-lighting-installation",
    title: "DIY vs Professional: When to Call a Lighting Expert",
    excerpt:
      "Understanding when you can tackle lighting installation yourself and when it's time to bring in the professionals.",
    content: "Full article content here...",
    author: {
      name: "Jennifer Rodriguez",
      role: "Installation Specialist",
      avatar: "female technician professional portrait",
    },
    category: "Installation Tips",
    publishedAt: "2024-12-28",
    readTime: "6 min read",
    image: "lighting installation professional electrician",
    featured: false,
  },
  {
    id: 5,
    slug: "sustainable-lighting-solutions",
    title: "Sustainable Lighting: Good for Business, Better for Earth",
    excerpt:
      "Explore how sustainable lighting solutions can reduce your carbon footprint while cutting energy costs by up to 60%.",
    content: "Full article content here...",
    author: {
      name: "David Kowalski",
      role: "Sustainability Manager",
      avatar: "male sustainability manager portrait",
    },
    category: "Industry News",
    publishedAt: "2024-12-20",
    readTime: "8 min read",
    image: "sustainable green building with LED lighting",
    featured: false,
  },
  {
    id: 6,
    slug: "restaurant-lighting-ambiance",
    title: "Creating Perfect Ambiance: Restaurant Lighting Design",
    excerpt: "Discover how strategic lighting design can transform dining experiences and influence customer behavior.",
    content: "Full article content here...",
    author: {
      name: "Sofia Rossi",
      role: "Chief Design Officer",
      avatar: "female designer creative professional portrait",
    },
    category: "Case Studies",
    publishedAt: "2024-12-15",
    readTime: "9 min read",
    image: "elegant restaurant interior with ambient lighting",
    featured: false,
  },
]
