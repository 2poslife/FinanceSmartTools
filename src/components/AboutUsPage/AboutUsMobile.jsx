import React from "react";
import "./AboutUsMobile.css";
import AboutHeroMobile from "./AboutHeroMobile";
import AboutContentMobile from "./AboutContentMobile";
import AboutCoursesMobile from "./AboutCoursesMobile";
import AboutValuesMobile from "./AboutValuesMobile";

function AboutUsMobile() {
  return (
    <div className="about-us-page-mobile">
      {/* Mobile Layout - Completely different design */}
      <AboutHeroMobile />
      <AboutContentMobile />
      <AboutCoursesMobile />
      <AboutValuesMobile />
    </div>
  );
}

export default AboutUsMobile;
