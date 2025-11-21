import React, { useEffect, useMemo, useState } from "react";
import ArticlesHeader from "../components/ArticlesPage/ArticlesHeader";
import ArticlesFilters from "../components/ArticlesPage/ArticlesFilters";
import ArticlesGrid from "../components/ArticlesPage/ArticlesGrid";
import { articles } from "../assets/data/articlesData";
import "../styles/ArticlesPage/ArticlesPage.css";

function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles;
    }

    return articles.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="articles-page-main">
      <ArticlesHeader />

      <div className="articles-page-content">
        <section className="articles-page-intro">
          <h2 className="articles-page-intro-title">
          מאמרים מעשיים שיעזרו לך לקבל החלטות פיננסיות חכמות          </h2>
          <p className="articles-page-intro-text">
          בחר את הקטגוריה שמעניינת אותך, וחקור מאמרים על הנהלת חשבונות, מיסים, ניהול פיננסי וניתוחים<br></br> שעוזרים לבעלי עסקים ולרו"ח בעבודתם היומיומית. אנו מעדכנים את הספרייה באופן קבוע בתוכן חדש וכלים מעשיים.

          </p>
        </section>

        <ArticlesFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredArticles.length > 0 ? (
          <ArticlesGrid filteredArticles={filteredArticles} />
        ) : (
          <div className="articles-page-empty-state">
            <h3>لم نعثر على مقالات في هذه الفئة بعد</h3>
            <p>نحن نعمل على إضافة المزيد قريباً. جرّب اختيار فئة أخرى.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
