import React, { useEffect } from "react";
import ArticlesHeader from "../components/ArticlesPage/ArticlesHeader";
import "../styles/ArticlesPage/ArticlesPage.css";

function ArticlesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="articles-page-main">
      <ArticlesHeader />
      
      <div className="coming-soon-page">
        <div className="coming-soon-page-content">
          <p className="coming-soon-page-text-hebrew">בקרוב יהיו כאן פוסטים ששווה לחכות להם</p>
          <p className="coming-soon-page-text-arabic">قريبًا جدًا — مقالات ونصائح مهنية لا تفوّتوها</p>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;
