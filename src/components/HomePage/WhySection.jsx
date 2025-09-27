import React from "react";
import "./WhySection.css";
import { Award, BookOpen, Calculator, Users, PlayCircle, LifeBuoy } from "lucide-react";

function WhySection() {
  return (
    <section dir="rtl" aria-labelledby="whyus-heading" className="why-section">
      <div className="container">
        <header className="section-header">
          <h2 id="whyus-heading">لماذا نحن الخيار الأفضل؟</h2>
          <p>نقدم تجربة تعليمية متكاملة تجمع بين النظرية والتطبيق العملي</p>
        </header>

        <ul className="features-grid">
          <li className="feature-card" role="article" aria-label="دورات شاملة">
            <div className="icon-wrapper"><BookOpen /></div>
            <h3>دورات شاملة</h3>
            <p>محتوى تعليمي متكامل يغطي جميع جوانب المحاسبة.</p>
          </li>

          <li className="feature-card" role="article" aria-label="مدربين خبراء">
            <div className="icon-wrapper"><Users /></div>
            <h3>مدربين خبراء</h3>
            <p>فريق من المحاسبين والمدققين ذوي الخبرة العملية.</p>
          </li>

          <li className="feature-card" role="article" aria-label="أدوات تفاعلية">
            <div className="icon-wrapper"><Calculator /></div>
            <h3>أدوات تفاعلية</h3>
            <p>آلات حاسبة متخصصة لحل المسائل المحاسبية.</p>
          </li>

          <li className="feature-card" role="article" aria-label="شهادات معتمدة">
            <div className="icon-wrapper"><Award /></div>
            <h3>شهادات معتمدة</h3>
            <p>احصل على شهادة معتمدة بعد إنهاء الدورة بنجاح.</p>
          </li>

          {/* الجديد: بطاقتان بالمنتصف تحت الأربع بطاقات */}
          <li className="feature-card center-col-2" role="article" aria-label="دورة أونلاين 100%">
            <div className="icon-wrapper"><PlayCircle /></div>
            <h3>دورة أونلاين 100%</h3>
            <p>دروس مسجلة متاحة مدى الحياة، لتشاهدها من أي مكان وفي أي وقت بدون قيود.</p>
          </li>

          <li className="feature-card center-col-3" role="article" aria-label="مرافقة شخصية ودعم مستمر">
            <div className="icon-wrapper"><LifeBuoy /></div>
            <h3>مرافقة شخصية ودعم مستمر</h3>
            <p>مرافقة مباشرة — كل مشترك يحصل على دعم شخصي لإجابة أسئلته ومتابعة تقدمه.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default WhySection;
