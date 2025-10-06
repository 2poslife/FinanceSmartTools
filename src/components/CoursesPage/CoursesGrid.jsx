import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BarChart } from "lucide-react";
import { homePageCourses } from "../../assets/data/courseMock";
import "../../styles/CoursesPage/CoursesGrid.css";

function CoursesGrid() {
  const navigate = useNavigate();
  const topCourses = homePageCourses;

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="courses-grid-container">
      <div className="courses-grid-wrapper">
        {topCourses.map((course) => (
          <div
            key={course.id}
            className="courses-grid-card-item"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="courses-grid-card-image">
              <img src={course.image} alt={course.title} className="courses-grid-image" />
              <div className="courses-grid-card-header">
                <div className="courses-grid-badge">{course.level}</div>
              </div>
            </div>

            <div className="courses-grid-card-content">
              <h3 className="courses-grid-card-title">{course.title}</h3>
              <p className="courses-grid-card-subtitle">{course.subtitle}</p>
              <p className="courses-grid-card-description">{course.description}</p>

              <div className="courses-grid-card-meta">
                <div className="courses-grid-meta-info">
                  <Clock size={18} />
                  <span>{course.duration}</span>
                </div>
                <div className="courses-grid-meta-info">
                  <BarChart size={18} />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="courses-grid-card-footer">
                <div className="courses-grid-price-wrapper">
                  <span className="courses-grid-current-price">{course.price}</span>
                  {course.originalPrice && (
                    <span className="courses-grid-original-price">{course.originalPrice}</span>
                  )}
                </div>
                <button className="courses-grid-view-btn">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesGrid;
