import { Resend } from "resend"
import { site } from "@/lib/site"

// Where enquiries and replies are delivered. Set CONTACT_NOTIFICATION_EMAIL to change it.
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL

export const EMAIL_CONFIG = {
  // Resend's shared test sender only delivers to the Resend account's own address. Set EMAIL_FROM to a domain you own.
  from: process.env.EMAIL_FROM || "Zaniboni Lighting <onboarding@resend.dev>",
  replyTo: notificationEmail,
  notificationEmail,
}

let client: Resend | null = null

function getClient() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set")
  client ??= new Resend(process.env.RESEND_API_KEY)
  return client
}

/**
 * Resend reports failures in the returned `error` instead of throwing, so this
 * turns them into exceptions. Otherwise a failed send looks like a success.
 */
export async function sendEmail(options: { to: string; subject: string; html: string; replyTo?: string }) {
  const { data, error } = await getClient().emails.send({ from: EMAIL_CONFIG.from, ...options })
  if (error) throw new Error(`Resend rejected the email: ${error.name}`)
  return data
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Wraps trusted markup. Escape anything a visitor typed before passing it in. */
export function emailShell(body: string) {
  return `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;color:#1f1b16;line-height:1.6">
  <p style="letter-spacing:.2em;font-size:13px;margin:0 0 28px">ZANIBONI LIGHTING</p>
  ${body}
  <p style="margin-top:36px;padding-top:18px;border-top:1px solid #ddd;font-size:13px;color:#666">
    ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}<br/>
    ${site.phone.display} &middot; ${site.email}
  </p>
</div>`
}

/** Confirmation sent to the visitor. Contains no visitor text, so the form can't be used to send spam. */
export function confirmationEmail(heading: string, message: string) {
  return emailShell(`<h1 style="font-weight:400;font-size:26px;margin:0 0 16px">${heading}</h1><p>${message}</p>`)
}
