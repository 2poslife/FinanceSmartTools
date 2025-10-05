import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import WhySection from "./WhySection";
import CoursesSection from "./CoursesSection";
import ImageSection from "./ImageSection";
import JourneySection from "./JourneySection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import ArticlesSection from "./ArticlesSection";

function HomePageDesktop() {
  return (
    <div className="homepage-desktop">
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <CoursesSection />
      <ImageSection />
      <JourneySection />
      <FAQSection />
      <TestimonialsSection />
      <ArticlesSection />
    </div>
  );
}

export default HomePageDesktop;
