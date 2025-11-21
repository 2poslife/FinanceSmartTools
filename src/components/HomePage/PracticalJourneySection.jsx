import React from "react";
import "../../styles/HomePage/PracticalJourneySection.css";
import { getImageUrl } from "@/lib/utils";

function PracticalJourneySection() {
  return (
    <section className="practical-journey-section">
      <img 
        src={getImageUrl('practical-journey.jpeg')} 
        alt="Practical Journey - من هنا دورنا يبدأ" 
        className="practical-journey-image"
      />
    </section>
  );
}

export default PracticalJourneySection;

