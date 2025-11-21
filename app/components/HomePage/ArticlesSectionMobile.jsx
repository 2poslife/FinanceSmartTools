import React from "react";
import "../../styles/HomePage/ArticlesSectionMobile.css";

function ArticlesSectionMobile() {
  // const articles = [
  //   {
  //     id: 1,
  //     title: "أساسيات المحاسبة المالية",
  //     excerpt: "تعلم المبادئ الأساسية للمحاسبة المالية وأهميتها في الأعمال",
  //     category: "محاسبة",
  //     readTime: "5 دقائق"
  //   },
  //   {
  //     id: 2,
  //     title: "كيفية إعداد الميزانية",
  //     excerpt: "خطوات مفصلة لإعداد ميزانية الشركة بطريقة صحيحة",
  //     category: "ميزانية",
  //     readTime: "8 دقائق"
  //   },
  //   {
  //     id: 3,
  //     title: "الضرائب والالتزامات",
  //     excerpt: "كل ما تحتاج معرفته عن الضرائب والالتزامات القانونية",
  //     category: "ضرائب",
  //     readTime: "6 دقائق"
  //   }
  // ];

  return (
    <section dir="rtl" className="articles-section-mobile">
      <div className="articles-container-mobile">
        <div className="articles-header-mobile">
          <h2 className="articles-title-mobile">مقالاتنا المالية</h2>
          <p className="articles-subtitle-mobile">
            نصائح ومعلومات مفيدة من خبرائنا
          </p>
        </div>

        <div className="coming-soon-message-mobile">
          <p className="coming-soon-text-hebrew-mobile">בקרוב יהיו כאן פוסטים ששווה לחכות להם</p>
          <p className="coming-soon-text-arabic-mobile">قريبًا جدًا — مقالات ونصائح مهنية لا تفوّتوها</p>
        </div>

        {/* <div className="articles-grid-mobile">
          {articles.map((article) => (
            <div key={article.id} className="article-card-mobile">
              <div className="article-category-mobile">
                <span className="category-badge-mobile">{article.category}</span>
                <span className="read-time-mobile">⏱️ {article.readTime}</span>
              </div>
              <h3 className="article-title-mobile">{article.title}</h3>
              <p className="article-excerpt-mobile">{article.excerpt}</p>
              <button className="read-more-btn-mobile">اقرأ المزيد</button>
            </div>
          ))}
        </div>

        <div className="articles-cta-mobile">
          <button className="view-all-btn-mobile">عرض جميع المقالات</button>
        </div> */}
      </div>
    </section>
  );
}

export default ArticlesSectionMobile;
