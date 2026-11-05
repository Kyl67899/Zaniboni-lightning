import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "About",
  "A small team of designers, engineers and makers building architectural lighting in Harborview, Oregon.",
  "/about",
)

const quotes = [
  "My favorite part of the job is walking into a finished space and seeing something I helped build doing exactly what it was designed to do.",
  "Engineering and the shop floor sit about thirty feet apart, so when something can be better we just go and talk about it.",
  "Nobody here says ‘that’s not my department’. If a project needs something unusual, everyone gets involved in working it out.",
  "I started on the assembly line and now I help train new people. There’s a real sense that you can grow here.",
]

const people = [
  ["Elena Marchetti", "Chief Executive Officer"],
  ["Tomas Reyes", "Head of Design"],
  ["Priya Nair", "Director of Engineering"],
  ["Owen Calloway", "Vice President, Sales"],
  ["Hannah Lindqvist", "Head of People"],
  ["Marcus Bell", "Production Manager"],
  ["Sofia Duarte", "Account Manager, East"],
  ["Daniel Okafor", "Account Manager, Central"],
  ["Mei Tanaka", "Account Manager, West"],
  ["Ana Kowalski", "Product Development Engineer"],
  ["Luis Fontaine", "Mechanical Design Engineer"],
  ["Grace Whitfield", "Marketing Manager"],
]

const values = [
  ["Details first", "The best fixture is often the one you barely notice. We sweat the trim, the optic and the finish so the light gets the attention."],
  ["Made to last", "We build fixtures to be serviced rather than replaced, because good lighting should outlast the trends around it."],
  ["Honest advice", "If a simpler solution suits your project better, we’ll tell you. Long relationships matter more than one big order."],
]

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Good light changes how a space feels"
        description="We’re a small team of designers, engineers and makers who care about getting it right."
      />

      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/modern-manufacturing-facility-team-collaboration-w.jpg"
              alt="Team members working together in the manufacturing facility"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading">Our story</h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                We started with a simple frustration: too much architectural lighting asked designers to choose between
                how a fixture looks and how its light performs. So we began designing and making our own.
              </p>
              <p>
                Keeping design, engineering and production together means that a good idea can go from sketch to
                prototype quickly, and that the people making our fixtures can talk directly to the people who designed
                them.
              </p>
              <p className="font-serif text-2xl leading-snug text-foreground">
                The result is lighting that does its job beautifully, and then gets out of the way.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="shell">
          <h2 className="eyebrow font-sans text-accent">From our team</h2>
          <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {quotes.map((quote, index) => (
              <Reveal key={quote} delay={index * 0.06}>
                <blockquote className="font-serif text-2xl font-light leading-snug md:text-3xl">“{quote}”</blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-muted lg:order-2">
            <Image
              src="/modern-industrial-office-space-with-exposed-beams-.jpg"
              alt="Open office with exposed beams and glass walls"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading">Our studio</h2>
            <div className="mt-7 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                Our studio and workshop share a converted warehouse on the Harborview waterfront. Exposed beams and tall
                windows let us see how our fixtures behave alongside daylight, which is hard to judge in a lab.
              </p>
              <p>
                Every room doubles as a test space, with prototypes installed throughout. If something doesn’t work,
                we’re the first to find out.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-muted/60">
        <div className="shell">
          <h2 className="heading">Our people</h2>
          <ul className="mt-12 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {people.map(([name, role]) => (
              <li key={name} className="border-b border-border py-5">
                <p className="font-serif text-2xl">{name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="heading">What we believe</h2>
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {values.map(([title, text]) => (
              <li key={title} className="border-t border-foreground pt-6">
                <h3 className="text-3xl font-light">{title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-12">
            <Link href="/careers">
              Work with us
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
