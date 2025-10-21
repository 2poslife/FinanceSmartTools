import React from "react";
import "../../styles/AboutUsPage/AboutUsDesktop.css";
import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
import AboutCourses from "./AboutCourses";
import AboutValues from "./AboutValues";

function AboutUsDesktop() {
  return (
    <div className="about-us-page">
      {/* Main Content */}
      <div className="about-main-content">
        <AboutHero />
        <AboutContent />
      </div>

      <AboutCourses />
      <AboutValues />
    </div>
  );
}

export default AboutUsDesktop;
