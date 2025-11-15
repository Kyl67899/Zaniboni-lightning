import { NextResponse } from "next/server"

// Simple password-based authentication (no database)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Zaniboni2025!", // Change this to a secure password
}

const SESSION_COOKIE_NAME = "zaniboni_admin_session"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    console.log(" Login attempt:", { username, passwordLength: password?.length })

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Create session
      const session = {
        username,
        expiresAt: Date.now() + SESSION_DURATION,
      }

      console.log(" Login successful, setting cookie")

      const response = NextResponse.json({ 
        success: true,
        session: {
          username,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        }
      })
      
      // Removed cookie setting as per updates

      return response
    }

    console.log(" Login failed: Invalid credentials")
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error(" Login error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
