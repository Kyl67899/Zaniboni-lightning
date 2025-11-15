import { resend, EMAIL_CONFIG } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: "Welcome to Zaniboni Lighting",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B7355; font-family: serif;">Welcome to Zaniboni Lighting</h1>
          <p>Thank you for subscribing to our newsletter!</p>
          <p>You'll now receive the latest updates on:</p>
          <ul>
            <li>New product launches and collections</li>
            <li>Design inspiration and lighting trends</li>
            <li>Exclusive offers and promotions</li>
            <li>Industry insights and tips</li>
          </ul>
          <p style="margin-top: 30px;">We're excited to have you join our community of 5,000+ design professionals.</p>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            You can unsubscribe at any time by clicking the link in any of our emails.
          </p>
        </div>
      `,
    })

    // Send notification to admin
    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}
