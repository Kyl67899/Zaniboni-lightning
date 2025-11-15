import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Zaniboni Lighting | Architectural Lighting Excellence",
  description:
    "Premium architectural lighting solutions. 100% independent, Made in the USA. We better the world by lighting it beautifully.",
  keywords:
    "architectural lighting, premium lighting, LED lighting, custom lighting, USA made lighting, commercial lighting",
  // icons: {
  //   icon: [
  //     {
  //       url: "",
  //       media: "(prefers-color-scheme: light)",
  //     },
  //     {
  //       url: "",
  //       media: "(prefers-color-scheme: dark)",
  //     },
  //     {
  //       url: "",
  //       type: "image/svg+xml",
  //     },
  //   ],
  //   apple: "/apple-icon.png",
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
