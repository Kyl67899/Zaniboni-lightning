"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Grid3x3, LayoutGrid, X, SlidersHorizontal } from "lucide-react"
import { products } from "@/data/products"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Products"])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000])
  const [sortBy, setSortBy] = useState("name-asc")
  const [gridCols, setGridCols] = useState<3 | 4>(3)

  // Filter products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategories.includes("All Products") || selectedCategories.includes(product.category)

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  }, [searchQuery, selectedCategories, priceRange, sortBy])

  // Calculate active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (!selectedCategories.includes("All Products") && selectedCategories.length > 0) count++
    if (priceRange[0] !== 0 || priceRange[1] !== 4000) count++
    return count
  }, [selectedCategories, priceRange])

  const handleCategoryChange = (category: string) => {
    if (category === "All Products") {
      setSelectedCategories(["All Products"])
    } else {
      const newCategories = selectedCategories.filter((c) => c !== "All Products")
      if (selectedCategories.includes(category)) {
        const filtered = newCategories.filter((c) => c !== category)
        setSelectedCategories(filtered.length === 0 ? ["All Products"] : filtered)
      } else {
        setSelectedCategories([...newCategories, category])
      }
    }
  }

  const handleClearFilters = () => {
    setSelectedCategories(["All Products"])
    setPriceRange([0, 4000])
    setSearchQuery("")
  }

  const removeCategory = (category: string) => {
    const newCategories = selectedCategories.filter((c) => c !== category)
    setSelectedCategories(newCategories.length === 0 ? ["All Products"] : newCategories)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-balance">All Products</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Explore our complete collection of premium architectural lighting solutions. From commercial spaces to
              residential elegance, find the perfect fixture for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
                <ProductFilters
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={setPriceRange}
                  onClearFilters={handleClearFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 space-y-6">
              {/* Search and Controls */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden bg-transparent">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {activeFilterCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {activeFilterCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <div className="py-6">
                        <ProductFilters
                          selectedCategories={selectedCategories}
                          priceRange={priceRange}
                          onCategoryChange={handleCategoryChange}
                          onPriceChange={setPriceRange}
                          onClearFilters={handleClearFilters}
                          activeFilterCount={activeFilterCount}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Grid Toggle */}
                  <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1 bg-card">
                    <Button
                      variant={gridCols === 3 ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setGridCols(3)}
                      aria-label="3 column grid"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={gridCols === 4 ? "secondary" : "ghost"}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setGridCols(4)}
                      aria-label="4 column grid"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Active Filters */}
                {(activeFilterCount > 0 || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {!selectedCategories.includes("All Products") &&
                      selectedCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="gap-1">
                          {category}
                          <button onClick={() => removeCategory(category)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    {(priceRange[0] !== 0 || priceRange[1] !== 4000) && (
                      <Badge variant="secondary" className="gap-1">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button onClick={() => setPriceRange([0, 4000])} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}

                {/* Results Count */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div
                  className={`grid gap-6 ${
                    gridCols === 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
