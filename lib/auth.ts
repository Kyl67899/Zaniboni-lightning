"use server"

import { cookies } from "next/headers"

// Simple password-based authentication (no database)
// In production, use environment variables for credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "Zaniboni2025!", // Change this to a secure password
}

const SESSION_COOKIE_NAME = "zaniboni_admin_session"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface Session {
  username: string
  expiresAt: number
}

export async function login(username: string, password: string) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Create session
    const session: Session = {
      username,
      expiresAt: Date.now() + SESSION_DURATION,
    }

    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION / 1000,
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid credentials" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
  return { success: true }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      await logout()
      return null
    }

    return session
  } catch {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}
