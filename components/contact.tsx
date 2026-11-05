"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const emptyForm = { name: "", email: "", phone: "", message: "", website: "" }

export function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const update = (field: keyof typeof emptyForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: data.message })
        setForm(emptyForm)
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
    <form onSubmit={handleSubmit} className="relative space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            className="h-12 bg-transparent"
            value={form.name}
            onChange={update("name")}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-12 bg-transparent"
            value={form.email}
            onChange={update("email")}
            disabled={isLoading}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          className="h-12 bg-transparent"
          value={form.phone}
          onChange={update("phone")}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          rows={6}
          className="min-h-44 bg-transparent"
          value={form.message}
          onChange={update("message")}
          disabled={isLoading}
          required
          maxLength={5000}
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={update("website")}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "Sending…" : "Send Message"}
        </Button>
        <p role="status" className={`text-sm ${status?.type === "error" ? "text-destructive" : "text-secondary"}`}>
          {status?.message}
        </p>
      </div>
    </form>
  )
}
