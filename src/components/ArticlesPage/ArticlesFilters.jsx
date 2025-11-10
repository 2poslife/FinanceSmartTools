import React from "react";
import { getCategoriesWithCounts } from "../../assets/data/articlesData";
import "../../styles/ArticlesPage/ArticlesFilters.css";

function ArticlesFilters({ selectedCategory, setSelectedCategory }) {
  const categoriesWithCounts = getCategoriesWithCounts();

  return (
    <div className="articles-page-filters">
      {categoriesWithCounts.map((category) => (
        <button
          key={category.name}
          className={`articles-page-filter-btn ${selectedCategory === category.name ? "articles-page-active" : ""}`}
          onClick={() => setSelectedCategory(category.name)}
        >
          {category.name === "all" ? "כל המאמרים" : category.name} ({category.count})
        </button>
      ))}
    </div>
  );
}

export default ArticlesFilters;
