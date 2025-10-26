import React from "react";
import "../../styles/AboutUsPage/AboutValuesMobile.css";

function AboutValuesMobile() {
  return (
    <div className="mobile-values-section">
      <div className="mobile-values-container">
        <div className="mobile-values-header">
          <h2 className="mobile-values-title">قيمنا ومبادئنا</h2>
          <p className="mobile-values-subtitle">
            نؤمن بأن التعليم المحاسبي الجيد يبني أساساً قوياً للنجاح المهني
          </p>
        </div>
        
        <div className="mobile-values-grid">
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الشفافية</h3>
            <p className="mobile-value-description">
              نؤمن بأن الزبون يجب أن يعرف كل التفاصيل بوضوح
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الاحترافية</h3>
            <p className="mobile-value-description">
              نلتزم بأعلى معايير المهنة والدقة في كل خدمة
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">المسؤولية</h3>
            <p className="mobile-value-description">
              نتعامل مع كل ملف وكأنه الوحيد ونمنحه الخدمة على أتم وجه
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الابتكار</h3>
            <p className="mobile-value-description">
              نواكب التغييرات لنقدم حلولًا ذكية وعملية
            </p>
          </div>
        </div>
        
        <div className="mobile-values-logo">
          <img src="/logo.png" alt="Logo" className="mobile-logo-image" />
        </div>
        
        <div className="mobile-values-conclusion">
          <p className="mobile-conclusion-text">
            في مكتبنا، نعمل على أساس قيم واضحة: الشفافية مع عملائنا، الاحترافية في كل خدمة، المسؤولية الكاملة عن النتائج، والابتكار في الحلول.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutValuesMobile;
