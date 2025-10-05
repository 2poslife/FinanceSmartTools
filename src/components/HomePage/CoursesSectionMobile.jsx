import React from "react";
import "../../styles/HomePage/CoursesSectionMobile.css";
import { homePageCourses } from "../../assets/data/courseMock";

function CoursesSectionMobile() {
  return (
    <section dir="rtl" className="courses-section-mobile">
      <div className="courses-container-mobile">
        <div className="courses-intro-mobile">
          <h2 className="courses-title-mobile">دوراتنا التدريبية</h2>
          <p className="courses-subtitle-mobile">
            اكتشف مجموعة متنوعة من الدورات المحاسبية المتخصصة
          </p>
          
          <div className="courses-points-mobile">
            <div className="point-mobile">
              <span className="point-icon-mobile">✅</span>
              <span>دورات معتمدة ومهنية</span>
            </div>
            <div className="point-mobile">
              <span className="point-icon-mobile">📚</span>
              <span>محتوى شامل ومفصل</span>
            </div>
            <div className="point-mobile">
              <span className="point-icon-mobile">🎯</span>
              <span>أمثلة عملية من الواقع</span>
            </div>
          </div>
        </div>

        <div className="courses-grid-mobile">
          {homePageCourses.map((course) => (
            <div key={course.id} className="course-card-mobile">
              <div className="course-image-mobile">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-content-mobile">
                <h3 className="course-title-mobile">{course.title}</h3>
                <p className="course-subtitle-mobile">{course.subtitle}</p>
                <p className="course-description-mobile">{course.description}</p>
                <div className="course-meta-mobile">
                  <span className="course-duration-mobile">⏱️ {course.duration}</span>
                  <span className="course-level-mobile">📊 {course.level}</span>
                </div>
                <button className="course-btn-mobile">تعرف على المزيد</button>
              </div>
            </div>
          ))}
        </div>

        <div className="courses-conclusion-mobile">
          <h3>ابدأ رحلتك التعليمية معنا اليوم</h3>
          <p>انضم إلى آلاف الطلاب الذين طوروا مهاراتهم المحاسبية معنا</p>
          <button className="cta-btn-mobile">عرض جميع الدورات</button>
        </div>
      </div>
    </section>
  );
}

export default CoursesSectionMobile;
