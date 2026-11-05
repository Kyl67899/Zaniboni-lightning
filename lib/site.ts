/**
 * Business details used across the site, so they only change in this one place.
 * All of these are fictional, so that nobody using this site contacts the real company:
 * 555-01XX phone numbers are reserved for fictional use and can't be dialled.
 */
export const site = {
  name: "Zaniboni Lighting",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zaniboni-lightning.vercel.app",
  tagline: "Light, shaped with intention.",
  description: "Architectural lighting designed, machined and assembled under one roof in Harborview, Oregon.",
  address: {
    street: "450 Lumen Way",
    city: "Harborview",
    region: "Oregon",
    regionCode: "OR",
    postalCode: "00000",
    country: "USA",
  },
  phone: { display: "+1 (503) 555-0142", href: "tel:+15035550142", schema: "+1-503-555-0142" },
  email: "zanibonilighting@demo.com",
  salesEmail: "sales@zanibonilightingdemo.com",
  supportEmail: "support@zanibonilightingdemo.com",
} as const

export const directLines = [
  { label: "Sales, East USA", ext: "201", email: site.salesEmail },
  { label: "Sales, Central USA", ext: "202", email: site.salesEmail },
  { label: "Sales, West USA", ext: "203", email: site.salesEmail },
  { label: "International Sales", ext: "204", email: site.salesEmail },
  { label: "Specifications", ext: "205", email: site.salesEmail },
  { label: "Technical Support", ext: "300", email: site.supportEmail },
] as const

export const clients = [
  "Aurelia Hotels",
  "Meridian Gallery",
  "Northgate Retail",
  "Atelier Nove",
  "Solstice Dining",
  "Halden & Co.",
] as const

export const navItems = [
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "About", href: "/about" },
  { label: "Representatives", href: "/representatives" },
  { label: "Journal", href: "/resources" },
] as const

export const footerLinks = {
  Products: [
    { label: "All Products", href: "/products" },
    { label: "Linear Pendants", href: "/products/1" },
    { label: "Recessed Downlights", href: "/products/2" },
    { label: "Track Systems", href: "/products/3" },
    { label: "Wall Sconces", href: "/products/4" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Find a Representative", href: "/representatives" },
    { label: "Journal", href: "/resources" },
    { label: "Warranty", href: "/warranty" },
    { label: "FAQs", href: "/faq" },
  ],
} as const

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
] as const
