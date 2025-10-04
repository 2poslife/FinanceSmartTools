import React from "react";
import "../../styles/CourseDetailPage/CourseVideo.css";

function CourseVideo({ course }) {
  return (
    <section className="course-detail-video-section">
      <h2 className="course-detail-section-title">مقدمة الدورة</h2>
      <div className="course-detail-video-container">
        <iframe
          src={course.videoUrl}
          title="Course Introduction"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default CourseVideo;
