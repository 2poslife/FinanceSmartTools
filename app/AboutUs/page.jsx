'use client'

import { useEffect, useState } from "react"
import AboutUsDesktop from "../../src/components/AboutUsPage/AboutUsDesktop"
import AboutUsMobile from "../../src/components/AboutUsPage/AboutUsMobile"

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {isMobile ? <AboutUsMobile /> : <AboutUsDesktop />}
    </>
  )
}

