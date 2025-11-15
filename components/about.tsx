import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance">Made in USA with Pride</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By selecting the best engineers, CNC machinists, and welders and equipping them with the latest tools and
              technology, we create the highest quality lighting for our customers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our cutting-edge computer-controlled machinery and high-precision welding equipment to extensive
              training and apprenticing for all electronic and mechanical assemblers, we are able to create the highest
              quality lighting.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                Our Story
              </Button>
              <Button size="lg" variant="outline">
                Manufacturing Process
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/cnc-machining-manufacturing-process.jpg"
                  alt="Manufacturing process"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/american-flag-manufacturing-facility.jpg"
                  alt="American manufacturing"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/precision-welding-industrial-process.jpg"
                  alt="Welding process"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/quality-control-lighting-fixtures.jpg"
                  alt="Quality control"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
