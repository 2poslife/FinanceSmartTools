import React from "react";
import "../../styles/AboutUsPage/AboutHero.css";

function AboutHero() {
  return (
    <div className="about-left-section">
      <div className="whatsapp-image-background">
        {/* Overlay Box with Arabic Text */}
        <div className="vision-overlay">
          <div className="overlay-content">
            <p className="vision-text">رؤيتنا مبنية على مبدأ:</p>
            <p className="vision-principle">المعرفة ليست حكرًا على أحد</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
