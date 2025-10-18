import React, { useEffect } from "react";
// import { articles } from "../assets/data/articlesData";
import ArticlesHeader from "../components/ArticlesPage/ArticlesHeader";
// import ArticlesFilters from "../components/ArticlesPage/ArticlesFilters";
// import ArticlesGrid from "../components/ArticlesPage/ArticlesGrid";
import "../styles/ArticlesPage/ArticlesPage.css";

function ArticlesPage() {
  // const [selectedCategory, setSelectedCategory] = useState("all");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const filteredArticles =
  //   selectedCategory === "all"
  //     ? articles
  //     : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="articles-page-main">
      <ArticlesHeader />
      
      <div className="coming-soon-page">
        <div className="coming-soon-page-content">
          <p className="coming-soon-page-text-hebrew">בקרוב יהיו כאן פוסטים ששווה לחכות להם</p>
          <p className="coming-soon-page-text-arabic">قريبًا جدًا — مقالات ونصائح مهنية لا تفوّتوها</p>
        </div>
      </div>
      
      {/* <ArticlesFilters 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <ArticlesGrid filteredArticles={filteredArticles} /> */}
    </div>
  );
}

export default ArticlesPage;
