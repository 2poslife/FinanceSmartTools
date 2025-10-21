import React from "react";
import "../../styles/CoursesPage/CoursesHero.css";

function CoursesHero() {
  return (
    <section className="courses-hero-section">
      <div className="courses-hero-content-wrapper">
        <h1 className="courses-hero-main-title">دورات مصممة لتناسب احتياجات المحاسبين في التعامل مع:</h1>
        <div className="courses-hero-intro">
          <ul>
            <li className="courses-hero-intro-point">الأفراد - أجيرين ومستقلين</li>
            <li className="courses-hero-intro-point">الشركات - تقارير مالية، إدارة حسابات، وتدقيق تقارير شركات</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CoursesHero;
