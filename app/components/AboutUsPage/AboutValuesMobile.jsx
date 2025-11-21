import React from "react";
import "../../styles/AboutUsPage/AboutValuesMobile.css";

function AboutValuesMobile() {
  return (
    <div className="mobile-values-section">
      <div className="mobile-values-container">
        <div className="mobile-values-header">
          <h2 className="mobile-values-title">قيمنا ومبادئنا</h2>
        </div>
        
        <div className="mobile-values-grid">
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الشفافية</h3>
            <p className="mobile-value-description">
              نؤمن بأن الزبون يجب أن يعرف كل التفاصيل بوضوح، ومن دون أي مفاجآت.
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الاحترافية والدقة</h3>
            <p className="mobile-value-description">
              نلتزم بأعلى معايير المهنة والدقة في كل خدمة نقدمها.
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">المسؤولية</h3>
            <p className="mobile-value-description">
              نتعامل مع كل ملف، وكل معاملة، وكل زبون وكأنه الوحيد، ونمنحه الخدمة على أتم وجه.
            </p>
          </div>
          
          <div className="mobile-value-item">
            <h3 className="mobile-value-title">الابتكار</h3>
            <p className="mobile-value-description">
              نواكب التغييرات في القوانين والتكنولوجيا لنقدم حلولًا ذكية وعملية.
            </p>
          </div>
          
          <div className="mobile-value-item mobile-value-item-last">
            <h3 className="mobile-value-title">الثقة</h3>
            <p className="mobile-value-description">
              هدفنا أن نبني علاقة طويلة المدى قائمة على الصدق والالتزام.
            </p>
          </div>
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
