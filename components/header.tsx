"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Representatives", href: "/representatives" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "pt-2 sm:pt-3 md:pt-4" : "pt-0"}`}
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-background/80 backdrop-blur-lg shadow-lg rounded-xl sm:rounded-2xl border border-border/50"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 px-3 sm:px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-foreground">
                ZANIBONI
                <span className="block text-[10px] sm:text-xs font-sans font-normal tracking-widest text-muted-foreground">
                  LIGHTING
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Contact Us</span>
                  <span className="lg:hidden">Contact</span>
                </Link>
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
                <Link href="/products">
                  <span className="hidden lg:inline">View Collections</span>
                  <span className="lg:hidden">Products</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 px-4 space-y-4 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90" asChild>
                  <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                    View Collections
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
