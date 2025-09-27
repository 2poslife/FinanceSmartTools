import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import WhySection from "../components/HomePage/WhySection";
import CoursesSection from "../components/HomePage/CoursesSection";
import JourneySection from "../components/HomePage/JourneySection";
import FAQSection from "../components/HomePage/FAQSection";
import TestimonialsSection from "../components/HomePage/TestimonialsSection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <WhySection />
      <CoursesSection />
      <JourneySection />
      <FAQSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
