import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Phone } from "lucide-react"
import { ContactSalesDialog } from "@/components/contact-sales-dialog"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: "Product not found" }
  return pageMetadata(product.name, product.description, `/products/${product.id}`, product.image)
}

const specLabels = [
  ["wattage", "Wattage"],
  ["lumen", "Lumen output"],
  ["colorTemp", "Color temperature"],
  ["cri", "CRI"],
  ["dimming", "Dimming"],
  ["finish", "Finish"],
] as const

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const related = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 3)

  return (
    <main id="main">
      <section className="pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="shell">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:py-6">
              <p className="eyebrow text-secondary">{product.category}</p>
              <h1 className="display mt-5 lg:text-[4.25rem]">{product.name}</h1>
              <p className="mt-5 font-serif text-3xl">${product.price.toLocaleString("en-US")}</p>
              <p className="lede mt-6">{product.description}</p>

              <h2 className="eyebrow mt-12 font-sans text-muted-foreground">Specifications</h2>
              <dl className="mt-4 border-t border-border">
                {specLabels.map(([key, label]) =>
                  product.specs[key] ? (
                    <div key={key} className="flex justify-between gap-6 border-b border-border py-3 text-sm">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right">{product.specs[key]}</dd>
                    </div>
                  ) : null,
                )}
              </dl>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <ContactSalesDialog productId={product.id} productName={product.name} />
                <Button asChild size="lg" variant="outline" className="bg-transparent shadow-none hover:bg-foreground hover:text-background">
                  <a href={site.phone.href}>
                    <Phone />
                    {site.phone.display}
                  </a>
                </Button>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Made in our {site.address.city}, {site.address.region} workshop. Covered by our{" "}
                <Link href="/warranty" className="text-link">
                  limited warranty
                </Link>
                . Prefer to work locally?{" "}
                <Link href="/representatives" className="text-link">
                  Find your representative
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="shell">
          <h2 className="heading">You may also like</h2>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
