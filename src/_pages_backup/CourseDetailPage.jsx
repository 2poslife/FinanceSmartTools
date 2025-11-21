import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses, detailedCourses } from "../assets/data/courseMock";
import CourseHeader from "../components/CourseDetailPage/CourseHeader";
import CourseChapters from "../components/CourseDetailPage/CourseChapters";
import CourseVideo from "../components/CourseDetailPage/CourseVideo";
import CourseCTA from "../components/CourseDetailPage/CourseCTA";
import CourseSidebar from "../components/CourseDetailPage/CourseSidebar";
import "../styles/CourseDetailPage/CourseDetailPage.css";

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Use detailed course data if available, otherwise fall back to regular courses
  const course = detailedCourses[parseInt(id)] || courses.find((c) => c.id === parseInt(id));

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="course-detail-not-found">
        <h2>الدورة غير موجودة</h2>
        <button onClick={() => navigate("/")} className="course-detail-back-btn">
          العودة للرئيسية
        </button>
      </div>
    );
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
  );
}

export default CourseDetailPage;

