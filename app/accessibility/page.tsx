import { InfoPage } from "@/components/info-page"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "Accessibility",
  "Zaniboni Lighting's commitment to making this website accessible to everyone.",
  "/accessibility",
)

export default function AccessibilityPage() {
  return (
    <InfoPage
      eyebrow="Accessibility"
      title="Accessibility statement"
      description="We want everyone to be able to use this website."
    >
      <p>
        We work toward the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. This site is built with semantic
        structure, keyboard navigation, labelled forms and support for reduced-motion preferences.
      </p>
      <p>Accessibility is ongoing work, and some parts of the site may not yet meet every guideline.</p>

      <h2>Tell us about a problem</h2>
      <p>
        If you have trouble using any part of this site or need information in another format, please contact us. We’ll
        do our best to help.
      </p>
      <ul>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          Phone: <a href={site.phone.href}>{site.phone.display}</a>
        </li>
      </ul>
    </InfoPage>
  )
}
