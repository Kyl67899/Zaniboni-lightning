"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: data.message })
        setEmail("")
      } else {
        setStatus({ type: "error", message: data.error })
      }
    } catch {
      setStatus({ type: "error", message: "Please check your connection and try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="border-t border-border">
      <div className="shell grid gap-8 py-16 md:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-light md:text-4xl">Light, considered</h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
            New products and ideas on lighting design, sent from time to time.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isLoading}
              className="h-12 flex-1 bg-transparent px-4"
            />
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <p
            role="status"
            className={`mt-3 min-h-5 text-sm ${status?.type === "error" ? "text-destructive" : "text-secondary"}`}
          >
            {status?.message}
          </p>
        </form>
      </div>
    </section>
  )
}
