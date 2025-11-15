"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal } from "lucide-react"
import { categories } from "@/data/products"

interface ProductFiltersProps {
  selectedCategories: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string) => void
  onPriceChange: (range: [number, number]) => void
  onClearFilters: () => void
  activeFilterCount: number
}

export function ProductFilters({
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
  activeFilterCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-8">
      {/* Header with Clear Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 text-xs">
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => onCategoryChange(category)}
              />
              <Label
                htmlFor={category}
                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={4000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
