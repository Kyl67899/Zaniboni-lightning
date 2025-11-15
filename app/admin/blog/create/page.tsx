"use client"

import { BlogPostEditor } from "@/components/admin/blog-post-editor"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export default function CreateBlogPostPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      console.log(" Checking authentication for create page")
      const token = localStorage.getItem("admin_token")
      const sessionExpiry = localStorage.getItem("admin_session_expiry")

      console.log(" Token exists:", !!token)
      console.log(" Session expiry:", sessionExpiry)

      if (!token || !sessionExpiry) {
        console.log(" No valid session, redirecting to login")
        router.push("/admin/login")
        return
      }

      if (Date.now() > parseInt(sessionExpiry)) {
        console.log(" Session expired, redirecting to login")
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_session_expiry")
        router.push("/admin/login")
        return
      }

      console.log(" Authentication successful")
      setIsAuthenticated(true)
      setIsChecking(false)
    }

    // Small delay to prevent glitchy behavior
    const timeoutId = setTimeout(checkAuth, 100)
    
    return () => clearTimeout(timeoutId)
  }, [router])

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    )
  }

  return <BlogPostEditor />
}
