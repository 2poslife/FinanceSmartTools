import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../assets/data/courseMock";
import { ArrowRight, Clock, BarChart, CheckCircle, ExternalLink } from "lucide-react";
import "./CourseDetailPage.css";

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(id));

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>الدورة غير موجودة</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      {/* Main Content */}
      <div className="course-content-wrapper">
        <div className="course-main-content">
          {/* Description Section with Back Button and Title */}
          <section className="course-section">
            <button onClick={() => navigate(-1)} className="back-button">
              <ArrowRight /> العودة
            </button>
            <h1 className="course-title">{course.title}</h1>
            <h2 className="section-title">نظرة عامة على الدورة</h2>
            <p className="course-description">{course.description}</p>
          </section>

          {/* Topics Section */}
          <section className="course-section">
            <h2 className="section-title">المواضيع الرئيسية</h2>
            <ul className="topics-list">
              {course.mainTopics.map((topic, index) => (
                <li key={index} className="topic-item">
                  <CheckCircle className="check-icon" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Video Section */}
          <section className="course-section">
            <h2 className="section-title">مقدمة الدورة</h2>
            <div className="video-container">
              <iframe
                src={course.videoUrl}
                title="Course Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* CTA Section */}
          <section className="course-cta-section">
            <div className="cta-card">
              <h3>هل أنت مستعد لبدء رحلتك المحاسبية؟</h3>
              <p>انضم للدورة الآن واحصل على شهادة معتمدة</p>
              <a
                href={course.courseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="enroll-btn"
              >
                <span>الانتقال إلى الدورة</span>
                <ExternalLink size={20} />
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="course-sidebar">
          <div className="sidebar-card">
            <h3>معلومات الدورة</h3>
            <div className="sidebar-info">
              <div className="info-row">
                <span className="info-label">المدة:</span>
                <span className="info-value">{course.duration}</span>
              </div>
              <div className="info-row">
                <span className="info-label">المستوى:</span>
                <span className="info-value">{course.level}</span>
              </div>
              <div className="info-row">
                <span className="info-label">التقييم:</span>
                <span className="info-value">⭐ {course.rating}</span>
              </div>
              <div className="info-row">
                <span className="info-label">السعر:</span>
                <span className="info-value price-highlight">{course.price}</span>
              </div>
            </div>
            <a
              href={course.courseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-cta-btn"
            >
              سجل الآن
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CourseDetailPage;

