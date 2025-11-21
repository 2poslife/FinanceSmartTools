import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import ServicesSection2 from "./ServicesSection2";
import FeaturesSection from "./FeaturesSection";
import FixedBackgroundSection from "./FixedBackgroundSection";
import WhySection from "./WhySection";
import CoursesSection from "./CoursesSection";
import JourneySection from "./JourneySection";
import PracticalJourneySection2 from "./PracticalJourneySection2";
import PracticalJourneySection from "./PracticalJourneySection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import TestimonialsSection3 from "./TestimonialsSection3";
import ArticlesSection from "./ArticlesSection";
import PurpleSection from "./PurpleSection";
import BackToTop from "./BackToTop";

function HomePageDesktop() {
  return (
    <div className="homepage-desktop">
      <HeroSection />
      <ServicesSection2 />
      <FeaturesSection />
      <WhySection />
      <CoursesSection />
      <PracticalJourneySection2 />
      <JourneySection />

      {/* <PracticalJourneySection /> */}
      {/* <PurpleSection /> */}
      <FAQSection />
      <TestimonialsSection3 />
      {/* <ArticlesSection /> */}
      <BackToTop />
    </div>
  );
}

export default HomePageDesktop;
