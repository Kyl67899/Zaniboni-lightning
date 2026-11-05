import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Page not found", robots: { index: false } }

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center pb-20 pt-32">
      <div className="shell">
        <p className="eyebrow text-secondary">404</p>
        <h1 className="display mt-6 max-w-3xl">We couldn’t find that page</h1>
        <p className="lede mt-6 max-w-xl">It may have moved, or the link may be out of date.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent shadow-none">
            <Link href="/products">View products</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
