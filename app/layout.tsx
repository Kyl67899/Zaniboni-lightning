import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MotionProvider } from "@/components/motion-provider"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@next/third-parties/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { site } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Architectural Lighting`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "architectural lighting",
    "LED downlights",
    "commercial lighting",
    "custom lighting",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/modern-architectural-lighting-in-luxury-commercial.jpg", width: 1024, height: 1024 }],
  },
  twitter: { card: "summary_large_image" },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone.schema,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.regionCode,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const analytics = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only z-60 bg-foreground px-4 py-3 text-sm text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        <Toaster theme="light" />
        <Analytics />
        <SpeedInsights />
        {analytics && <GoogleAnalytics gaId={analytics} />}
      </body>
    </html>
  )
}
