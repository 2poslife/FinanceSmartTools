import React from "react";
import "../../styles/HomePage/JourneySection.css";
import { BookOpen, Calculator } from "lucide-react";

function JourneySection() {
  return (
    <section className="hero-section">
      <h2 className="hero-title">ابدأ رحلتك المحاسبية اليوم</h2>
      <p className="hero-subtitle">
        لا تفوت الفرصة للانضمام إلى مجتمعنا من المحاسبين المحترفين واستخدام
        أدواتنا المجانية
      </p>

      <div className="hero-actions">
        <button className="hero-btn">
          تصفح الدورات <BookOpen />
        </button>
        <button className="hero-btn">
          <Calculator />
          استخدم الآلات الحاسبة
        </button>
      </div>
    </section>
  );
}

export default JourneySection;
