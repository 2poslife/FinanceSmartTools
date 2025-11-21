'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Header from "../../src/components/Layout/Header"
import MobileHeader from "../../src/components/Layout/MobileHeader"
import AdminHeader from "../../src/components/Layout/AdminHeader"
import Footer from "../../src/components/Layout/Footer"
import CookieConsent from "../../src/components/Layout/CookieConsent"
import AccessibilityMenu from "../../src/components/Layout/AccessibilityMenu"

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
  const { isAuthenticated, role } = useAuth()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Determine which header to show
  const renderHeader = () => {
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

