import React from "react";
import "../../styles/AboutUsPage/AboutCourses.css";

function AboutCourses() {
  return (
    <section className="about-courses-section">
      <div className="about-container">
        <p className="about-section-subtitle">
          اكتسب المهارات العملية التي يستخدمها المحاسبون لإدارة ملفات الأفراد والشركات.
          من التقارير المالية، فتح الملفات، التعامل مع الضرائب، تأمين وطني، استرجاع ضرائب، تدقيق تقارير الشركات وغيرها..
        </p>
        
        <h2 className="about-section-title">دورات للأفراد والشركات</h2>
        
        <p className="about-section-intro">
          دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:
        </p>
        
        <div className="about-courses-grid">
          <div className="about-course-card">
            <div className="about-course-icon">
              <div className="about-icon-circle">
                <div className="icon-users"></div>
              </div>
            </div>
            <h3 className="about-course-title">الأفراد</h3>
            <p className="about-course-description">
              دورات متخصصة تهدف إلى تمكين المحاسبين من إدارة ملفات المستقلين بشكل شامل، من الألف إلى الياء، باحترافية ووفق المعايير المهنية.
            </p>
          </div>
          
          <div className="about-course-card">
            <div className="about-course-icon">
              <div className="about-icon-circle">
                <div className="icon-document"></div>
              </div>
            </div>
            <h3 className="about-course-title">الشركات - تقارير مالية، إدارة حسابات وتدقيق تقارير</h3>
            <p className="about-course-description">
              دورات متقدمة للمحاسبين في الشركات لتطوير مهاراتهم في إعداد التقارير وإدارة الحسابات.
            </p>
          </div>
        </div>
        
        <p className="about-courses-conclusion">
          كل مجال له أدواته، لغته، وتقنياته - وهنا ستجد كورسات متخصصة لكل مجال لتكون محاسبا أكثر احترافا وأكثر ثقة.
        </p>
      </div>
    </section>
  );
}

export default AboutCourses;
