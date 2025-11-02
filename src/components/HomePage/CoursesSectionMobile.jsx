import React from "react";
import { courses } from "../../assets/data/courseMock";
import CourseCard from "./CourseCard";
import "../../styles/HomePage/CoursesSectionMobile.css";

function CoursesSectionMobile() {
  const topCourses = [...courses].slice(0, 3);

  return (
    <section className="courses-section-mobile">
      <div className="courses-container-mobile">
        <h2 className="courses-title-mobile">
          ارتقِ بمهاراتك المحاسبية مع مكتب زيدان
          <br />
          دورات مصممة لتناسب احتياجات المحاسبين
        </h2>

        <div className="courses-intro-mobile">
          <ul>
            <li className="intro-point-mobile">الأفراد - أجيرين ومستقلين</li>
            <li className="intro-point-mobile">
              الشركات - تقارير مالية، إدارة حسابات، وتدقيق تقارير شركات
            </li>
          </ul>
        </div>

        <div className="courses-grid-mobile">
          {topCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="courses-conclusion-mobile">
          <p className="courses-conclusion-text-mobile">
            في مكتبنا، نعمل على أساس قيم واضحة: الشفافية مع عملائنا، الاحترافية في كل خدمة، المسؤولية الكاملة عن النتائج، والابتكار في الحلول.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoursesSectionMobile;
