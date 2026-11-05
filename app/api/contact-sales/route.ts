import { NextResponse } from "next/server"
import { z } from "zod"
import { products } from "@/data/products"
import { contactFields, parseForm, SEND_FAILED_MESSAGE } from "@/lib/forms"
import { confirmationEmail, EMAIL_CONFIG, emailShell, escapeHtml, sendEmail } from "@/lib/resend"

const schema = z.object({ ...contactFields, productId: z.string().max(20).optional() })

export async function POST(request: Request) {
  const form = await parseForm(request, "contact-sales", schema)
  if (!form.ok) return form.response

  const { name, email, phone, message, productId } = form.data
  // Look the name up rather than trusting what the browser sent.
  const productName = products.find((p) => p.id === productId)?.name

  try {
    await sendEmail({
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: productName ? `Quote request: ${productName}` : "New quote request",
      html: emailShell(`
        <h1 style="font-weight:400;font-size:24px;margin:0 0 16px">New quote request</h1>
        <p><strong>Product:</strong> ${escapeHtml(productName ?? "Not specified")}<br/>
        <strong>Name:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `),
    })
  } catch (error) {
    console.error("Quote form: enquiry not sent:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ error: SEND_FAILED_MESSAGE }, { status: 502 })
  }

  try {
    await sendEmail({
      to: email,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: "We've received your quote request",
      html: confirmationEmail(
        "Thank you for your interest",
        "We've received your request and our team will get back to you as quickly as possible.",
      ),
    })
  } catch (error) {
    console.error("Quote form: confirmation not sent:", error instanceof Error ? error.message : "unknown error")
  }

  return NextResponse.json({ message: "Thank you. Your request has been sent." })
}
