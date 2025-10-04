import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../../styles/CourseDetailPage/CourseHeader.css";

function CourseHeader({ course }) {
  const navigate = useNavigate();

  return (
    <section className="course-detail-header-section">
      <button onClick={() => navigate(-1)} className="course-detail-back-button">
        <ArrowRight /> العودة
      </button>
      <h1 className="course-detail-title">{course.title}</h1>
      <h2 className="course-detail-section-title">نظرة عامة على الدورة</h2>
      <p className="course-detail-description">{course.description}</p>
      {course.goal && (
        <div className="course-detail-goal">
          <h3 className="course-detail-goal-title">هدف الدورة:</h3>
          <p className="course-detail-goal-description">{course.goal}</p>
        </div>
      )}
    </section>
  );
}

export default CourseHeader;
