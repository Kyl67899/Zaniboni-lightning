"use client"

import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The quality and precision of Zaniboni lighting fixtures transformed our retail space. Their attention to detail is unmatched.",
      author: "Sarah Mitchell",
      role: "Lead Architect",
      company: "Mitchell Design Studio",
      rating: 5,
    },
    {
      quote:
        "Working with Zaniboni has been exceptional. Their Made in USA commitment and sustainable practices align perfectly with our values.",
      author: "David Chen",
      role: "Project Manager",
      company: "Urban Development Corp",
      rating: 5,
    },
    {
      quote:
        "The new era optics technology is revolutionary. We've seen dramatic improvements in both aesthetics and energy efficiency.",
      author: "Jennifer Rodriguez",
      role: "Interior Designer",
      company: "Rodriguez & Associates",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">
            See what architects, designers, and builders say about our lighting solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-sm sm:text-base text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
