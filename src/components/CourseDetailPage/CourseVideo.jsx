import React from "react";
import "../../styles/CourseDetailPage/CourseVideo.css";

function CourseVideo({ course }) {
  // Check if the video is a local MP4 file
  const isLocalVideo = course.videoUrl && course.videoUrl.endsWith('.mp4');
  
  return (
    <section className="course-detail-video-section">
      <h2 className="course-detail-section-title">مقدمة الدورة</h2>
      <div className="course-detail-video-container">
        {isLocalVideo ? (
          <video
            src={course.videoUrl}
            controls
            title="Course Introduction"
            style={{ width: '100%', height: '100%', borderRadius: '12px' }}
          >
            متصفحك لا يدعم تشغيل الفيديو
          </video>
        ) : (
          <iframe
            src={course.videoUrl}
            title="Course Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
}

export default CourseVideo;
