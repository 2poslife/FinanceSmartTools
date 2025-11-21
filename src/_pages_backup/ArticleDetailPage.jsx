import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleDetailById } from '../assets/data/articleDetailData';
import ArticleHeader from '../components/ArticleDetailPage/ArticleHeader';
import ArticleContent from '../components/ArticleDetailPage/ArticleContent';
import ArticleNotFound from '../components/ArticleDetailPage/ArticleNotFound';
import '../styles/ArticleDetailPage/ArticleDetailPage.css';

const ArticleDetailPage = () => {
    const { id } = useParams();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const article = getArticleDetailById(id);

    if (!article) {
        return <ArticleNotFound />;
    }

    return (
        <div className="article-detail-page-main">
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
        </div>
    );
};

export default ArticleDetailPage;
