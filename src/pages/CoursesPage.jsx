import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { homePageCourses } from "../assets/data/courseMock";
import { Clock, BarChart, Star } from "lucide-react";
import "./CoursesPage.css";

function CoursesPage() {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use the same courses as homepage
  const topCourses = homePageCourses;

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="courses-hero-content">
          <h1 className="courses-main-title">دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:</h1>
          <div className="courses-intro">
            <ul>
              <li className="intro-point">الأفراد - أجيرين ومستقلين</li>
              <li className="intro-point">الشركات - تقارير مالية، إدارة حسابات، وتدقيق تقارير شركات</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-content">
        <div className="courses-container">
          <div className="courses-grid">
            {topCourses.map((course) => (
              <div
                key={course.id}
                className="course-card-item"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-card-image">
                  <img src={course.image} alt={course.title} className="course-image" />
                  <div className="course-card-header">
                    <div className="course-badge">{course.level}</div>
                    <div className="course-rating">
                      <Star size={16} fill="#d4af37" color="#d4af37" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="course-card-content">
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-subtitle">{course.subtitle}</p>
                  <p className="course-card-description">{course.description}</p>

                  <div className="course-card-meta">
                    <div className="meta-info">
                      <Clock size={18} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="meta-info">
                      <BarChart size={18} />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  <div className="course-card-footer">
                    <div className="course-price-wrapper">
                      <span className="course-current-price">{course.price}</span>
                      {course.originalPrice && (
                        <span className="course-original-price">{course.originalPrice}</span>
                      )}
                    </div>
                    <button className="course-view-btn">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;

