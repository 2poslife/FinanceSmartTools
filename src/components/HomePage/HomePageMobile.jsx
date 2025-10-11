import React from "react";
import HeroSectionMobile from "./HeroSectionMobile";
import ServicesSectionMobile from "./ServicesSectionMobile";
import ServicesSection2Mobile from "./ServicesSection2Mobile";
import FeaturesSectionMobile from "./FeaturesSectionMobile";
import FixedBackgroundSectionMobile from "./FixedBackgroundSectionMobile";
import WhySectionMobile from "./WhySectionMobile";
import CoursesSectionMobile from "./CoursesSectionMobile";
import ImageSectionMobile from "./ImageSectionMobile";
import JourneySectionMobile from "./JourneySectionMobile";
import FAQSectionMobile from "./FAQSectionMobile";
import TestimonialsSectionMobile from "./TestimonialsSectionMobile";
import TestimonialsSection2Mobile from "./TestimonialsSection2Mobile";
import ArticlesSectionMobile from "./ArticlesSectionMobile";
import BackToTop from "./BackToTop";

function HomePageMobile() {
  return (
    <div className="homepage-mobile">
      <HeroSectionMobile />
      <ServicesSectionMobile />
      <ServicesSection2Mobile />
      <FeaturesSectionMobile />
      <FixedBackgroundSectionMobile />
      <WhySectionMobile />
      <CoursesSectionMobile />
      <ImageSectionMobile />
      <JourneySectionMobile />
      <FAQSectionMobile />
      <TestimonialsSectionMobile />
      <TestimonialsSection2Mobile />
      <ArticlesSectionMobile />
      <BackToTop />
    </div>
  );
}

export default HomePageMobile;
