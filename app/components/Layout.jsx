'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Header from "./Layout/Header"
import MobileHeader from "./Layout/MobileHeader"
import AdminHeader from "./Layout/AdminHeader"
import Footer from "./Layout/Footer"
import CookieConsent from "./Layout/CookieConsent"
import AccessibilityMenu from "./Layout/AccessibilityMenu"

// Custom hook for authentication
const useAuth = () => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, role: null })

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      setAuthState({ isAuthenticated: false, role: null })
      return
    }

    try {
      const decoded = jwtDecode(token)
      const isExpired = decoded.exp * 1000 < Date.now()

      if (isExpired) {
        localStorage.removeItem("access_token")
        setAuthState({ isAuthenticated: false, role: null })
      } else {
        setAuthState({ isAuthenticated: true, role: decoded.role })
      }
    } catch (err) {
      console.error("❌ Invalid token:", err)
      localStorage.removeItem("access_token")
      setAuthState({ isAuthenticated: false, role: null })
    }
  }, [])

  return authState
}

export default function Layout({ children }) {
  const { role } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Determine which header to show (client-side only after mount)
  const renderHeader = () => {
    if (!mounted) {
      // Default to Header during SSR to prevent hydration mismatch
      return <Header />
    }
    if (role === "admin") return <AdminHeader />
    if (isMobile && role !== "admin") return <MobileHeader />
    return <Header />
  }

  return (
    <>
      {renderHeader()}
      {children}
      <Footer />
      <CookieConsent />
      <AccessibilityMenu />
    </>
  )
}

