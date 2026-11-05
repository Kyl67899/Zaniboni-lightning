"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const emptyForm = { name: "", email: "", phone: "", message: "", website: "" }

export function ContactSalesDialog({ productId, productName }: { productId: string; productName: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const update = (field: keyof typeof emptyForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) setStatus(null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId }),
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Request a Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-light">Request a quote</DialogTitle>
          <DialogDescription>
            Tell us about your project and we’ll get back to you about <strong>{productName}</strong> as quickly as we
            can.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative mt-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sales-name">Name</Label>
            <Input
              id="sales-name"
              autoComplete="name"
              className="h-11"
              value={form.name}
              onChange={update("name")}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales-email">Email</Label>
            <Input
              id="sales-email"
              type="email"
              autoComplete="email"
              className="h-11"
              value={form.email}
              onChange={update("email")}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales-phone">
              Phone <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="sales-phone"
              type="tel"
              autoComplete="tel"
              className="h-11"
              value={form.phone}
              onChange={update("phone")}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales-message">Project details</Label>
            <Textarea
              id="sales-message"
              placeholder="Quantity, timeline, configuration…"
              rows={4}
              className="min-h-28"
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

          <p role="status" className={`min-h-5 text-sm ${status?.type === "error" ? "text-destructive" : "text-secondary"}`}>
            {status?.message}
          </p>

          <Button type="submit" size="lg" disabled={isLoading} className="w-full">
            {isLoading ? "Sending…" : "Send Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
