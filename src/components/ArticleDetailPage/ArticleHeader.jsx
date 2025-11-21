import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import "../../styles/ArticleDetailPage/ArticleHeader.css";

function ArticleHeader({ article }) {
  const router = useRouter();

  // Removed unused handleShare function

  return (
    <div className="article-detail-header">
      <button onClick={() => router.back()} className="article-detail-back-button">
        <ArrowRight /> חזרה
      </button>
      
      <div className="article-detail-meta">
        <div className="article-detail-meta-item">
          <Calendar size={16} />
          <span>{article.date}</span>
        </div>
        <div className="article-detail-meta-item">
          <Clock size={16} />
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleHeader;
