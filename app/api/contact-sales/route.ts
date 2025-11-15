import { resend, EMAIL_CONFIG } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, productId, productName } = await request.json()

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
      subject: "Sales Inquiry Received - Zaniboni Lighting",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B7355; font-family: serif;">Thank You for Your Interest</h1>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to our sales team. We've received your inquiry${productName ? ` about <strong>${productName}</strong>` : ""} and will respond within 24 hours with pricing and availability.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Inquiry:</h3>
            ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ""}
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>Our sales team will provide you with:</p>
          <ul>
            <li>Detailed pricing and volume discounts</li>
            <li>Product specifications and technical data</li>
            <li>Lead times and availability</li>
            <li>Custom configuration options</li>
          </ul>

          <p>Need immediate assistance? Call us at +1 (800) 555-1234</p>

          <p style="margin-top: 30px;">Best regards,<br/>Zaniboni Lighting Sales Team</p>
        </div>
      `,
    })

    // Send notification to sales team
    await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.notificationEmail,
      replyTo: email,
      subject: `🔔 New Sales Inquiry from ${name}${productName ? ` - ${productName}` : ""}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Sales Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          ${productName ? `<p><strong>Product:</strong> ${productName} (ID: ${productId})</p>` : ""}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;">
            <strong>⚡ Action Required:</strong> Sales inquiry - Please respond within 24 hours
          </p>

          <p><em>Reply directly to this email to respond to the customer.</em></p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Sales inquiry sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Contact sales error:", error)
    return NextResponse.json({ error: "Failed to send inquiry. Please try again." }, { status: 500 })
  }
}
