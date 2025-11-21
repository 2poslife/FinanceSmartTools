'use client'

import { useEffect, useState } from "react"
import NewJournalEntriesDesktop2 from "../../../src/components/NewJournalEntries2/NewJournalEntriesDesktop2"
import NewJournalEntriesMobile from "../../../src/components/NewJournalEntries/NewJournalEntriesMobile"

export default function NewJournalEntriesPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()

    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div dir="rtl">
      {isMobile ? <NewJournalEntriesMobile /> : <NewJournalEntriesDesktop2 />}
    </div>
  )
}

