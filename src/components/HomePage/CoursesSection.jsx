import React from "react";
import { courses } from "../../assets/data/courseMock";
import CourseCard from "./CourseCard";
import "./CourseSection.css";

function CoursesSection() {
  const topCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="courses-section">
      <div className="section-header">
        <h2 className="section-title">الدورات المتاحة</h2>
        <p className="section-subtitle">
          اختر الدورة المناسبة لمستواك وابدأ رحلتك في عالم المحاسبة
        </p>
      </div>

      <div className="course-list">
        {topCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default CoursesSection;
