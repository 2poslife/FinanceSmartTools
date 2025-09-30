import React from "react";
import "./Courses.css";
import HeroImage from "../../assets/courses-hero.jpg"; // replace with your image path

const CoursesHero = () => {
  return (
    <section className="courses-hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>مرحبا بكم في قسم الدورات</h1>
          <p>وكما عوّدناكم دائمًا، مستمرون في مساعدتكم لتصبحوا</p>

          <div className="blob-container">
            <div className="blob">محاسبين مستقلين ناجحين بأعمالكم</div>
            <div className="blob">
              موظفين محترفين، واثقين بأنفسكم، غير معتمدين على أحد
            </div>
          </div>

          <p>.و مكتبنا ليس مجرد مكتب حسابات بل بوصلتك للنجاح</p>
          <p>
            نحن نقدم كورسات مصممة لتناسب احتياجات المحاسبين في التعامل مع كل
            مجال. له أدواته، لغته، وتقنياته — وهنا ستجد كورسات متخصصة لكل مجال
            لتكون محاسبًا أكثر احترافًا وأكثر ثقة.
          </p>

          <div className="blob-container">
            <div className="blob">الأفراد — أجيرين ومستقلين</div>
            <div className="blob">
              الشركات — تقارير مالية، إدارة حسابات، وتدقيق تقارير شركات
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={HeroImage} alt="Courses Hero" />
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;
