import React from "react";
import { Target, Users, Award } from "lucide-react";
import './AboutValues.css'
export default function AboutValues() {
  return (
    <section className="about-values" dir="rtl">
      <div className="container">
        <h2>قيمنا ومبادئنا</h2>
        <p>نؤمن بأن التعليم المحاسبي الجيد يبني أساساً قوياً للنجاح المهني</p>

        <div className="values-grid">
          <div className="value-card">
            <Target className="value-icon" />
            <h3>دقة وموثوقية</h3>
            <p>نلتزم بأعلى معايير الدقة والشفافية في جميع خدماتنا</p>
          </div>

          <div className="value-card">
            <Users className="value-icon" />
            <h3>فريق متميز</h3>
            <p>مجموعة من أفضل المحاسبين والمدققين المعتمدين</p>
          </div>

          <div className="value-card">
            <Award className="value-icon" />
            <h3>الخبرة والاحترافية</h3>
            <p>أكثر من 15 عاماً من الخبرة في مجال المحاسبة والتدقيق</p>
          </div>
        </div>
      </div>
    </section>
  );
}
