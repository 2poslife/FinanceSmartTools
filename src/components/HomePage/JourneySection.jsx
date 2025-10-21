import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage/JourneySection.css";
import { BookOpen, Calculator } from "lucide-react";

function JourneySection() {
  const navigate = useNavigate();

  const handleBrowseCourses = () => {
    navigate("/courses");
  };

  const handleUseCalculators = () => {
    navigate("/CalculatorsPage");
  };

  return (
    <section className="homepage-journey-section">
      {/* Background Elements */}
      <div className="homepage-journey-bg">
        <div className="homepage-journey-overlay"></div>
        <div className="homepage-journey-shapes">
          <div className="homepage-shape-1"></div>
          <div className="homepage-shape-2"></div>
          <div className="homepage-shape-3"></div>
        </div>
      </div>

      {/* Content */}
      <div className="homepage-journey-container">
        <div className="homepage-journey-content">
          <h2 className="homepage-journey-title">ابدأ رحلتك المحاسبية اليوم</h2>
          
          <p className="homepage-journey-subtitle">
            لا تفوت الفرصة للانضمام إلى مجتمعنا من المحاسبين المحترفين واستخدام
            أدواتنا المجانية
          </p>

          <div className="homepage-journey-stats">
            <div className="homepage-stat-item">
              <span className="homepage-stat-number">500+</span>
              <span className="homepage-stat-label">محاسب محترف</span>
            </div>
            <div className="homepage-stat-item homepage-logo-stat">
              <img src="/logo.png" alt="Logo" className="homepage-stat-logo" />
              <span className="homepage-stat-label">مكتب زيدان</span>
            </div>
            <div className="homepage-stat-item">
              <span className="homepage-stat-number">24/7</span>
              <span className="homepage-stat-label">دعم فني</span>
            </div>
          </div>

          <div className="homepage-journey-actions">
            <button 
              className="homepage-journey-btn homepage-btn-primary"
              onClick={handleBrowseCourses}
            >
              <BookOpen className="homepage-btn-icon" />
              <span>تصفح الدورات</span>
              <div className="homepage-btn-glow"></div>
            </button>
            <button 
              className="homepage-journey-btn homepage-btn-secondary"
              onClick={handleUseCalculators}
            >
              <Calculator className="homepage-btn-icon" />
              <span>استخدم الآلات الحاسبة</span>
              <div className="homepage-btn-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
