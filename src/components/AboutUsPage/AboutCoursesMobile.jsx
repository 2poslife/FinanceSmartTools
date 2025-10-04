import React from "react";
import "../../styles/AboutUsPage/AboutCoursesMobile.css";

function AboutCoursesMobile() {
  return (
    <div className="mobile-courses-section">
      <div className="mobile-courses-container">
        <div className="mobile-courses-header">
          <h2 className="mobile-courses-title">دوراتنا التدريبية</h2>
          <p className="mobile-courses-subtitle">
            اكتسب المهارات العملية التي يستخدمها المحاسبون
          </p>
        </div>
        
        <div className="mobile-courses-list">
          <div className="mobile-course-item">
            <div className="mobile-course-content">
              <h3 className="mobile-course-title">دورات الأفراد</h3>
              <p className="mobile-course-description">
                دورات متخصصة لإدارة ملفات المستقلين بشكل شامل
              </p>
            </div>
            <div className="mobile-course-arrow">→</div>
          </div>
          
          <div className="mobile-course-item">
            <div className="mobile-course-content">
              <h3 className="mobile-course-title">دورات الشركات</h3>
              <p className="mobile-course-description">
                دورات متقدمة في التقارير المالية وإدارة الحسابات
              </p>
            </div>
            <div className="mobile-course-arrow">→</div>
          </div>
        </div>
        
        <div className="mobile-courses-footer">
          <p className="mobile-courses-conclusion">
            كل مجال له أدواته وتقنياته - كورسات متخصصة لكل مجال
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutCoursesMobile;
