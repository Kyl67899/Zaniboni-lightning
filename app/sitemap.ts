import type { MetadataRoute } from "next"
import { blogPosts } from "@/data/blog"
import { products } from "@/data/products"
import { site } from "@/lib/site"

const staticPaths = [
  "",
  "/products",
  "/manufacturing",
  "/about",
  "/sustainability",
  "/careers",
  "/representatives",
  "/resources",
  "/contact",
  "/warranty",
  "/faq",
  "/privacy",
  "/terms",
  "/accessibility",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}` })),
    ...products.map((product) => ({ url: `${site.url}/products/${product.id}` })),
    ...blogPosts.map((post) => ({ url: `${site.url}/resources/${post.slug}`, lastModified: post.publishedAt })),
  ]
}
