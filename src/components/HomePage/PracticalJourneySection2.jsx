import React from "react";
import "../../styles/HomePage/PracticalJourneySection2.css";

function PracticalJourneySection2() {
  return (
    <section className="practical-journey-section-2">
      <video 
        src="/RoadmapBrainstorm.mp4" 
        className="practical-journey-video"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

export default PracticalJourneySection2;

