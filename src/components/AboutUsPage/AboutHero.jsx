import React from "react";
import { Phone } from "lucide-react";
import "./AboutHero.css";
import AboutHeroImage from '../../assets/aboutImage.jpg'
export default function AboutHero() {
  return (
    <section className="aboutus-hero">
      <div>
        <img src={AboutHeroImage} alt="" />
      </div>
      <div>
        <h1>حول مكتب المحاسبة المتقدم</h1>
        <p>
          نحن مكتب محاسبة رائد متخصص في تقديم التدريب المحاسبي عالي الجودة
          والأدوات التفاعلية التي تساعد المحاسبين على تطوير مهاراتهم وتحقيق
          النجاح المهني.
        </p>
        <div className="aboutus-buttons">
          <button className="aboutus-btn primary">
            <Phone className="w-6 h-6" /> تواصل معنا
          </button>
          <button className="aboutus-btn secondary">استكشف خدماتنا</button>
        </div>
      </div>
    </section>
  );
}
