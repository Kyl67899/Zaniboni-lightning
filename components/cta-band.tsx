import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaBand({
  title = "Let’s light your next project",
  description = "Talk to our team or find your local representative for specification support and pricing.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <h2 className="heading max-w-2xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-75">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/85">
            <Link href="/contact">
              Contact Us
              <ArrowRight />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/40 bg-transparent text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-primary"
          >
            <Link href="/representatives">Find a Representative</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
