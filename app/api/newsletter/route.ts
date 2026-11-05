import { NextResponse } from "next/server"
import { z } from "zod"
import { emailField, parseForm } from "@/lib/forms"
import { EMAIL_CONFIG, emailShell, escapeHtml, sendEmail } from "@/lib/resend"
import { site } from "@/lib/site"

const schema = z.object({ email: emailField })

export async function POST(request: Request) {
  const form = await parseForm(request, "newsletter", schema)
  if (!form.ok) return form.response

  const { email } = form.data

  try {
    // No subscriber list exists yet, so this email is the only record of the signup.
    await sendEmail({
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: "New newsletter signup",
      html: emailShell(
        `<h1 style="font-weight:400;font-size:24px;margin:0 0 16px">New newsletter signup</h1><p>${escapeHtml(email)}</p>`,
      ),
    })
  } catch (error) {
    console.error("Newsletter: signup not sent:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json({ error: "We couldn't complete your signup. Please try again." }, { status: 502 })
  }

  try {
    await sendEmail({
      to: email,
      replyTo: EMAIL_CONFIG.replyTo,
      subject: "Welcome to Zaniboni Lighting",
      html: emailShell(`
        <h1 style="font-weight:400;font-size:26px;margin:0 0 16px">Thank you for subscribing</h1>
        <p>We'll share new products and ideas on lighting design from time to time.</p>
        <p style="font-size:14px;color:#666">Didn't sign up, or changed your mind? Email ${site.email} and we'll remove you.</p>
      `),
    })
  } catch (error) {
    console.error("Newsletter: welcome not sent:", error instanceof Error ? error.message : "unknown error")
  }

  return NextResponse.json({ message: "Thank you for subscribing." })
}
