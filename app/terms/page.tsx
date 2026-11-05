import { InfoPage } from "@/components/info-page"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata("Terms of Use", "The terms that apply when you use the Zaniboni Lighting website.", "/terms")

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Legal" title="Terms of use" description="The terms that apply when you use this website.">
      <h2>Website content</h2>
      <p>
        The text, images and designs on this site belong to {site.name} or its licensors. You may view and share them for
        your own project or research, but please don’t reproduce them commercially without our permission.
      </p>

      <h2>Product information</h2>
      <p>
        We work to keep product information accurate, but descriptions, specifications, prices and images are for general
        guidance and may change. Please confirm details with us or your representative before specifying or ordering.
      </p>

      <h2>Liability</h2>
      <p>This site is provided “as is”. To the extent the law allows, we disclaim liability arising from its use.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </InfoPage>
  )
}
