import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"

export async function GET() {
  const cookieStore = await cookies()
  const session = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)

  if (!session) return NextResponse.json({ valid: false }, { status: 401 })
  return NextResponse.json({ valid: true, username: session.username })
}
