import React from "react";
import "./Courses.css";
import { courses } from "../../assets/data/courseMock";
import CourseCard from "../HomePage/CourseCard";

const CoursesList = () => {
  return (
    <section className="courses-list">
      <h2>قائمة الدورات</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CoursesList;
