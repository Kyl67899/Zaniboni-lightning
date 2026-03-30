import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageSquare, Briefcase, Users } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us - Zaniboni Lighting",
  description:
    "Get in touch with Zaniboni Lighting. Contact our team for project inquiries, sales support, or general questions. We're here to help.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Get In Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-balance">Contact Us</h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty px-4">
              Have questions about our lighting solutions? Our team is ready to help bring your vision to light.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">General Inquiries</h3>
                <p className="text-sm text-muted-foreground mb-4">Questions about our products or services</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:info@zanibonilighting.com">Email Us</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Sales & Projects</h3>
                <p className="text-sm text-muted-foreground mb-4">Discuss your commercial or residential project</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:sales@zanibonilighting.com">Contact Sales</a>
                </Button>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Need help with installation or specifications</p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:support@zanibonilighting.com">Get Support</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href="tel:+18005551234" className="text-muted-foreground hover:text-foreground transition-colors">
                  +1 (800) 555-1234
                </a>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:info@zanibonilighting.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@zanibonilighting.com
                </a>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">
                  123 Main Street
                  <br />
                  Clearwater, FL 33756
                </p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-muted-foreground text-sm">
                  Mon-Fri: 8AM-6PM
                  <br />
                  Sat: 9AM-2PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form */}
      <Contact />

      {/* Map Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-3 sm:mb-4">Visit Our Showroom</h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4">
                Schedule an appointment to see our lighting collections in person
              </p>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.8906397454825!2d-82.8001364!3d27.9658533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2eae0ce7a4f13%3A0x3c8c6c0a3e9f8d8a!2sClearwater%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">Explore Our Products</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              Browse our complete collection of architectural lighting solutions
            </p>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
