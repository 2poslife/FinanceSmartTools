'use client'

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { courses, detailedCourses } from "@/lib/data/courseMock"
import CourseHeader from "@/src/components/CourseDetailPage/CourseHeader"
import CourseChapters from "@/src/components/CourseDetailPage/CourseChapters"
import CourseVideo from "@/src/components/CourseDetailPage/CourseVideo"
import CourseCTA from "@/src/components/CourseDetailPage/CourseCTA"
import CourseSidebar from "@/src/components/CourseDetailPage/CourseSidebar"
import "@/src/styles/CourseDetailPage/CourseDetailPage.css"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id
  
  // Use detailed course data if available, otherwise fall back to regular courses
  const course = detailedCourses[parseInt(id)] || courses.find((c) => c.id === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!course) {
    return (
      <div className="course-detail-not-found">
        <h2>الدورة غير موجودة</h2>
        <button onClick={() => router.push("/")} className="course-detail-back-btn">
          العودة للرئيسية
        </button>
      </div>
    )
  }

  return (
    <div className="course-detail-page-main">
      <div className="course-detail-content-wrapper">
        <div className="course-detail-main-content">
          <CourseHeader course={course} />
          <CourseChapters course={course} />
          <CourseVideo course={course} />
          <CourseCTA course={course} />
        </div>
        <CourseSidebar course={course} />
      </div>
    </div>
  )
}

