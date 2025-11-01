import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      {/* الخلفية */}
      <img
        className="hero-section-bg"
        src="/hero_without_text.svg"
        alt="Hero Background"
      />

      {/* المحتوى */}
      <div className="hero-content">
        {/* اللوجو العبراني */}
        <img
          src="/logo_herosection.png"
          alt="Company Logo"
          className="hero-logo"
        />

        {/* النص العربي */}
        <div className="hero-text">
          <h1 className="hero-title">زيدان - مكتب تدقيق حسابات</h1>
          <p className="hero-subtitle">
            من الاستشارة إلى التنفيذ - كل الخدمات المحاسبية في مكان واحد
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
