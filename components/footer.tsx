"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { footerLinks, legalLinks, site } from "@/lib/site"

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="leading-none">
              <p className="font-serif text-3xl tracking-[0.12em]">ZANIBONI</p>
              <p className="mt-1.5 text-[10px] tracking-[0.42em] opacity-70">LIGHTING</p>
            </div>
            <address className="space-y-1 text-sm not-italic leading-relaxed opacity-75">
              <p>{site.address.street}</p>
              <p>
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <p className="pt-2">
                <a href={site.phone.href} className="hover:underline">
                  {site.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h2 className="eyebrow mb-5 font-sans opacity-60">{category}</h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm opacity-80 transition-opacity hover:opacity-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-xs opacity-70 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Concept site: all names, contact details and projects are fictional.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* <p>
            Developed by{" "}
            <a href="https://kylepprofile.dev" target="_blank" rel="noopener noreferrer" className="underline">
              Kyle Parsotan
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  )
}
