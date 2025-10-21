import React from "react";
import "../../styles/HomePage/ServicesSectionMobile.css";

function ServicesSectionMobile() {
  const services = [
    {
      id: 1,
      title: "أدوات حاسبة محاسبية تفاعلية",
      description: "حاسبات متخصصة لحساب الضرائب والتكاليف والرواتب بدقة عالية",
      icon: "🧮",
      color: "#d4af37"
    },
    {
      id: 2,
      title: "دورات المحاسبة المتخصصة",
      description: "دورات شاملة من المبتدئ إلى المتقدم في المحاسبة المالية والتدقيق",
      icon: "📚",
      color: "#2c5aa0"
    },
    {
      id: 3,
      title: "استشارات محاسبية متخصصة",
      description: "استشارات مهنية في المحاسبة والضرائب والتخطيط المالي",
      icon: "💼",
      color: "#8b5a2b"
    }
  ];

  return (
    <section dir="rtl" className="services-section-mobile">
      <div className="services-container-mobile">
        <div className="services-header-mobile">
          <h2 className="services-title-mobile">خدماتنا المتميزة</h2>
          <p className="services-subtitle-mobile">
            نقدم مجموعة شاملة من الخدمات المحاسبية والمالية
          </p>
        </div>
        
        <div className="services-grid-mobile">
          {services.map((service) => (
            <div key={service.id} className="service-card-mobile">
              <div className="service-icon-mobile" style={{ backgroundColor: service.color }}>
                <span>{service.icon}</span>
              </div>
              <h3 className="service-title-mobile">{service.title}</h3>
              <p className="service-description-mobile">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSectionMobile;
