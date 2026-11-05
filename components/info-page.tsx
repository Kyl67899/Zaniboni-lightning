import type React from "react"
import { CtaBand } from "@/components/cta-band"
import { PageHero } from "@/components/page-hero"

/** Layout for the text-led pages: warranty, FAQs and the legal pages. */
export function InfoPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <main id="main">
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="prose-zl">{children}</div>
        </div>
      </section>
      <CtaBand />
    </main>
  )
}
