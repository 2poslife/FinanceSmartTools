// Articles summary data for listings
export const articles = [
    {
        id: 1,
        title: "מאזן בוחן סופי לביקורת: המדריך שכל מנהל חשבונות חייב להכיר",
        description: "הבנת תהליך הכנת מאזן בוחן סופי לביקורת, כולל שלבי הסגירה, ההתאמות והבדיקות שכל מנהל חשבונות צריך לבצע בסוף השנה.",
        date: "9 נובמבר 2025",
        category: "הנהלת חשבונות",
        readTime: "8 דק׳",
    }
];

export const getArticleSummaryById = (id) => {
    return articles.find((article) => article.id === parseInt(id, 10));
};

export const getArticlesByCategory = (category) => {
    if (category === "all") return articles;
    return articles.filter((article) => article.category === category);
};

export const getCategoriesWithCounts = () => {
    const categories = [
        "all",
        "הנהלת חשבונות",
        "מיסים",
        "ניהול פיננסי",
        "ניתוח פיננסי",
        "ביקורת וראיית חשבון",
        "מערכות וכלים חשבונאיים",
        "טיפים מקצועיים",
    ];

    const manualCounts = {
        all: articles.length,
        "הנהלת חשבונות": articles.filter((a) => a.category === "הנהלת חשבונות").length,
    };

    return categories.map((category) => ({
        name: category,
        count: manualCounts[category] ?? 0,
    }));
};
