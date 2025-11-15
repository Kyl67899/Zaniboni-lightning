import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Lightbulb, Factory, Users, Award, MapPin, Briefcase, ArrowRight, Building2, Zap, Shield } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Zaniboni Lighting",
  description:
    "Learn about Zaniboni Lighting's story, our team, and our commitment to delivering the finest lighting solutions with Italian culture and American manufacturing.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-balance">About Us</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-pretty px-4">
              We will always continue to raise the bar to design & deliver some of today's finest lighting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-4/5 rounded-2xl overflow-hidden">
                <img
                  src="/professional-business-team-portrait-lighting-compa.jpg"
                  alt="Zaniboni Lighting Founders"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 sm:w-48 sm:h-48 bg-primary/10 rounded-2xl -z-10" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Our Story</h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our lighting solutions are produced here in the USA, with our Italian culture of style and function,
                  bringing together a group of talented minds from around the world who love their craft, who value each
                  others' genius, and who enjoy a good laugh while sipping some of the finest espresso the world has to
                  offer.
                </p>
                <p>
                  More than that, we never lose sight of one thing: what is it that actually fuels our lighting
                  innovations and technological advances?
                </p>
                <p>
                  It is not the materials we source, nor the refinements we manufacture for a better, more efficient
                  lighting solution.
                </p>
                <p>
                  No. It is something that happens before all of that. It comes down to the minds and the energy put
                  into each and every step of our processes.
                </p>
                <p className="font-semibold text-foreground">In essence, what drives us?</p>
                <p>
                  It is our willingness to ask, "Why not?" and our culture of challenging the normal conventions of how
                  things get done in today's world.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    View Our Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Technology Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6">Modern Technology</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              Combining cutting-edge manufacturing with innovative lighting solutions to deliver unmatched quality and
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">LED Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                State-of-the-art LED technology providing energy-efficient, long-lasting illumination with superior
                color rendering.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Factory className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">CNC Precision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Computer-controlled machinery ensures every component is manufactured to exact specifications with
                micron-level accuracy.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Quality Control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rigorous testing protocols and quality assurance at every stage ensure only the finest products reach
                our customers.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Smart Controls</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrated dimming and control systems compatible with modern building automation and smart home
                platforms.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Certified Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                UL, ETL, and DLC certified products meeting the highest safety and performance standards in the
                industry.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Custom Solutions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced CAD design and rapid prototyping capabilities allow us to create bespoke lighting solutions for
                unique projects.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold">Careers</h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We design, manufacture and sell in the USA and abroad some of the best lighting in the world. We
                  recently added a division that complements our lighting products with innovative sound, video and air
                  quality solutions to improve indoor well-being.
                </p>
                <p>
                  We believe that each one of us can make a difference, and that the passion and pride with which we
                  approach our work every day brings about an infectious vibe of fun and excitement.
                </p>
                <p>
                  We're seeking like-minded individuals that want to contribute to our culture of confident, respectful
                  and team spirited people focused on innovation and growth.
                </p>
                <p className="font-semibold text-foreground">For available positions, we'd love to hear from you.</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="#contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/modern-manufacturing-facility-team-collaboration-w.jpg"
                  alt="Manufacturing facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonial */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="text-center space-y-8">
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-balance">
                      "I enjoy my work at Zaniboni because I love seeing products I made go into iconic buildings that
                      are recognized around the world."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">Michael Torres</p>
                      <p className="text-muted-foreground">Senior Manufacturing Specialist</p>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="text-center space-y-8">
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-balance">
                      "The culture at Zaniboni is unlike anywhere I've worked before. Everyone is passionate about
                      quality and innovation, and that shows in every product we create."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">Sarah Chen</p>
                      <p className="text-muted-foreground">Design Engineer</p>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="text-center space-y-8">
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-balance">
                      "Working with a team that values both Italian craftsmanship and modern technology creates the
                      perfect environment for pushing boundaries in lighting design."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">David Kowalski</p>
                      <p className="text-muted-foreground">Quality Control Manager</p>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="text-center space-y-8">
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-balance">
                      "From day one, I felt welcomed and valued. The collaborative spirit here makes coming to work
                      something I genuinely look forward to every day."
                    </blockquote>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">Jennifer Rodriguez</p>
                      <p className="text-muted-foreground">Operations Coordinator</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Our Offices Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/modern-industrial-office-space-with-exposed-beams-.jpg"
                  alt="Zaniboni Lighting Office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-2xl -z-10" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold">Our Offices</h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Zaniboni Lighting's offices are located in a local piece of architectural history, the city's original
                  police and fire station. Removing all the stucco, false ceilings and stripping the building back to
                  its hardware, revealed beautiful brick exterior and wood floors and some fun, interesting discoveries
                  such as the original fire pole locations and a jail cell, which now holds a ping-pong table off of our
                  break room.
                </p>
                <p>
                  With the beams, pipes and ductwork exposed, clear frameless glass walls were installed to give the
                  space a modern industrial look. It was finished off with small accents to honor its history, art
                  pieces collected from around the world and Zaniboni Lighting's world class lighting installed
                  throughout.
                </p>
                <p>
                  The end result is a fun, open and aesthetically inviting workplace for our employees, designed to
                  inspire creativity and productivity.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Historic Downtown Location</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our People</h2>
            <p className="text-lg text-muted-foreground">
              Meet the talented team behind Zaniboni Lighting's innovative designs and exceptional quality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Marco Zaniboni", role: "Founder & CEO", image: "executive team leader portrait professional" },
              {
                name: "Sofia Rossi",
                role: "Chief Design Officer",
                image: "female designer creative professional portrait",
              },
              {
                name: "James Chen",
                role: "Head of Engineering",
                image: "male engineer technical professional portrait",
              },
              {
                name: "Isabella Martinez",
                role: "VP of Operations",
                image: "female operations executive professional portrait",
              },
            ].map((person, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-muted">
                  <img
                    src={`/.jpg?height=800&width=600&query=${person.image}`}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{person.name}</h3>
                  <p className="text-muted-foreground">{person.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Ready to Work With Us?</h2>
            <p className="text-xl text-primary-foreground/90">
              Whether you're looking for career opportunities or want to learn more about our lighting solutions, we'd
              love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
