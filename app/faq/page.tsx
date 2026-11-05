import Link from "next/link"
import { InfoPage } from "@/components/info-page"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "FAQs",
  "Answers to common questions about Zaniboni Lighting products, pricing, lead times, warranty and support.",
  "/faq",
)

export default function FaqPage() {
  return (
    <InfoPage eyebrow="Support" title="Frequently asked questions">
      <h2>How do I get a project quote?</h2>
      <p>
        Pricing varies with quantity and configuration, so we’ll quote it for your project. Contact your{" "}
        <Link href="/representatives">local representative</Link> or <Link href="/contact">get in touch with us</Link>.
      </p>

      <h2>Where are your products made?</h2>
      <p>
        We design, machine, finish and assemble our fixtures in-house at our workshop in {site.address.city},{" "}
        {site.address.region}.
      </p>

      <h2>How long does an order take?</h2>
      <p>Lead times depend on the size and configuration of your order. Your representative can confirm them for you.</p>

      <h2>Can you customize a fixture?</h2>
      <p>
        Because we design and manufacture in-house, our team can discuss custom configurations for your project.{" "}
        <Link href="/contact">Tell us what you need</Link>.
      </p>

      <h2>What warranty do you offer?</h2>
      <p>
        A 10-year limited warranty on our standard product line and a 5-year limited warranty on custom products.{" "}
        <Link href="/warranty">Read the warranty details</Link>.
      </p>

      <h2>Who do I contact for technical support?</h2>
      <p>
        Call Technical Support on <a href={`${site.phone.href},300`}>{site.phone.display} ext. 300</a>.
      </p>
    </InfoPage>
  )
}
