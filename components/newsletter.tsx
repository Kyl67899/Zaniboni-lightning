"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Successfully subscribed!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
      // Clear message after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
    <section className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-balance">Stay Illuminated</h2>
          <p className="text-lg opacity-90 mb-8 text-pretty">
            Subscribe to our newsletter for the latest product launches, design inspiration, and industry insights
            delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="flex-1 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 shrink-0 bg-transparent"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
                status === "success" ? "bg-green-500/20 text-green-100" : "bg-red-500/20 text-red-100"
              }`}
            >
              {status === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span>{message}</span>
            </div>
          )}

          <p className="text-sm opacity-70 mt-4">Join 5,000+ design professionals. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
