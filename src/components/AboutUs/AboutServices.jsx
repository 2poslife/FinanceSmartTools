import React from "react";
import {
  CheckCircle,
  BookOpen,
  Briefcase,
  GraduationCap,
  FileSpreadsheet,
  Settings,
} from "lucide-react";
import './AboutServices.css'
export default function AboutServices() {
  return (
    <section className="about-services">
      <h2>خدماتنا المتميزة</h2>
      <p>نقدم مجموعة شاملة من الخدمات التعليمية والتدريبية المحاسبية</p>

      <div className="services-grid">
        <div className="service-item">
          <CheckCircle />
          <span>تدريب على برامج المحاسبة الحديثة</span>
        </div>
        <div className="service-item">
          <BookOpen />
          <span>دورات المحاسبة الأساسية والمتقدمة</span>
        </div>
        <div className="service-item">
          <Briefcase />
          <span>استشارات محاسبية متخصصة</span>
        </div>
        <div className="service-item">
          <Settings />
          <span>ورش عمل في التدقيق المحاسبي</span>
        </div>
        <div className="service-item">
          <GraduationCap />
          <span>شهادات معتمدة ومعترف بها</span>
        </div>
        <div className="service-item">
          <FileSpreadsheet />
          <span>أدوات حاسبة محاسبية تفاعلية</span>
        </div>
      </div>
    </section>
  );
}
