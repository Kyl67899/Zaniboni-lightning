"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { products } from "@/data/products"
import Link from "next/link"

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">Featured Collections</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
              Explore our range of premium lighting solutions designed for every application
            </p>
          </div>
          <Button variant="outline" className="shrink-0 bg-transparent" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              </Link>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-xs font-medium text-accent mb-2 uppercase tracking-wide">{product.category}</div>
                <h3 className="text-2xl font-serif font-bold mb-2">{product.name}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">{product.description}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  asChild
                >
                  <Link href={`/products/${product.id}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
