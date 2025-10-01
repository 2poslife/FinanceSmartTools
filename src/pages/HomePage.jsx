import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import ServicesSection from "../components/HomePage/ServicesSection";
import WhySection from "../components/HomePage/WhySection";
import CoursesSection from "../components/HomePage/CoursesSection";
import ImageSection from "../components/HomePage/ImageSection";
import JourneySection from "../components/HomePage/JourneySection";
import FAQSection from "../components/HomePage/FAQSection";
import TestimonialsSection from "../components/HomePage/TestimonialsSection";
import ArticlesSection from "../components/HomePage/ArticlesSection";

function HomePage() {
  return (
    <div>
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

export default HomePage;
