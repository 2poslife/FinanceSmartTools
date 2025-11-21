'use client'

import { useEffect, useState } from "react"
import AboutUsDesktop from "../components/AboutUsPage/AboutUsDesktop"
import AboutUsMobile from "../components/AboutUsPage/AboutUsMobile"

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [mounted])

  if (!mounted) {
    return <AboutUsDesktop />
  }

  return (
    <>
      {isMobile ? <AboutUsMobile /> : <AboutUsDesktop />}
    </>
  )
}

