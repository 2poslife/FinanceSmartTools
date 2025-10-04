import React from 'react';
import './ArticlesSection.css';

function ArticlesSection() {
    const articles = [
        {
            id: 1,
            title: "أساسيات المحاسبة المالية",
            description: "تعلم المبادئ الأساسية للمحاسبة المالية وكيفية تطبيقها في الأعمال التجارية الصغيرة والكبيرة",
            date: "15 ديسمبر 2024",
            author: "د. أحمد زيدان",
            image: "/herosection.png",
            category: "محاسبة"
        },
        {
            id: 2,
            title: "إدارة التدفق النقدي",
            description: "نصائح عملية لإدارة التدفق النقدي في شركتك وتجنب المشاكل المالية الشائعة",
            date: "12 ديسمبر 2024",
            author: "د. أحمد زيدان",
            image: "/aboutImage.jpg",
            category: "إدارة مالية"
        },
        {
            id: 3,
            title: "الضرائب والالتزامات القانونية",
            description: "دليل شامل للضرائب والالتزامات القانونية التي يجب على كل صاحب عمل معرفتها",
            date: "10 ديسمبر 2024",
            author: "د. أحمد زيدان",
            image: "/faqImage.jpg",
            category: "ضرائب"
        }
    ];

    return (
        <section className="articles-section">
            <div className="articles-container">
                <h2 className="articles-title">مقالاتنا المالية</h2>
                <p className="articles-subtitle">نصائح ومعلومات مفيدة من خبرائنا</p>
                
                <div className="articles-grid">
                    {articles.map(article => (
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
                                
                                <button className="read-more-btn">اقرأ المزيد</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ArticlesSection;
