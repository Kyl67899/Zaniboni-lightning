import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/data/products"

export function ProductCard({ product, sizes }: { product: Product; sizes?: string }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="eyebrow mt-5 text-muted-foreground">{product.category}</p>
      <h3 className="mt-2 text-2xl transition-colors group-hover:text-secondary md:text-3xl">{product.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      <p className="mt-3 text-sm">${product.price.toLocaleString("en-US")}</p>
    </Link>
  )
}
