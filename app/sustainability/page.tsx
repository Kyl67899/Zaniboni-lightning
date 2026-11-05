import Image from "next/image"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Sustainability",
  "How Zaniboni Lighting thinks about materials, energy, longevity and waste.",
  "/sustainability",
)

const commitments = [
  {
    title: "Efficient by design",
    text: "We focus on delivered light, not just rated output, so that less energy is needed to light a space well.",
  },
  {
    title: "Built to be serviced",
    text: "Drivers and light engines can be reached and replaced, which keeps a fixture in use for longer.",
  },
  {
    title: "Durable materials",
    text: "We favor metals that can be recycled at the end of a fixture’s life and finishes that hold up over time.",
  },
  {
    title: "Less waste",
    text: "Making parts in-house lets us reuse offcuts and order only what we need.",
  },
  {
    title: "Simpler packaging",
    text: "We use recyclable cardboard wherever we can and keep packing materials to the minimum needed for safe delivery.",
  },
  {
    title: "Light where it’s needed",
    text: "Good optics and controls keep light on the task and off the night sky, reducing energy use and light pollution.",
  },
]

export default function SustainabilityPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Sustainability"
        title="Better lighting, made more responsibly"
        description="The most sustainable fixture is one that performs well for a long time. That idea shapes how we design and build."
      />

      <section className="relative aspect-[16/9] max-h-[70svh] w-full overflow-hidden bg-muted md:aspect-[21/9]">
        <Image
          src="/quality-control-lighting-fixtures.jpg"
          alt="Finished lighting fixtures being inspected"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="section">
        <div className="shell">
          <ul className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item) => (
              <li key={item.title} className="border-t border-foreground pt-6">
                <h2 className="text-3xl font-light">{item.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
