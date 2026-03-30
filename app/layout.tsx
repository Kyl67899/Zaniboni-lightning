import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { GoogleAnalytics } from "@next/third-parties/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Zaniboni Lighting | Architectural Lighting Excellence",
  description:
    "Premium architectural lighting solutions. 100% independent, Made in the USA. We better the world by lighting it beautifully.",
  keywords:
    "architectural lighting, premium lighting, LED lighting, custom lighting, USA made lighting, commercial lighting",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const analytics = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-NY8HJY8XZC';

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Analytics />
        <Footer />
        <SpeedInsights />
        <GoogleAnalytics gaId={analytics} />
      </body>
    </html>
  )
}
