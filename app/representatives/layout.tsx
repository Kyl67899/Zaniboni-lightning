import type React from "react"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Find a Representative",
  "Find your local Zaniboni Lighting representative in the United States, Canada, Puerto Rico and internationally.",
  "/representatives",
)

export default function RepresentativesLayout({ children }: { children: React.ReactNode }) {
  return children
}
