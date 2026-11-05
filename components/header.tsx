"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navItems, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Covers the browser back button, which doesn't go through the links' onClick.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Rotating a phone can cross the breakpoint. Without this the menu hides but the page stays locked.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false)
    }
    desktop.addEventListener("change", onChange)
    return () => desktop.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isMenuOpen])

  if (pathname.startsWith("/admin")) return null

  // Only the home page has a dark hero for the header to sit transparently on.
  const overHero = pathname === "/" && !isScrolled && !isMenuOpen
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        overHero ? "bg-transparent text-white" : "border-b border-border bg-background/95 text-foreground backdrop-blur",
      )}
    >
      <div className="shell flex h-(--nav-height) items-center justify-between gap-4">
        <Link href="/" onClick={closeMenu} aria-label={`${site.name}, home`} className="shrink-0 leading-none">
          <span className="block font-serif text-xl tracking-[0.12em] short:text-lg lg:text-2xl">ZANIBONI</span>
          <span className="mt-1 block text-[8px] tracking-[0.42em] opacity-80 short:mt-0.5 lg:text-[9px]">LIGHTING</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-9">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="group whitespace-nowrap py-2 text-[13px] tracking-wide short:py-1"
              >
                <span
                  className={cn(
                    "border-b pb-1 transition-colors",
                    isActive ? "border-current" : "border-transparent group-hover:border-current",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden shrink-0 md:block">
          <Button
            asChild
            variant="outline"
            className={cn(
              "h-9 bg-transparent px-4 text-[13px] font-normal tracking-wide shadow-none lg:h-10 lg:px-6",
              overHero
                ? "border-white/60 text-white hover:bg-white hover:text-foreground"
                : "border-foreground hover:bg-foreground hover:text-background",
            )}
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2.5 flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex h-[calc(100svh-var(--nav-height))] flex-col justify-between gap-6 overflow-y-auto overscroll-contain border-t border-border bg-background px-5 py-6 animate-in fade-in duration-300 short:py-3 sm:px-8 md:hidden"
        >
          <nav aria-label="Mobile" className="grid gap-x-8 short:grid-cols-2">
            {[...navItems, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
                className="border-b border-border py-4 font-serif text-3xl font-light short:py-2 short:text-xl [@media(min-height:501px)_and_(max-height:640px)]:py-2.5 [@media(min-height:501px)_and_(max-height:640px)]:text-2xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
            <a href={site.phone.href} className="py-2">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="break-all py-2">
              {site.email}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
