import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

/** Access is enforced by proxy.ts before any of these pages render. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main id="main">{children}</main>
}
