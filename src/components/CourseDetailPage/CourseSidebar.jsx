import React from "react";
import "../../styles/CourseDetailPage/CourseSidebar.css";

function CourseSidebar({ course }) {
  return (
    <aside className="course-detail-sidebar">
      <div className="course-detail-sidebar-card">
        <h3>معلومات الدورة</h3>
        <div className="course-detail-sidebar-info">
          <div className="course-detail-info-row">
            <span className="course-detail-info-label">المدة:</span>
            <span className="course-detail-info-value">{course.duration}</span>
          </div>
          <div className="course-detail-info-row">
            <span className="course-detail-info-label">المستوى:</span>
            <span className="course-detail-info-value">{course.level}</span>
          </div>
          <div className="course-detail-info-row">
            <span className="course-detail-info-label">التقييم:</span>
            <span className="course-detail-info-value">⭐ {course.rating}</span>
          </div>
          <div className="course-detail-info-row course-detail-price-row">
            <span className="course-detail-info-label">السعر:</span>
            <div className="course-detail-price-container">
              {course.originalPrice && (
                <span className="course-detail-original-price">{course.originalPrice}</span>
              )}
              <span className="course-detail-info-value course-detail-price-highlight">{course.price}</span>
            </div>
          </div>
        </div>
        <a
          href={course.courseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="course-detail-sidebar-cta-btn"
        >
          سجل الآن
        </a>
      </div>
    </aside>
  );
}

export default CourseSidebar;
