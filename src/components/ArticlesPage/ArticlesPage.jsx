import React, { useEffect, useState } from "react";
import "./ArticlesPage.css";

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const articles = [
    {
      id: 1,
      title: "أساسيات المحاسبة المالية",
      description:
        "تعلم المبادئ الأساسية للمحاسبة المالية وكيفية تطبيقها في الأعمال التجارية الصغيرة والكبيرة",
      date: "15 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/herosection.png",
      category: "محاسبة",
      readTime: "8 دقائق",
    },
    {
      id: 2,
      title: "إدارة التدفق النقدي",
      description:
        "نصائح عملية لإدارة التدفق النقدي في شركتك وتجنب المشاكل المالية الشائعة",
      date: "12 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/aboutImage.jpg",
      category: "إدارة مالية",
      readTime: "6 دقائق",
    },
    {
      id: 3,
      title: "الضرائب والالتزامات القانونية",
      description:
        "دليل شامل للضرائب والالتزامات القانونية التي يجب على كل صاحب عمل معرفتها",
      date: "10 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/faqImage.jpg",
      category: "ضرائب",
      readTime: "10 دقائق",
    },
    {
      id: 4,
      title: "تحليل البيانات المالية",
      description:
        "كيفية تحليل البيانات المالية لاتخاذ قرارات استراتيجية صحيحة في عملك",
      date: "8 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/qutoe.png",
      category: "تحليل مالي",
      readTime: "12 دقائق",
    },
    {
      id: 5,
      title: "مبادئ المحاسبة المتقدمة",
      description:
        "تعمق في المبادئ المحاسبية المتقدمة وتطبيقاتها في الشركات الكبيرة",
      date: "5 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/herosection.png",
      category: "محاسبة",
      readTime: "15 دقائق",
    },
    {
      id: 6,
      title: "إدارة المخاطر المالية",
      description: "استراتيجيات إدارة المخاطر المالية وحماية استثماراتك",
      date: "3 ديسمبر 2024",
      author: "د. أحمد زيدان",
      image: "/aboutImage.jpg",
      category: "إدارة مالية",
      readTime: "9 دقائق",
    },
  ];

  const categories = ["all", "محاسبة", "إدارة مالية", "ضرائب", "تحليل مالي"];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const categoryStats = {
    محاسبة: articles.filter((a) => a.category === "محاسبة").length,
    "إدارة مالية": articles.filter((a) => a.category === "إدارة مالية").length,
    ضرائب: articles.filter((a) => a.category === "ضرائب").length,
    "تحليل مالي": articles.filter((a) => a.category === "تحليل مالي").length,
  };

  return (
    <div className="articles-page">
      <div className="articles-header">
        <h1 className="page-title">مقالاتنا المالية</h1>
        <p className="page-subtitle">نصائح ومعلومات مفيدة من خبرائنا</p>
      </div>

      <div className="articles-filters">
        <button
          className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          جميع المقالات ({articles.length})
        </button>
        {categories.slice(1).map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({categoryStats[category]})
          </button>
        ))}
      </div>

      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-image">
              <img src={article.image} alt={article.title} />
              <div className="article-category">{article.category}</div>
            </div>

            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>

              <div className="article-meta">
                <div className="article-author">بواسطة: {article.author}</div>
                <div className="article-date">{article.date}</div>
                <div className="article-read-time">{article.readTime}</div>
              </div>

              <button className="read-more-btn">اقرأ المزيد</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
