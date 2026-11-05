"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main" className="flex min-h-svh items-center pb-20 pt-32">
      <div className="shell">
        <p className="eyebrow text-secondary">Something went wrong</p>
        <h1 className="display mt-6 max-w-3xl">This page didn’t load properly</h1>
        <p className="lede mt-6 max-w-xl">
          Please try again. If it keeps happening, call us on{" "}
          <a href={site.phone.href} className="text-link">
            {site.phone.display}
          </a>
          .
        </p>
        <Button size="lg" className="mt-10" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  )
}
