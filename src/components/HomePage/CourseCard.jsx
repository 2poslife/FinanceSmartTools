import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-header-top">
          <span>⭐ {course.rating}</span>
          <span className="course-header-top-level">{course.level}</span>
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
      </div>

      <div className="course-body">
        <span className="course-price">{course.price}</span>
        <span className="course-duration">
          المدة
          <br />
          {course.duration}
        </span>
      </div>

      <div className="course-footer">
        <button className="course-btn">اشترك الآن</button>
      </div>
    </div>
  );
};

export default CourseCard;
