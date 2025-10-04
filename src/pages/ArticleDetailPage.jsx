import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { getArticleById } from '../assets/data/articlesData';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const article = getArticleById(id);

    if (!article) {
        return (
            <div className="article-not-found">
                <h2>المقال غير موجود</h2>
                <button onClick={() => navigate("/articles")} className="back-btn">
                    العودة للمقالات
                </button>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ الرابط!');
        }
    };

    return (
        <div className="article-detail-page">
            <div className="article-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <ArrowRight /> العودة
                </button>
                
                <div className="article-meta">
                    <div className="meta-item">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                    </div>
                    <div className="meta-item">
                        <User size={16} />
                        <span>{article.author}</span>
                    </div>
                    <div className="meta-item">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                    </div>
                    <button className="share-btn" onClick={handleShare}>
                        <Share2 size={18} />
                        مشاركة
                    </button>
                </div>
            </div>

            <div className="article-content">
                <div className="article-category-badge">
                    <BookOpen size={16} />
                    <span>{article.category}</span>
                </div>
                
                <h1 className="article-title">{article.title}</h1>
                
                <div 
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
};

export default ArticleDetailPage;
