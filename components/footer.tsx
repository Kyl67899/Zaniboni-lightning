"use client";

import Link from "next/link";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";

export function Footer() {
  const footerLinks = {
    Products: [
      "Linear Pendants",
      "Recessed Lighting",
      "Track Systems",
      "Wall Sconces",
      "Custom Solutions",
    ],
    Company: ["About Us", "Manufacturing", "Sustainability", "Careers", "Contact"],
    Resources: [
      "Product Catalog",
      "Case Studies",
      "Technical Specs",
      "Installation Guides",
      "Warranty",
    ],
    Support: ["FAQs", "Shipping", "Returns", "Product Care", "Contact Support"],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const icons = [BsFacebook, BsInstagram, BsLinkedin, BsTwitter];

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20"
      >
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand */}
          <motion.div variants={item} className="lg:col-span-1 space-y-5">
            <div>
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                ZANIBONI
              </h2>
              <span className="block text-xs tracking-[0.3em] opacity-70">
                LIGHTING
              </span>
            </div>

            <p className="text-sm opacity-80 leading-relaxed max-w-xs">
              Premium architectural lighting solutions crafted with precision. Proudly made in the USA.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {icons.map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={item}>
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 opacity-90">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\\s+/g, "-")}`}
                      className="text-sm opacity-70 hover:opacity-100 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div variants={item} className="my-10 border-t border-primary-foreground/20" />

        {/* Bottom Section */}
        <motion.div
          variants={item}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm opacity-80"
        >
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Zaniboni Lighting. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:opacity-100 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:opacity-100 transition">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:opacity-100 transition">
              Accessibility
            </Link>
          </div>

          <p className="text-center md:text-right">
            Developed by{" "}
            <Link
              href="https://kylepprofile.dev"
              className="underline hover:opacity-100 hover:underline-offset-3 transition"
            >
              Kyle Parsotan
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
