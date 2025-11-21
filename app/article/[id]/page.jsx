'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getArticleDetailById } from '@/lib/data/articleDetailData'
import ArticleHeader from '@/src/components/ArticleDetailPage/ArticleHeader'
import ArticleContent from '@/src/components/ArticleDetailPage/ArticleContent'
import ArticleNotFound from '@/src/components/ArticleDetailPage/ArticleNotFound'
import '@/src/styles/ArticleDetailPage/ArticleDetailPage.css'

export default function ArticleDetailPage() {
  const params = useParams()
  const id = params.id

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const article = getArticleDetailById(id)

  if (!article) {
    return <ArticleNotFound />
  }

  return (
    <div className="article-detail-page-main">
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
    </div>
  )
}

