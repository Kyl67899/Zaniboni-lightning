import Image from "next/image"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Manufacturing",
  "An inside look at how Zaniboni Lighting designs, machines, finishes and assembles fixtures in-house.",
  "/manufacturing",
)

const stages = [
  {
    title: "Design and engineering",
    text: "Every fixture starts with how the light should behave. Our designers and engineers work side by side, from the first sketch to the finished drawings.",
  },
  {
    title: "Machining",
    text: "Computer-controlled mills and lathes turn those drawings into the precise parts that make up each fixture, with tight tolerances you can feel in the finished product.",
    image: "/cnc-machining-manufacturing-process.jpg",
    alt: "CNC machine cutting a metal component",
  },
  {
    title: "Welding",
    text: "Experienced welders join housings and frames by hand where it matters, so that seams stay clean and structures stay strong.",
    image: "/precision-welding-industrial-process.jpg",
    alt: "Welder joining a metal housing",
  },
  {
    title: "Finishing",
    text: "Each part is cleaned, coated and cured in-house, which lets us keep close control over colour and durability.",
  },
  {
    title: "Assembly",
    text: "Trained assemblers bring together the electronics, optics and housings, checking the fit of every part as they go.",
    image: "/quality-control-lighting-fixtures.jpg",
    alt: "Finished lighting fixtures being inspected",
  },
  {
    title: "Testing",
    text: "Every fixture is powered up and inspected before it leaves us, so problems get caught here and not on your job site.",
  },
  {
    title: "Packing and shipping",
    text: "Fixtures are carefully packed for the journey and labelled so that they’re easy to identify when they reach your site.",
  },
]

export default function ManufacturingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Manufacturing"
        title="Made in-house, from start to finish"
        description="Keeping every step under one roof gives us close control over quality, and makes it easier to adapt a fixture to your project."
      />

      <section className="relative aspect-[16/9] max-h-[80svh] w-full overflow-hidden bg-muted md:aspect-[21/9]">
        <Image
          src="/modern-manufacturing-facility-team-collaboration-w.jpg"
          alt="Team members collaborating on the manufacturing floor"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="heading">Inside our workshop</h2>
          <ol className="mt-14 border-t border-border">
            {stages.map((stage, index) => (
              <li key={stage.title} className="border-b border-border py-10 md:py-14">
                <Reveal className="grid gap-6 md:grid-cols-[5rem_1fr_1.4fr] md:gap-10">
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl font-light md:text-4xl">{stage.title}</h3>
                  <div>
                    <p className="max-w-xl leading-relaxed text-muted-foreground">{stage.text}</p>
                    {stage.image && (
                      <div className="relative mt-6 aspect-[3/2] max-w-xl overflow-hidden bg-muted">
                        <Image
                          src={stage.image}
                          alt={stage.alt ?? ""}
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
