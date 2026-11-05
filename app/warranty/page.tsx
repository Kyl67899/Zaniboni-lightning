import Link from "next/link"
import { InfoPage } from "@/components/info-page"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "Warranty",
  "A 10-year limited warranty on standard products and a 5-year limited warranty on custom products.",
  "/warranty",
)

const exclusions = [
  "Damage caused by incorrect installation or use",
  "Products that have been modified or repaired by anyone we haven’t authorized",
  "Interior fixtures installed outdoors or in wet locations",
  "Normal wear, and damage caused by accidents or severe weather",
  "Consumable items such as fuses",
]

export default function WarrantyPage() {
  return (
    <InfoPage
      eyebrow="Warranty"
      title="Our warranty"
      description="A 10-year limited warranty on our standard product line, and a 5-year limited warranty on custom products."
    >
      <h2>What’s covered</h2>
      <p>
        The warranty starts on the date your order ships. If a fixture or component fails during normal use within the
        warranty period, we’ll repair or replace it at no charge and cover the cost of shipping.
      </p>

      <h2>What’s not covered</h2>
      <ul>
        {exclusions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Making a claim</h2>
      <p>
        Contact Technical Support on <a href={`${site.phone.href},300`}>{site.phone.display} ext. 300</a>, or{" "}
        <Link href="/contact">send us a message</Link>.
      </p>
    </InfoPage>
  )
}
