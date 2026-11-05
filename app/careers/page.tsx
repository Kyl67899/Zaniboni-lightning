import Image from "next/image"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "Careers",
  "Join the team designing and building architectural lighting in Harborview, Oregon.",
  "/careers",
)

export default function CareersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Careers"
        title="Make things you’re proud of"
        description="We’re always glad to hear from designers, engineers and makers who care about doing careful work."
      />

      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src="/modern-manufacturing-facility-team-collaboration-w.jpg"
              alt="Team members working together in the facility"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Design, engineering and production all work in the same building here, so you’ll see how your work comes
                together and what happens to it next.
              </p>
              <p>
                We invest in training, and many of our team have learned new skills on the job. If you’re curious and
                take pride in your work, we’d like to talk.
              </p>
            </div>
            <Button asChild size="lg" className="mt-10">
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("Careers at Zaniboni Lighting")}`}>
                Get in touch about careers
              </a>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
