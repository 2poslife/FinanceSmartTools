import React from "react";
import { ExternalLink } from "lucide-react";
import "../../styles/CourseDetailPage/CourseCTA.css";

function CourseCTA({ course }) {
  return (
    <section className="course-detail-cta-section">
      <div className="course-detail-cta-card">
        <h3>{course.ctaText || course.goal}</h3>
        <p>ابدأ رحلتك نحو الإتقان المهني واكتسب المهارات التي تفتح لك أبواب النجاح</p>
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
