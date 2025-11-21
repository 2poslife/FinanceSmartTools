import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import "../../styles/HomePage/HeroSectionMobile.css";
import { getImageUrl } from "../../utils/index.jsx";

function HeroSectionMobile() {
  const [showContact, setShowContact] = useState(false);

  const handleDiscoverServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactUs = () => {
    setShowContact(true);
  };

  return (
    <>
      <section className="hero-mobile">
        <img src={getImageUrl('herosection_mobiel.svg')} alt="Hero Section" className="hero-section-bg-mobile" />
        <div className="hero-content-mobile">
          <div className="hero-mobile-logo">
          </div>
          <div className="hero-text-mobile">
            <h1 className="hero-title-mobile">
              زيدان - مكتب تدقيق حسابات
            </h1>
            <p className="hero-subtitle-mobile">
              نقدم لك أفضل الحلول المحاسبية والاستشارات المالية المتخصصة
            </p>
            <div className="hero-buttons-mobile">
              <button className="btn-primary-mobile" onClick={handleDiscoverServices}>
                اكتشف خدماتنا
              </button>
              <button className="btn-secondary-mobile" onClick={handleContactUs}>
                تواصل معنا
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="mobile-modal-overlay"
          onClick={() => setShowContact(false)}
        >
          <div
            className="mobile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mobile-modal-close"
              onClick={() => setShowContact(false)}
            >
              ✖
            </button>

            <section className="mobile-about-contact">
              <h2>تواصل معنا</h2>
              <p>نحن دائمًا هنا لمساعدتك</p>

              <div className="mobile-contact-grid">
                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper green">
                    <MapPin className="mobile-contact-icon" />
                  </div>
                  <h3>موقعنا</h3>
                  <p dir="rtl">
                    <strong>📍 المغار</strong>
                  </p>
                </div>

                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper blue">
                    <Mail className="mobile-contact-icon" />
                  </div>
                  <h3>راسلنا</h3>
                  <p>
                    <strong>zedan.cpa@gmail.com</strong>
                  </p>
                </div>

                <div className="mobile-contact-card">
                  <div className="mobile-icon-wrapper orange">
                    <Phone className="mobile-contact-icon" />
                  </div>
                  <h3>اتصل بنا</h3>
                  <p dir="rtl">
                    <strong>0528092596</strong>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default HeroSectionMobile;
