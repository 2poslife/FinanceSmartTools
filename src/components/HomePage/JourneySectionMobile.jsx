import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage/JourneySectionMobile.css";
import { BookOpen, Calculator } from "lucide-react";

function JourneySectionMobile() {
  const navigate = useNavigate();

  const handleBrowseCourses = () => {
    navigate("/courses");
  };

  const handleUseCalculators = () => {
    navigate("/CalculatorsPage");
  };

  return (
    <section className="homepage-journey-section-mobile">
      {/* Background Elements */}
      <div className="homepage-journey-bg-mobile">
        <div className="homepage-journey-overlay-mobile"></div>
        <div className="homepage-journey-shapes-mobile">
          <div className="homepage-shape-1-mobile"></div>
          <div className="homepage-shape-2-mobile"></div>
        </div>
      </div>

      {/* Content */}
      <div className="homepage-journey-container-mobile">
        <div className="homepage-journey-content-mobile">
          <h2 className="homepage-journey-title-mobile">ابدأ رحلتك المحاسبية اليوم</h2>
          
          <p className="homepage-journey-subtitle-mobile">
            لا تفوت الفرصة في الانضمام الى مجتمعنا من المحاسبين
          </p>

          <div className="homepage-journey-stats-mobile">
            <div className="homepage-stat-item-mobile">
              <span className="homepage-stat-number-mobile">400+</span>
              <span className="homepage-stat-label-mobile">محاسب محترف</span>
            </div>
            <div className="homepage-stat-item-mobile homepage-logo-stat-mobile">
              <img src="/logo.png" alt="Logo" className="homepage-stat-logo-mobile" />
              <span className="homepage-stat-label-mobile">مكتب زيدان</span>
            </div>
            <div className="homepage-stat-item-mobile">
              <span className="homepage-stat-number-mobile">أدوات عملية</span>
              <span className="homepage-stat-label-mobile">ومحدّثة باستمرار</span>
            </div>
          </div>

          <div className="homepage-journey-actions-mobile">
            <button 
              className="homepage-journey-btn-mobile homepage-btn-primary-mobile"
              onClick={handleBrowseCourses}
            >
              <BookOpen className="homepage-btn-icon-mobile" />
              <span>تصفح الدورات</span>
            </button>
            <button 
              className="homepage-journey-btn-mobile homepage-btn-secondary-mobile"
              onClick={handleUseCalculators}
            >
              <Calculator className="homepage-btn-icon-mobile" />
              <span>استخدم الآلات الحاسبة</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySectionMobile;