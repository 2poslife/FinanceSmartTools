import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import WhySection from "../components/HomePage/WhySection";
import CoursesSection from "../components/HomePage/CoursesSection";
import JourneySection from "../components/HomePage/JourneySection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhySection />
      <CoursesSection />
      <JourneySection />
    </div>
  );
}

export default HomePage;
