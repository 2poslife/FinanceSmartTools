import React from "react";
import "../../styles/AboutUsPage/AboutValues.css";

function AboutValues() {
  return (
    <section className="values-section">
      <div className="container">
        <h2 className="section-title">قيمنا ومبادئنا</h2>
        
        <div className="values-grid">
          <div className="value-card">
            <h3 className="value-title">الشفافية</h3>
            <p className="value-description">
              نؤمن بأن الزبون يجب أن يعرف كل التفاصيل بوضوح، ومن دون أي مفاجآت.
            </p>
          </div>
          
          <div className="value-card">
            <h3 className="value-title">الاحترافية والدقة</h3>
            <p className="value-description">
              نلتزم بأعلى معايير المهنة والدقة في كل خدمة نقدمها.
            </p>
          </div>
          
          <div className="value-card">
            <h3 className="value-title">المسؤولية</h3>
            <p className="value-description">
              نتعامل مع كل ملف، وكل معاملة، وكل زبون وكأنه الوحيد، ونمنحه الخدمة على أتم وجه.
            </p>
          </div>
          
          <div className="value-card">
            <h3 className="value-title">الابتكار</h3>
            <p className="value-description">
              نواكب التغييرات في القوانين والتكنولوجيا لنقدم حلولًا ذكية وعملية.
            </p>
          </div>
          
          <div className="value-logo-wrapper">
            <img src="/logo.png" alt="Logo" className="values-logo" />
          </div>
          
          <div className="value-card">
            <h3 className="value-title">الثقة</h3>
            <p className="value-description">
              هدفنا أن نبني علاقة طويلة المدى قائمة على الصدق والالتزام.
            </p>
          </div>
        </div>
        
        <div className="values-conclusion-card">
          <svg className="conclusion-decoration-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="0" y1="10" x2="80" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
            <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="2"/>
            <line x1="0" y1="50" x2="70" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2"/>
          </svg>
          <svg className="conclusion-decoration-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="20" y1="10" x2="100" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="2"/>
            <line x1="40" y1="30" x2="100" y2="30" stroke="rgba(0,0,0,0.15)" strokeWidth="2"/>
            <line x1="30" y1="50" x2="100" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="2"/>
          </svg>
          <p className="values-conclusion-text">
            في مكتبنا، نعمل على أساس قيم واضحة: الشفافية مع عملائنا، الاحترافية في كل خدمة، المسؤولية الكاملة عن النتائج، والابتكار في الحلول.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutValues;
