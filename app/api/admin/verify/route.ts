import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { session } = await request.json()

    if (!session || !session.username || !session.expiresAt) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    return NextResponse.json({ valid: true, username: session.username })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
