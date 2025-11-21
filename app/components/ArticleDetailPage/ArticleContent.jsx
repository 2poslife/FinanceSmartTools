import React from "react";
import { BookOpen, Clock, Calendar, NotebookPen } from "lucide-react";
import "../../styles/ArticleDetailPage/ArticleContent.css";

function ArticleContent({ article }) {
  return (
    <article className="article-detail-content" aria-labelledby="article-hero-title">
      <div className="article-hero">
        <div className="article-hero-overlay" aria-hidden="true" />
        <div className="article-hero-inner">
          <div className="article-hero-icon" aria-hidden="true">
            <NotebookPen size={40} />
          </div>

          <div className="article-hero-chips" role="list">
            <span className="article-chip" role="listitem">
              <BookOpen size={16} />
              <span>{article.category}</span>
            </span>
            {article.readTime && (
              <span className="article-chip" role="listitem">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </span>
            )}
            {article.date && (
              <span className="article-chip" role="listitem">
                <Calendar size={16} />
                <span>{article.date}</span>
              </span>
            )}
          </div>

          <h1 id="article-hero-title" className="article-hero-title">
            {article.title}
          </h1>

          {article.description && (
            <p className="article-hero-subtitle">{article.description}</p>
          )}
        </div>
      </div>

      <div
        className="article-detail-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}

export default ArticleContent;
