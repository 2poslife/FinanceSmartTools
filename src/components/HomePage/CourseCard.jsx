import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="course-card" onClick={handleCourseClick} style={{cursor: 'pointer'}}>
      <div className="course-image">
        <img src={`/course${course.id}.png?v=${Date.now()}`} alt="Course" className="course-image-bg" />
        <div className="course-category">{course.level}</div>
      </div>
      
      <div className="course-content">
        <p className="course-description">{course.description}</p>
        
        {/* Hidden spacer for second card to maintain consistent layout */}
        {course.id === 2 && <div className="hidden-spacer"></div>}
        
        <div className="course-meta">
          <div className="course-price">{course.price}</div>
        </div>
        
        <button className="enroll-btn" onClick={(e) => {
          e.stopPropagation();
          navigate(`/course/${course.id}`);
        }}>
          اشترك الآن
        </button>
      </div>
    </div>
  );
};

export default CourseCard;