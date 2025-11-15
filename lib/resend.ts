import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set")
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
export const EMAIL_CONFIG = {
  from: "Zaniboni Lighting <noreply@zanibonilighting.com>",
  replyTo: "shuttle876@gmail.com",
  // Update this to your actual email where you want to receive notifications
  notificationEmail: "shuttle876@gmail.com",
}
