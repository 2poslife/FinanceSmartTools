'use client'

import { useEffect, useState } from "react"
import HomePageDesktop from "@/src/components/HomePage/HomePageDesktop"
import HomePageMobile from "@/src/components/HomePage/HomePageMobile"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  // Check screen size and update mobile state
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check on mount
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [mounted])

  // Default to desktop during SSR to prevent hydration mismatch
  if (!mounted) {
    return <HomePageDesktop />
  }

  return (
    <>
      {isMobile ? <HomePageMobile /> : <HomePageDesktop />}
    </>
  )
}

