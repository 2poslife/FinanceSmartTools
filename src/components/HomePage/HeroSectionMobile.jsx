import React from "react";
import "../../styles/HomePage/HeroSectionMobile.css";

function HeroSectionMobile() {
  return (
    <section className="hero-mobile">
      <div className="hero-bg-mobile">
        <img src="/herosection.png" alt="Hero Background" />
      </div>
      <div className="hero-overlay-mobile"></div>
      <div className="hero-content-mobile">
        <div className="hero-text-mobile">
          <h1 className="hero-title-mobile">
            مكتب زيدان للمحاسبة والاستشارات المالية
          </h1>
          <p className="hero-subtitle-mobile">
            نقدم لك أفضل الحلول المحاسبية والاستشارات المالية المتخصصة
          </p>
          <div className="hero-buttons-mobile">
            <button className="btn-primary-mobile">اكتشف خدماتنا</button>
            <button className="btn-secondary-mobile">تواصل معنا</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionMobile;
