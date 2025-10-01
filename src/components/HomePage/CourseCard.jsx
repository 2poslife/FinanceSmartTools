import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={`/course${course.id}.png`} alt="Course" className="course-image-bg" />
        <div className="course-category">{course.level}</div>
      </div>
      
      <div className="course-content">
        <p className="course-description">{course.description}</p>
        
        {/* Hidden spacer for second card to maintain consistent layout */}
        {course.id === 2 && <div className="hidden-spacer"></div>}
        
        <div className="course-meta">
          <div className="course-price">{course.price}</div>
        </div>
        
        <button className="enroll-btn">اشترك الآن</button>
      </div>
    </div>
  );
};

export default CourseCard;
