import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ArticlesPage/ArticlesGrid.css";

function ArticlesGrid({ filteredArticles }) {
  const navigate = useNavigate();

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="articles-page-grid">
      {filteredArticles.map((article) => (
        <div key={article.id} className="articles-page-card">
          <div className="articles-page-image">
            <img src={article.image} alt={article.title} />
            <div className="articles-page-category">{article.category}</div>
          </div>

          <div className="articles-page-content">
            <h3 className="articles-page-card-title">{article.title}</h3>
            <p className="articles-page-card-description">{article.description}</p>

            <div className="articles-page-meta">
              <div className="articles-page-author">بواسطة: {article.author}</div>
              <div className="articles-page-date">{article.date}</div>
              <div className="articles-page-read-time">{article.readTime}</div>
            </div>

            <button 
              className="articles-page-read-more-btn"
              onClick={() => handleReadMore(article)}
            >
              اقرأ المزيد
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlesGrid;
