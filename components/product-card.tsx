"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/data/products"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <Badge variant="secondary" className="mb-1 sm:mb-2 text-xs">
              {product.category}
            </Badge>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xl sm:text-2xl font-bold">${product.price}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 sm:pt-2">
          <Button variant="default" size="sm" className="flex-1 w-full sm:w-auto" asChild>
            <Link href={`/products/${product.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent w-full sm:w-auto">
            Contact
          </Button>
        </div>
      </div>
    </div>
  )
}
