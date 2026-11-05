import { NextResponse } from "next/server"
import { z } from "zod"
import { clientIp, isRateLimited } from "@/lib/rate-limit"
import { site } from "@/lib/site"

const WINDOW_MS = 10 * 60 * 1000
const MAX_SUBMISSIONS = 5

export const SEND_FAILED_MESSAGE = `We couldn't send your message. Please try again, or call us on ${site.phone.display}.`

type ParsedForm<T> = { ok: true; data: T } | { ok: false; response: NextResponse }

/**
 * Shared checks for the public forms: rate limit, JSON parsing, the hidden
 * honeypot field, then schema validation.
 */
export async function parseForm<T extends z.ZodType>(
  request: Request,
  scope: string,
  schema: T,
): Promise<ParsedForm<z.infer<T>>> {
  if (isRateLimited(`${scope}:${clientIp(request)}`, MAX_SUBMISSIONS, WINDOW_MS)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Too many submissions. Please try again shortly." }, { status: 429 }),
    }
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Invalid request." }, { status: 400 }) }
  }

  // Bots fill in every field. Report success so they don't retry, but send nothing.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return { ok: false, response: NextResponse.json({ message: "Thank you." }, { status: 200 }) }
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Please check the form and try again."
    return { ok: false, response: NextResponse.json({ error: message }, { status: 400 }) }
  }

  return { ok: true, data: result.data }
}

export const emailField = z
  .string({ error: "A valid email is required." })
  .trim()
  .max(254, { error: "A valid email is required." })
  .pipe(z.email({ error: "A valid email is required." }))

export const contactFields = {
  name: z.string({ error: "Your name is required." }).trim().min(1, { error: "Your name is required." }).max(120),
  email: emailField,
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string({ error: "A message is required." })
    .trim()
    .min(1, { error: "A message is required." })
    .max(5000, { error: "Please keep your message under 5,000 characters." }),
}
