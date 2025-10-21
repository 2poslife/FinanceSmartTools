import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { articles } from '../../assets/data/articlesData';
import '../../styles/HomePage/ArticlesSection.css';

function ArticlesSection() {
    // const navigate = useNavigate();
    
    // Show only first 3 articles on homepage
    // const homepageArticles = articles.slice(0, 3);

    // const handleReadMore = (article) => {
    //     navigate(`/article/${article.id}`);
    // };

    return (
        <section className="articles-section">
            <div className="articles-container">
                <h2 className="articles-title">مقالاتنا المالية</h2>
                <p className="articles-subtitle">نصائح ومعلومات مفيدة من خبرائنا</p>
                
                <div className="articles-coming-soon-message">
                    <p className="articles-coming-soon-text-hebrew">בקרוב יהיו כאן פוסטים ששווה לחכות להם</p>
                    <p className="articles-coming-soon-text-arabic">قريبًا جدًا — مقالات ونصائح مهنية لا تفوّتوها</p>
                </div>
                
                {/* <div className="articles-grid">
                    {homepageArticles.map(article => (
                        <div key={article.id} className="article-card">
                            <div className="article-image">
                                <img src={article.image} alt={article.title} />
                                <div className="article-category">{article.category}</div>
                            </div>
                            
                            <div className="article-content">
                                <h3 className="article-title">{article.title}</h3>
                                <p className="article-description">{article.description}</p>
                                
                                <div className="article-meta">
                                    <div className="article-author">بواسطة: {article.author}</div>
                                    <div className="article-date">{article.date}</div>
                                </div>
                                
                                <button 
                                className="read-more-btn"
                                onClick={() => handleReadMore(article)}
                            >
                                اقرأ المزيد
                            </button>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}

export default ArticlesSection;
