import React from "react";
import { BookOpen, Users, Award } from "lucide-react"; // icons

const stats = [
  { icon: <BookOpen />, value: "50+", label: "دورات متاحة" },
  { icon: <Users />, value: "1200+", label: "طلاب مسجلين" },
  { icon: <Award />, value: "10+", label: "سنوات خبرة" },
];

const CoursesStats = () => {
  return (
    <section className="courses-stats">
      <h2>إحصائيات الدورات</h2>
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
};

export default CoursesStats;
