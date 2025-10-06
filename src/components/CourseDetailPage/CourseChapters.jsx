import React, { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import "../../styles/CourseDetailPage/CourseChapters.css";

function CourseChapters({ course }) {
  const [showAllChapters, setShowAllChapters] = useState(false);

  return (
    <section className="course-detail-chapters-section">
      <h2 className="course-detail-section-title">المواضيع الرئيسية</h2>
      <div className="course-detail-chapters-container">
        {course.chapters ? (
          <>
            {course.chapters.slice(0, showAllChapters ? course.chapters.length : 3).map((chapter, index) => (
              <div key={chapter.id} className="course-detail-chapter-card">
                <div className="course-detail-chapter-header">
                  <div className="course-detail-chapter-number">{chapter.id}</div>
                  <h3 className="course-detail-chapter-title">{chapter.title}</h3>
                </div>
                <ul className="course-detail-chapter-topics">
                  {chapter.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="course-detail-topic-item">
                      <CheckCircle className="course-detail-check-icon" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {course.chapters.length > 3 && (
              <div className="course-detail-show-more-container">
                <button 
                  className="course-detail-show-more-btn"
                  onClick={() => setShowAllChapters(!showAllChapters)}
                >
                  {showAllChapters ? (
                    <>
                      <ChevronUp className="course-detail-show-more-icon" />
                      إخفاء الفصول الإضافية
                    </>
                  ) : (
                    <>
                      <ChevronDown className="course-detail-show-more-icon" />
                      عرض المزيد من الفصول ({course.chapters.length - 3} فصول إضافية)
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : course.mainTopics && course.mainTopics.map((topic, index) => (
          <li key={index} className="course-detail-topic-item">
            <CheckCircle className="course-detail-check-icon" />
            <span>{topic}</span>
          </li>
        ))}
      </div>
    </section>
  );
}

export default CourseChapters;
