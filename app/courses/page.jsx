'use client'

import { useEffect } from "react"
import CoursesHero from "../../src/components/CoursesPage/CoursesHero"
import CoursesGrid from "../../src/components/CoursesPage/CoursesGrid"
import CoursesConclusion from "../../src/components/CoursesPage/CoursesConclusion"
import "../../src/styles/CoursesPage/CoursesPage.css"

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

