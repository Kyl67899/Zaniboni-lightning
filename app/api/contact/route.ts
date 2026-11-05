import { NextResponse } from "next/server"
import { z } from "zod"
import { contactFields, parseForm, SEND_FAILED_MESSAGE } from "@/lib/forms"
import { confirmationEmail, EMAIL_CONFIG, emailShell, escapeHtml, sendEmail } from "@/lib/resend"

const schema = z.object(contactFields)

export async function POST(request: Request) {
  const form = await parseForm(request, "contact", schema)
  if (!form.ok) return form.response

  const { name, email, phone, message } = form.data

  try {
    // Send the enquiry first: it's the email the business can't afford to lose.
    await sendEmail({
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: "New website enquiry",
      html: emailShell(`
        <h1 style="font-weight:400;font-size:24px;margin:0 0 16px">New website enquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `),
    })
  } catch (error) {
    console.error("Contact form: enquiry not sent:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ error: SEND_FAILED_MESSAGE }, { status: 502 })
  }

  // The enquiry has arrived, so a failed confirmation shouldn't show as an error.
  try {
    await sendEmail({
      to: email,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: "We've received your message",
      html: confirmationEmail(
        "Thank you for contacting us",
        "We've received your message and will get back to you as quickly as possible.",
      ),
    })
  } catch (error) {
    console.error("Contact form: confirmation not sent:", error instanceof Error ? error.message : "unknown error")
  }

  return NextResponse.json({ message: "Thank you. Your message has been sent." })
}
