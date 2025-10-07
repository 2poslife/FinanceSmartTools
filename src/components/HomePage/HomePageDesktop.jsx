import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import ServicesSection2 from "./ServicesSection2";
import FeaturesSection from "./FeaturesSection";
import WhySection from "./WhySection";
import CoursesSection from "./CoursesSection";
import ImageSection from "./ImageSection";
import JourneySection from "./JourneySection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import TestimonialsSection2 from "./TestimonialsSection2";
import TestimonialsSection3 from "./TestimonialsSection3";
import ArticlesSection from "./ArticlesSection";

function HomePageDesktop() {
  return (
    <div className="homepage-desktop">
      <HeroSection />
      <ServicesSection />
      <ServicesSection2 />
      <FeaturesSection />
      <WhySection />
      <CoursesSection />
      <ImageSection />
      <JourneySection />
      <FAQSection />
      <TestimonialsSection />
      <TestimonialsSection2 />
      <TestimonialsSection3 />
      <ArticlesSection />
    </div>
  );
}

export default HomePageDesktop;
