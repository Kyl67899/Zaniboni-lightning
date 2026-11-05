"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, products } from "@/data/products"
import { site } from "@/lib/site"

const ALL = "All Products"

export default function ProductsPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(ALL)
  const [sort, setSort] = useState("name-asc")

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return products
      .filter((product) => category === ALL || product.category === category)
      .filter(
        (product) =>
          !term ||
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term),
      )
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price
        if (sort === "price-desc") return b.price - a.price
        return sort === "name-desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
      })
  }, [query, category, sort])

  const clearFilters = () => {
    setQuery("")
    setCategory(ALL)
  }

  return (
    <main id="main">
      <PageHero
        eyebrow="Products"
        title="The collection"
        description={`Architectural lighting for commercial, retail, hospitality and residential projects, made in our ${site.address.city} workshop.`}
      />

      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="pill"
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <label htmlFor="product-search" className="sr-only">
                  Search products
                </label>
                <Input
                  id="product-search"
                  type="search"
                  placeholder="Search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-10 bg-transparent pl-9 pr-9"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger aria-label="Sort products" className="h-10 w-full bg-transparent sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name, A–Z</SelectItem>
                  <SelectItem value="name-desc">Name, Z–A</SelectItem>
                  <SelectItem value="price-asc">Price, low to high</SelectItem>
                  <SelectItem value="price-desc">Price, high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p role="status" className="mt-8 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-light">No products match your search</h2>
              <p className="mt-3 text-muted-foreground">Try a different term, or clear your filters.</p>
              <Button onClick={clearFilters} variant="outline" size="lg" className="mt-8 bg-transparent">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Looking for something specific?"
        description="We design and manufacture in-house, so our team can help with custom configurations for your project."
      />
    </main>
  )
}
