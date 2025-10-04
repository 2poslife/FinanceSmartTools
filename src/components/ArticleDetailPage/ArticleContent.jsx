import React from "react";
import { BookOpen } from "lucide-react";
import "../../styles/ArticleDetailPage/ArticleContent.css";

function ArticleContent({ article }) {
  return (
    <div className="article-detail-content">
      <div className="article-detail-category-badge">
        <BookOpen size={16} />
        <span>{article.category}</span>
      </div>
      
      <h1 className="article-detail-title">{article.title}</h1>
      
      <div 
        className="article-detail-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

export default ArticleContent;
