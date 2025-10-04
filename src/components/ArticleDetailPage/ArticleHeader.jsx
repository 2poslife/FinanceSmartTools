import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock, Share2 } from "lucide-react";
import "../../styles/ArticleDetailPage/ArticleHeader.css";

function ArticleHeader({ article }) {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط!');
    }
  };

  return (
    <div className="article-detail-header">
      <button onClick={() => navigate(-1)} className="article-detail-back-button">
        <ArrowRight /> العودة
      </button>
      
      <div className="article-detail-meta">
        <div className="article-detail-meta-item">
          <Calendar size={16} />
          <span>{article.date}</span>
        </div>
        <div className="article-detail-meta-item">
          <User size={16} />
          <span>{article.author}</span>
        </div>
        <div className="article-detail-meta-item">
          <Clock size={16} />
          <span>{article.readTime}</span>
        </div>
        <button className="article-detail-share-btn" onClick={handleShare}>
          <Share2 size={18} />
          مشاركة
        </button>
      </div>
    </div>
  );
}

export default ArticleHeader;
