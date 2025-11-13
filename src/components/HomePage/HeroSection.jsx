import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      {/* الخلفية */}
      <img
        className="hero-section-bg"
        src="https://d3egla0dyi6qxn.cloudfront.net/public/hero_without_text.svg"
        alt="Hero Background"
      />

      {/* المحتوى */}
      <div className="hero-content">
        {/* اللوجو العبراني */}
        <img
          src="https://d3egla0dyi6qxn.cloudfront.net/public/logo_herosection.png"
          alt="Company Logo"
          className="hero-logo"
        />

        {/* النص العربي */}
        <div className="hero-text">
          <h1 className="hero-title">زيدان - مكتب تدقيق حسابات</h1>
          <p className="hero-subtitle">
            نقدم لك أفضل الحلول المحاسبية والاستشارات المالية المتخصصة
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
