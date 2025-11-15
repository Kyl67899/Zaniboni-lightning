import { Lightbulb, Award, Leaf, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Lightbulb,
      title: "New Era Lighting Optics",
      description:
        "Revolutionary lens system delivering brighter, cleaner light without glare or bulk. Effortless lens swaps adapt any space in minutes.",
    },
    {
      icon: Award,
      title: "BABAA Compliant",
      description:
        "Proudly adheres to the Build America Buy America Act. Every step from design to shipping takes place in our Clearwater facility.",
    },
    {
      icon: Leaf,
      title: "Sustainable Manufacturing",
      description:
        "We source raw materials from Florida and neighboring states, supporting local economies and sustainable practices.",
    },
    {
      icon: Users,
      title: "Expert Craftsmanship",
      description:
        "Our team of engineers, CNC machinists, and welders create the highest quality lighting with cutting-edge technology.",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">Why Choose Zaniboni</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Redefining what's possible in architectural lighting with innovation, quality, and American craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-card hover:bg-accent/5 border border-border hover:border-accent/20 transition-all duration-300"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
