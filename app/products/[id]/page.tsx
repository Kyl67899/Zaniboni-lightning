"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Phone } from "lucide-react"
import { products } from "@/data/products"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ContactSalesDialog } from "@/components/contact-sales-dialog"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Link href="/products">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted border border-border">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {product.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">{product.name}</h1>
                <p className="text-3xl font-bold mb-6">${product.price}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <Separator />

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specs.wattage && (
                    <div>
                      <p className="text-sm text-muted-foreground">Wattage</p>
                      <p className="font-medium">{product.specs.wattage}</p>
                    </div>
                  )}
                  {product.specs.lumen && (
                    <div>
                      <p className="text-sm text-muted-foreground">Lumen Output</p>
                      <p className="font-medium">{product.specs.lumen}</p>
                    </div>
                  )}
                  {product.specs.colorTemp && (
                    <div>
                      <p className="text-sm text-muted-foreground">Color Temperature</p>
                      <p className="font-medium">{product.specs.colorTemp}</p>
                    </div>
                  )}
                  {product.specs.cri && (
                    <div>
                      <p className="text-sm text-muted-foreground">CRI</p>
                      <p className="font-medium">{product.specs.cri}</p>
                    </div>
                  )}
                  {product.specs.dimming && (
                    <div>
                      <p className="text-sm text-muted-foreground">Dimming</p>
                      <p className="font-medium">{product.specs.dimming}</p>
                    </div>
                  )}
                  {product.specs.finish && (
                    <div>
                      <p className="text-sm text-muted-foreground">Finish</p>
                      <p className="font-medium">{product.specs.finish}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <ContactSalesDialog productId={product.id} productName={product.name} />
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Call: +1 (800) 555-1234
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                <p className="text-sm font-medium">Made in USA</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Proudly manufactured in our Clearwater, Florida facility with premium materials and expert
                  craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
