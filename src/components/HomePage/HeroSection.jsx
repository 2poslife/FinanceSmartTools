import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { ArrowBigLeft, ArrowBigLeftDashIcon, Calculator, TrendingUp } from "lucide-react";

function HeroSection() {
  return (
    <section className="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <img
          alt="مكتب محاسبة مهني"
          src="https://plus.unsplash.com/premium_photo-1661443781814-333019eaad2d?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="blob">
          <span>حاسبات تفاعلية مدمجة بالدروس — للمسجّلين فقط</span>
          <TrendingUp />
        </div>
        <h1 className="hero-title">
          تعلم المحاسبة مع
          <span className="highlight"> الخبراء</span>
        </h1>

        <p className="hero-subtitle">
          انضم إلى آلاف الطلاب الذين طوروا مهاراتهم المحاسبية من خلال دوراتنا
          الأونلاين المتخصصة والآلات الحاسبة التفاعلية
        </p>

        <div className="hero-buttons">
          <button className="btn btn-secondary">
            <ArrowBigLeft />
            <Link to="/courses" />
            استكشف الدورات
          </button>

          <button className="btn btn-outline">
            <Link to="/calculators" />
            جرب الحاسبات
            <Calculator />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
