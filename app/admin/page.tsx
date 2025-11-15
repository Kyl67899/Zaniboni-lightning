"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Loader2 } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem('zaniboni_admin_session')
      
      if (!session) {
        router.push('/admin/login')
        return
      }

      try {
        const sessionData = JSON.parse(session)
        if (sessionData.expiresAt > Date.now()) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('zaniboni_admin_session')
          router.push('/admin/login')
        }
      } catch (error) {
        localStorage.removeItem('zaniboni_admin_session')
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <AdminDashboard />
}
