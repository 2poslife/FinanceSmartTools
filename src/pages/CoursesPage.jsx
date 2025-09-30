import React from "react";
import CoursesHero from "../components/Courses/CoursesHero.jsx";
import CoursesList from "../components/Courses/CoursesList.jsx";
import CoursesStats from "../components/Courses/CoursesStats.jsx";
import ContactComponent from "../components/ContactComponent";

function CoursesPage() {
  return (
    <div style={{color:"black"}}>
      <CoursesHero />
      <CoursesList />
      <CoursesStats />
      <ContactComponent />
    </div>
  );
}

export default CoursesPage;
