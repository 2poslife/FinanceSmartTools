'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CourseCard = ({ course }) => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState(course.image);

  useEffect(() => {
    // Set cache-busting parameter only on client side
    setImageSrc(`${course.image}?v=${Date.now()}`);
  }, [course.image]);

  const handleCourseClick = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div className="course-card" onClick={handleCourseClick} style={{cursor: 'pointer'}}>
      <div className="course-image">
        <img src={imageSrc} alt="Course" className="course-image-bg" />
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
          router.push(`/course/${course.id}`);
        }}>
          اشترك الآن
        </button>
      </div>
    </div>
  );
};

export default CourseCard;