"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Representatives", href: "/representatives" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      {/* Floating / Full Width Wrapper */}
      <motion.div
        initial={false}
        animate={isScrolled ? "floating" : "full"}
        variants={{
          full: {
            width: "100%",
            borderRadius: 0,
            marginTop: 0,
          },
          floating: {
            width: "90%",
            borderRadius: 9999,
            marginTop: 16,
          },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-xl shadow-xl border border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
                ZANIBONI
                <span className="block text-[10px] sm:text-xs tracking-widest opacity-70">
                  LIGHTING
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90" asChild>
                <Link href="/products">Products</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden w-full bg-background border-t border-border shadow-lg rounded-b-2xl"
            >
              <div className="px-6 py-6 space-y-5">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-base font-medium text-foreground/80 hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                  <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                      View Products
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
