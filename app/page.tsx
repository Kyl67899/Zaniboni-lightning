import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ArticleCard } from "@/components/article-card"
import { CtaBand } from "@/components/cta-band"
import { Hero } from "@/components/hero"
import { Newsletter } from "@/components/newsletter"
import { ProductCard } from "@/components/product-card"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/data/blog"
import { products } from "@/data/products"
import { clients, site } from "@/lib/site"

export const metadata = { alternates: { canonical: "/" } }

const processSteps = ["Design", "Engineering", "Machining", "Welding", "Finishing", "Assembly", "Testing", "Shipping"]

export default function Home() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3)

  return (
    <main id="main">
      <Hero />

      <section aria-label="Selected clients" className="border-b border-border">
        <div className="shell flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-14">
          <p className="eyebrow shrink-0 text-muted-foreground">Our lighting is in spaces for</p>
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-3 lg:flex-1 lg:justify-between lg:gap-x-6">
            {clients.map((client) => (
              <li key={client} className="font-serif text-xl tracking-wide text-foreground/70">
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/museum-quality-track-lighting-led.jpg"
              alt="Adjustable track lighting head with a precision lens"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-secondary">Precision Optics</p>
            <h2 className="heading mt-6">Light that goes where you want it</h2>
            <p className="lede mt-7">
              Our interchangeable lenses let you go from a tight accent beam to a soft, wide wash without changing the
              fixture, while deep-set sources keep glare under control.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              It’s a simple way to adjust a space as it changes, whether you’re lighting a gallery, a restaurant or a
              workplace.
            </p>
            <Button asChild variant="link" className="mt-6 h-auto p-0 text-[15px] font-normal">
              <Link href="/products">
                Explore the collection
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/60">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-secondary">Collections</p>
              <h2 className="heading mt-6">Light for every application</h2>
            </div>
            <Link href="/products" className="text-link shrink-0 text-sm">
              View all products
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08}>
                <ProductCard product={product} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow text-secondary">Made in-house</p>
            <h2 className="heading mt-6">Every step happens under one roof</h2>
            <p className="lede mt-7">
              From design through to shipping, our work takes place in our {site.address.city}, {site.address.region}{" "}
              workshop, which gives us close control over quality and the freedom to adapt a fixture to your project.
            </p>
            <ol className="mt-10 grid grid-cols-2 gap-x-8 border-t border-border">
              {processSteps.map((step, index) => (
                <li key={step} className="flex items-baseline gap-4 border-b border-border py-3 text-sm">
                  <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
            <Button asChild size="lg" className="mt-10">
              <Link href="/manufacturing">
                How we make it
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3 self-center md:gap-4">
            {[
              ["/cnc-machining-manufacturing-process.jpg", "CNC machining a lighting component"],
              ["/precision-welding-industrial-process.jpg", "Welding a fixture housing"],
              ["/quality-control-lighting-fixtures.jpg", "Inspecting finished fixtures"],
              ["/modern-track-lighting-system.jpg", "Track lighting installed in a kitchen"],
            ].map(([src, alt], index) => (
              <div key={src} className={`relative aspect-square overflow-hidden bg-muted ${index % 2 ? "mt-8" : ""}`}>
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="shell">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-secondary">Journal</p>
              <h2 className="heading mt-6">Ideas on light</h2>
            </div>
            <Link href="/resources" className="text-link shrink-0 text-sm">
              Read the journal
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.08}>
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Newsletter />
    </main>
  )
}
