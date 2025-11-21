'use client'

import { useEffect, useState } from "react"
import HomePageDesktop from "@/src/components/HomePage/HomePageDesktop"
import HomePageMobile from "@/src/components/HomePage/HomePageMobile"

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Check screen size and update mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check on mount
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {isMobile ? <HomePageMobile /> : <HomePageDesktop />}
    </>
  )
}

