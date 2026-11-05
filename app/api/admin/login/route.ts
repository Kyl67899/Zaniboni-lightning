import { NextResponse } from "next/server"
import { z } from "zod"
import {
  createSessionToken,
  credentialsMatch,
  isAuthConfigured,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth"
import { clientIp, isRateLimited } from "@/lib/rate-limit"

const schema = z.object({ username: z.string().max(200), password: z.string().max(200) })

export async function POST(request: Request) {
  if (isRateLimited(`login:${clientIp(request)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again in 15 minutes." }, { status: 429 })
  }

  if (!isAuthConfigured()) {
    console.error("Admin login: ADMIN_CREDENTIALS_USERNAME and ADMIN_CREDENTIALS_PASSWORD must be set")
    return NextResponse.json({ error: "Admin login isn't configured on this server." }, { status: 503 })
  }

  let parsed
  try {
    parsed = schema.safeParse(await request.json())
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 })

  const { username, password } = parsed.data
  if (!(await credentialsMatch(username, password))) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  })
  return response
}
