import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"

const facts = [
  { title: "Made in-house", text: "Designed, machined and assembled under one roof" },
  { title: "Configured to order", text: "Finishes, optics and sizes to suit your project" },
  { title: "10-year limited warranty", text: "On our standard product line" },
]

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-primary text-white">
      <Image
        src="/modern-architectural-lighting-in-luxury-commercial.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />

      <div className="shell relative pb-10 pt-36 md:pb-14">
        <Reveal>
          <p className="eyebrow mb-7 text-accent">Architectural Lighting</p>
          <h1 className="display max-w-4xl lg:text-8xl">Light, shaped with intention</h1>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/85">
              <Link href="/products">
                View Collections
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-white shadow-none hover:bg-white hover:text-foreground"
            >
              <Link href="/representatives">Find a Representative</Link>
            </Button>
          </div>
        </Reveal>

        <dl className="mt-14 grid gap-6 border-t border-white/25 pt-7 sm:grid-cols-3 md:mt-20">
          {facts.map((fact) => (
            <div key={fact.title}>
              <dt className="font-serif text-xl">{fact.title}</dt>
              <dd className="mt-1 text-sm text-white/70">{fact.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
