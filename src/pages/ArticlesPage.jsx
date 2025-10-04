import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { articles, getCategoriesWithCounts } from "../assets/data/articlesData";
import "./ArticlesPage.css";

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoriesWithCounts = getCategoriesWithCounts();

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="articles-page">
      <div className="articles-header">
        <h1 className="page-title">مقالاتنا المالية</h1>
        <p className="page-subtitle">نصائح ومعلومات مفيدة من خبرائنا</p>
      </div>

      <div className="articles-filters">
        {categoriesWithCounts.map((category) => (
          <button
            key={category.name}
            className={`filter-btn ${selectedCategory === category.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name === "all" ? "جميع المقالات" : category.name} ({category.count})
          </button>
        ))}
      </div>

      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="articles-page-card">
            <div className="articles-page-image">
              <img src={article.image} alt={article.title} />
              <div className="articles-page-category">{article.category}</div>
            </div>

            <div className="articles-page-content">
              <h3 className="articles-page-title">{article.title}</h3>
              <p className="articles-page-description">{article.description}</p>

              <div className="articles-page-meta">
                <div className="articles-page-author">بواسطة: {article.author}</div>
                <div className="articles-page-date">{article.date}</div>
                <div className="articles-page-read-time">{article.readTime}</div>
              </div>

              <button 
                className="read-more-btn"
                onClick={() => handleReadMore(article)}
              >
                اقرأ المزيد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
