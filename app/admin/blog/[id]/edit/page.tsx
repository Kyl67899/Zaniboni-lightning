"use client"

import { BlogPostEditor } from "@/components/admin/blog-post-editor"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

type Props = {
  params: Promise<{ id: string }>
}

export default function EditBlogPostPage({ params }: Props) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [postId, setPostId] = useState<number | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      console.log(" Checking authentication for edit page")
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
      
      const p = await params
      const id = Number.parseInt(p.id)
      console.log(" Loading post ID:", id)
      setPostId(id)
      setIsAuthenticated(true)
      setIsChecking(false)
    }

    // Small delay to prevent glitchy behavior
    const timeoutId = setTimeout(checkAuth, 100)
    
    return () => clearTimeout(timeoutId)
  }, [router, params])

  if (isChecking || !isAuthenticated || postId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    )
  }

  return <BlogPostEditor postId={postId} />
}
