import React from "react";
import HeroSectionMobile from "./HeroSectionMobile";
import ServicesSection2Mobile from "./ServicesSection2Mobile";
import FeaturesSectionMobile from "./FeaturesSectionMobile";
import WhySectionMobile from "./WhySectionMobile";
import CoursesSectionMobile from "./CoursesSectionMobile";
import JourneySectionMobile from "./JourneySectionMobile";

import FAQSectionMobile from "./FAQSectionMobile";
import TestimonialsSection3Mobile from "./TestimonialsSection3Mobile";
import ArticlesSectionMobile from "./ArticlesSectionMobile";
import BackToTop from "./BackToTop";

function HomePageMobile() {
  return (
    <div className="homepage-mobile">
      <HeroSectionMobile />
      <ServicesSection2Mobile />
      <FeaturesSectionMobile />
      <WhySectionMobile />
      <CoursesSectionMobile />
      <JourneySectionMobile />
      {/* <PracticalJourneySection2 />
      <PracticalJourneySection /> */}
      {/* <PurpleSectionMobile /> */}
      <FAQSectionMobile />
      <TestimonialsSection3Mobile />
      {/* <ArticlesSectionMobile /> */}
      <BackToTop />
    </div>
  );
}

export default HomePageMobile;
