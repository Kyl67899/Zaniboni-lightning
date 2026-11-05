import type React from "react"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Products",
  "Architectural lighting for commercial, retail, hospitality and residential projects.",
  "/products",
)

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
