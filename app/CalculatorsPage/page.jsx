'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import CalculatorsDesktop from "../components/CalculatorsPage/CalculatorsDesktop"
import CalculatorsMobile from "../components/CalculatorsPage/CalculatorsMobile"

export default function CalculatorsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  // Reset scroll position when pathname changes (when returning from calculator)
  useEffect(() => {
    if (pathname === '/CalculatorsPage') {
      window.scrollTo(0, 0)
      // Force re-render to fix layout issues
      setIsMobile(window.innerWidth <= 768)
    }
  }, [pathname])

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
    return <CalculatorsDesktop />
  }

  return (
    <>
      {isMobile ? (
        <CalculatorsMobile key={`mobile-${pathname}`} />
      ) : (
        <CalculatorsDesktop key={`desktop-${pathname}`} />
      )}
    </>
  )
}

