import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow all admin routes to pass through
  // Authentication is now handled client-side with localStorage
  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
