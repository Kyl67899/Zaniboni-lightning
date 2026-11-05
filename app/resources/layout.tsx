import type React from "react"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Journal",
  "Ideas and practical guidance on architectural lighting, from reading a spec sheet to designing for restaurants and offices.",
  "/resources",
)

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
