import React from "react";
import { courses } from "../../assets/data/courseMock";
import CourseCard from "./CourseCard";
import "./CoursesSection.css";

function CoursesSection() {
  const topCourses = [...courses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="courses-section">
      <div className="courses-container">
      <h2 className="courses-title">
      دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:
      </h2>
        
        <div className="courses-intro">
  <ul>
    <li className="intro-point">الأفراد - أجيرين ومستقلين</li>
    <li className="intro-point">الشركات - تقارير مالية، إدارة حسابات، وتدقيق تقارير شركات</li>
  </ul>
</div>

        
        <div className="courses-grid">
          {topCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
