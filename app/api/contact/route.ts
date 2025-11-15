import { resend, EMAIL_CONFIG } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: "We've Received Your Message - Zaniboni Lighting",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B7355; font-family: serif;">Thank You for Contacting Us</h1>
          <p>Hi ${name},</p>
          <p>We've received your message and our team will get back to you within 1-2 business days.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Browse our <a href="https://zanibonilighting.com/products">product collections</a></li>
            <li>Call us at +1 (800) 555-1234</li>
            <li>Email us at shuttle876@gmail.com</li>
          </ul>

          <p style="margin-top: 30px;">Best regards,<br/>The Zaniboni Lighting Team</p>
        </div>
      `,
    })

    // Send notification email to business
    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p><em>Reply directly to this email to respond to the customer.</em></p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
