'use client'

import { useEffect } from "react"
import CoursesHero from "../components/CoursesPage/CoursesHero"
import CoursesGrid from "../components/CoursesPage/CoursesGrid"
import CoursesConclusion from "../components/CoursesPage/CoursesConclusion"
import "../styles/CoursesPage/CoursesPage.css"

export default function CoursesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="courses-page-main">
      <CoursesHero />
      
      <section className="courses-page-content">
        <div className="courses-page-container">
          <CoursesGrid />
          <CoursesConclusion />
        </div>
      </section>
    </div>
  )
}

