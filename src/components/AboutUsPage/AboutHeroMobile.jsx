import React from "react";
import "../../styles/AboutUsPage/AboutHeroMobile.css";

function AboutHeroMobile() {
  return (
    <div className="mobile-hero-section">
      <div className="mobile-hero-content">
        <div className="mobile-hero-text">
          <h1 className="mobile-main-title">
            <span className="mobile-title-highlight">مكتب حسابات</span>
            <span className="mobile-title-subtitle">برؤية مختلفة</span>
          </h1>
          <p className="mobile-hero-description">
            نحن مكتب حسابات مستقل، نقدم خدمات مالية محاسبية وضريبية بجودة عالية وبمهنية تامة.
          </p>
        </div>
        
        <div className="mobile-vision-box">
          <p className="mobile-vision-text">رؤيتنا مبنية على مبدأ:</p>
          <p className="mobile-vision-principle">المعرفة ليست حكرًا على أحد</p>
        </div>
      </div>
    </div>
  );
}

export default AboutHeroMobile;
