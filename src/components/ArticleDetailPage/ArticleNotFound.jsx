import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ArticleDetailPage/ArticleNotFound.css";

function ArticleNotFound() {
  const navigate = useNavigate();

  return (
    <div className="article-detail-not-found">
      <h2>المقال غير موجود</h2>
      <button onClick={() => navigate("/articles")} className="article-detail-back-btn">
        العودة للمقالات
      </button>
    </div>
  );
}

export default ArticleNotFound;
