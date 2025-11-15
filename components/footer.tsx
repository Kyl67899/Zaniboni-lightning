import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Products: ["Linear Pendants", "Recessed Lighting", "Track Systems", "Wall Sconces", "Custom Solutions"],
    Company: ["About Us", "Manufacturing", "Sustainability", "Careers", "Contact"],
    Resources: ["Product Catalog", "Case Studies", "Technical Specs", "Installation Guides", "Warranty"],
    Support: ["FAQs", "Shipping", "Returns", "Product Care", "Contact Support"],
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-serif font-bold tracking-tight mb-4">
              ZANIBONI
              <span className="block text-xs font-sans font-normal tracking-widest opacity-80">LIGHTING</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Premium architectural lighting solutions. Made in the USA.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href={`/${link}`} className="text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm opacity-80">
            <div className="text-center md:text-left">© 2025 Zaniboni Lighting. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="/privacy" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="/term-of-service" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                Terms of Service
              </a>
              <a href="/accessibility" className="hover:opacity-100 transition-opacity whitespace-nowrap">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
