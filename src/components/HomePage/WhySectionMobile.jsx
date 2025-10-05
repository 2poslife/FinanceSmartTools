import React from "react";
import "../../styles/HomePage/WhySectionMobile.css";
import {
  Award,
  Book,
  CircleCheckBig,
  Users,
} from "lucide-react";

function WhySectionMobile() {
  const features = [
    {
      icon: Book,
      title: "سرعة في الإنجاز",
      description: "معالجة الملفات وتقديم التقارير خلال وقت قياسي، دون المساس بالجودة أو الدقة."
    },
    {
      icon: CircleCheckBig,
      title: "دقة وجودة العمل",
      description: "نقدّم خدماتنا بأعلى مستويات الدقة والاحتراف لضمان نتائج صحيحة وخالية من الأخطاء."
    },
    {
      icon: Users,
      title: "دعم ومرافقة شخصية",
      description: "مرافقة مستمرة وخدمة عملاء شخصية — نرافقك خطوة بخطوة، ونجيب على جميع أسئلتك."
    },
    {
      icon: Award,
      title: "مصداقية وأمان تام",
      description: "جميع بياناتك المالية محفوظة بسرية تامة، ونعمل وفق أعلى معايير المصداقية والخصوصية."
    }
  ];

  return (
    <section dir="rtl" className="why-section-mobile">
      <div className="why-container-mobile">
        <div className="section-header-mobile">
          <h2 className="section-title-mobile">لماذا نحن الخيار الأفضل؟</h2>
          <p className="section-subtitle-mobile">
            نقدم تجربة تعليمية متكاملة تجمع بين النظرية والتطبيق العملي
          </p>
        </div>

        <div className="features-grid-mobile">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card-mobile">
                <div className="feature-icon-mobile">
                  <IconComponent className="icon" />
                </div>
                <h3 className="feature-title-mobile">{feature.title}</h3>
                <p className="feature-description-mobile">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhySectionMobile;
