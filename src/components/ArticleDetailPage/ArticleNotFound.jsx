import React from "react";
import { useRouter } from "next/navigation";
import "../../styles/ArticleDetailPage/ArticleNotFound.css";

function ArticleNotFound() {
  const router = useRouter();

  return (
    <div className="article-detail-not-found">
      <h2>المقال غير موجود</h2>
      <button onClick={() => router.push("/articles")} className="article-detail-back-btn">
        العودة للمقالات
      </button>
    </div>
  );
}

export default ArticleNotFound;
