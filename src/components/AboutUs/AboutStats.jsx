import React from "react";
import { UserCheck, BookOpen, Award, Clock } from "lucide-react";
import "./AboutStats.css";

export default function AboutStats() {
  const stats = [
    { icon: <UserCheck />, value: "+2000", label: "طالب تخرج" },
    { icon: <BookOpen />, value: "+50", label: "دورة تدريبية" },
    { icon: <Award />, value: "95%", label: "معدل نجاح الطلبة" },
    { icon: <Clock />, value: "15", label: "سنة خبرة" },
  ];

  return (
    <section className="about-stats">
      <h2>إنجازاتنا بالأرقام</h2>
      <p>نفتخر بما حققناه من نجاحات مع طلابنا وعملائنا</p>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3>{stat.value}</h3>
            <p className="stat-type">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
