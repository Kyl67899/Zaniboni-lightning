import { ContactForm } from "@/components/contact"
import { PageHero } from "@/components/page-hero"
import { pageMetadata } from "@/lib/metadata"
import { directLines, site } from "@/lib/site"

export const metadata = pageMetadata(
  "Contact",
  "Contact Zaniboni Lighting for project enquiries, specifications and technical support.",
  "/contact",
)

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your project"
        description="Write to us and we’ll get back to you as quickly as possible, or reach the right person directly below."
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <h2 className="heading">Write to us</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="eyebrow font-sans text-muted-foreground">Headquarters</h2>
              <address className="mt-4 font-serif text-2xl not-italic leading-snug">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
                <br />
                {site.address.country}
              </address>
            </div>
            <div>
              <h2 className="eyebrow font-sans text-muted-foreground">General</h2>
              <div className="mt-4 space-y-1 text-[15px]">
                <a href={site.phone.href} className="text-link block w-fit">
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email}`} className="text-link block w-fit break-all">
                  {site.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-muted/60">
        <div className="shell">
          <h2 className="heading">Direct lines</h2>
          <ul className="mt-12 grid gap-x-10 border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {directLines.map((line) => (
              <li key={line.label} className="border-b border-border py-6">
                <p className="font-serif text-2xl leading-snug">{line.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a href={`${site.phone.href},${line.ext}`} className="hover:text-foreground">
                    {site.phone.display} ext. {line.ext}
                  </a>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <a href={`mailto:${line.email}`} className="break-all hover:text-foreground">
                    {line.email}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
