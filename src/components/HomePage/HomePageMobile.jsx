import React from "react";
import HeroSectionMobile from "./HeroSectionMobile";
import ServicesSectionMobile from "./ServicesSectionMobile";
import WhySectionMobile from "./WhySectionMobile";
import CoursesSectionMobile from "./CoursesSectionMobile";
import ImageSectionMobile from "./ImageSectionMobile";
import JourneySectionMobile from "./JourneySectionMobile";
import FAQSectionMobile from "./FAQSectionMobile";
import TestimonialsSectionMobile from "./TestimonialsSectionMobile";
import ArticlesSectionMobile from "./ArticlesSectionMobile";

function HomePageMobile() {
  return (
    <div className="homepage-mobile">
      <HeroSectionMobile />
      <ServicesSectionMobile />
      <WhySectionMobile />
      <CoursesSectionMobile />
      <ImageSectionMobile />
      <JourneySectionMobile />
      <FAQSectionMobile />
      <TestimonialsSectionMobile />
      <ArticlesSectionMobile />
    </div>
  );
}

export default HomePageMobile;
