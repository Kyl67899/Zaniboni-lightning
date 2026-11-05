import { InfoPage } from "@/components/info-page"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "Privacy Policy",
  "How Zaniboni Lighting collects and uses information through this website.",
  "/privacy",
)

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Legal" title="Privacy policy" description="How we handle information collected through this website.">
      <h2>Information you give us</h2>
      <p>
        When you use our contact, quote request or newsletter forms, we collect the details you enter, such as your
        name, email address, phone number and message. We use this to respond to you and, if you subscribe, to send you
        news about our products.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        We use Google Analytics, Vercel Web Analytics and Vercel Speed Insights to understand how the site is used and
        how well it performs. These services may collect information such as the pages you view, your device and browser
        type, and your approximate location. Google Analytics uses cookies to do this.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use service providers to run this site, including Vercel for hosting and analytics, Resend for sending email,
        and Google for analytics. We don’t sell your personal information. We
        may also disclose information where the law requires it.
      </p>

      <h2>Your choices</h2>
      <p>
        To ask about, correct or delete the information we hold about you, or to unsubscribe from our emails, write to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. You can also block or delete cookies in your browser settings.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode},{" "}
        {site.address.country}.
      </p>
    </InfoPage>
  )
}
