import React from "react";
import "../../styles/AboutUsPage/AboutCoursesMobile.css";

function AboutCoursesMobile() {
  return (
    <div className="mobile-courses-section">
      <div className="mobile-courses-container">
        <div className="mobile-courses-header">
          <h2 className="mobile-courses-title">دورات للأفراد والشركات</h2>
          <p className="mobile-courses-intro">
            دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:
          </p>
        </div>
        
        <div className="mobile-courses-list">
          <div className="mobile-course-item">
            <div className="mobile-course-content">
              <h3 className="mobile-course-title">الأفراد</h3>
              <p className="mobile-course-description">
                دورات متخصصة تهدف إلى تمكين المحاسبين من إدارة ملفات المستقلين بشكل شامل، من الألف إلى الياء، باحترافية ووفق المعايير المهنية.
              </p>
            </div>
            <div className="mobile-course-arrow">→</div>
          </div>
          
          <div className="mobile-course-item">
            <div className="mobile-course-content">
              <h3 className="mobile-course-title">الشركات - تقارير مالية، إدارة حسابات وتدقيق تقارير</h3>
              <p className="mobile-course-description">
                دورات متقدمة للمحاسبين في الشركات لتطوير مهاراتهم في إعداد التقارير وإدارة الحسابات.
              </p>
            </div>
            <div className="mobile-course-arrow">→</div>
          </div>
        </div>
        
        <div className="mobile-courses-footer">
          <p className="mobile-courses-conclusion">
            كل مجال له أدواته، لغته، وتقنياته - وهنا ستجد كورسات متخصصة لكل مجال لتكون محاسبا أكثر احترافا وأكثر ثقة.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutCoursesMobile;
