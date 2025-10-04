import React from "react";
import "../../styles/HomePage/WhySection.css";
import {
  Award,
  BookOpen,
  Calculator,
  Users,
  PlayCircle,
  LifeBuoy,
  Book,
  CircleCheckBig,
} from "lucide-react";

function WhySection() {
  return (
    <section dir="rtl" aria-labelledby="whyus-heading" className="why-section">
      <div className="container">
        <header className="section-header">
          <h2 id="whyus-heading">لماذا نحن الخيار الأفضل؟</h2>
          <p>نقدم تجربة تعليمية متكاملة تجمع بين النظرية والتطبيق العملي</p>
        </header>

        <ul className="features-grid">
          <li
            className="feature-card"
            role="article"
            aria-label="سرعة في الإنجاز"
          >
            <div className="icon-wrapper">
              <Book />
            </div>
            <h3>سرعة في الإنجاز</h3>
            <p>معالجة الملفات وتقديم التقارير خلال وقت قياسي، دون المساس بالجودة أو الدقة.</p>
          </li>

          <li className="feature-card" role="article" aria-label="دقة وجودة العمل">
            <div className="icon-wrapper">
              <CircleCheckBig />
            </div>
            <h3>دقة وجودة العمل</h3>
            <p>نقدّم خدماتنا بأعلى مستويات الدقة والاحتراف لضمان نتائج صحيحة وخالية من الأخطاء.</p>
          </li>

          <li
            className="feature-card"
            role="article"
            aria-label="دعم ومرافقة شخصية"
          >
            <div className="icon-wrapper">
              <Users />
            </div>
            <h3>دعم ومرافقة شخصية</h3>
            <p>مرافقة مستمرة وخدمة عملاء شخصية — نرافقك خطوة بخطوة، ونجيب على جميع أسئلتك.</p>
          </li>

          <li
            className="feature-card"
            role="article"
            aria-label="مصداقية وأمان تام"
          >
            <div className="icon-wrapper">
              <Award />
            </div>
            <h3>مصداقية وأمان تام</h3>
            <p>جميع بياناتك المالية محفوظة بسرية تامة، ونعمل وفق أعلى معايير المصداقية والخصوصية.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default WhySection;
