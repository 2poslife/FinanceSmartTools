'use client'

import { useEffect, useState } from "react"
import CalculatorsDesktop from "../../src/components/CalculatorsPage/CalculatorsDesktop"
import CalculatorsMobile from "../../src/components/CalculatorsPage/CalculatorsMobile"

export default function CalculatorsPage() {
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
      {isMobile ? <CalculatorsMobile /> : <CalculatorsDesktop />}
    </>
  )
}

