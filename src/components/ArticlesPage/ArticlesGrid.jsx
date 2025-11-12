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
          <div className="articles-page-card-image">
            <img src="/aaa.svg" alt={article.title} />
          </div>
          <div className="articles-page-card-header">
            <span className="articles-page-category">{article.category}</span>
            <span className="articles-page-read-time">{article.readTime}</span>
          </div>

          <div className="articles-page-card-body">
            <h3 className="articles-page-card-title">{article.title}</h3>
            <p className="articles-page-card-description">{article.description}</p>
          </div>

          <div className="articles-page-card-footer">
            {article.author && (
              <div className="articles-page-author">
                <span className="articles-page-author-label">מאת</span>
                <span>{article.author}</span>
              </div>
            )}
            <div className="articles-page-date">{article.date}</div>
          </div>

          <button
            className="articles-page-read-more-btn"
            onClick={() => handleReadMore(article)}
          >
            קרא עוד
          </button>
        </div>
      ))}
    </div>
  );
}

export default ArticlesGrid;
