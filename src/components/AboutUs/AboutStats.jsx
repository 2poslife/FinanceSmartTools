import React from "react";
import "./AboutStats.css";
export default function AboutStats() {
  return (
    <section className="about-stats">
      <h2>إنجازاتنا بالأرقام</h2>
      <p>نفتخر بما حققناه من نجاحات مع طلابنا وعملائنا</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>+2000</h3>
          <p className="stat-type">طالب تخرج</p>
        </div>
        <div className="stat-card">
          <h3>+50</h3>
          <p className="stat-type">دورة تدريبية</p>
        </div>
        <div className="stat-card">
          <h3>95%</h3>
          <p className="stat-type">معدل نجاح الطلبة</p>
        </div>
        <div className="stat-card">
          <h3>15</h3>
          <p className="stat-type">سنة خبرة</p>
        </div>
      </div>
    </section>
  );
}
