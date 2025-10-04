import React from "react";
import { ExternalLink } from "lucide-react";
import "../../styles/CourseDetailPage/CourseCTA.css";

function CourseCTA({ course }) {
  return (
    <section className="course-detail-cta-section">
      <div className="course-detail-cta-card">
        <h3>هل أنت مستعد لبدء رحلتك المحاسبية؟</h3>
        <p>انضم للدورة الآن واحصل على شهادة معتمدة</p>
        <a
          href={course.courseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="course-detail-enroll-btn"
        >
          <span>الانتقال إلى الدورة</span>
          <ExternalLink size={20} />
        </a>
      </div>
    </section>
  );
}

export default CourseCTA;
