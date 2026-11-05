import type { Metadata } from "next"
import { site } from "@/lib/site"

/** Page metadata with a canonical URL. Next.js would otherwise inherit the parent's canonical. */
export function pageMetadata(title: string, description: string, path: string, image?: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      ...(image ? { images: [{ url: image, width: 1024, height: 1024 }] } : {}),
    },
  }
}
