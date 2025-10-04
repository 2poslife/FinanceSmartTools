import React, { useEffect, useState } from "react";
import { articles } from "../assets/data/articlesData";
import ArticlesHeader from "../components/ArticlesPage/ArticlesHeader";
import ArticlesFilters from "../components/ArticlesPage/ArticlesFilters";
import ArticlesGrid from "../components/ArticlesPage/ArticlesGrid";
import "../styles/ArticlesPage/ArticlesPage.css";

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="articles-page-main">
      <ArticlesHeader />
      <ArticlesFilters 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <ArticlesGrid filteredArticles={filteredArticles} />
    </div>
  );
}

export default ArticlesPage;
