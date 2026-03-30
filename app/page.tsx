import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Features } from "@/components/features"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <Hero />
      <Features />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Newsletter />
      <Contact />
      {/* <Footer /> */}
    </main>
  )
}
