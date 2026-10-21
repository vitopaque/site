export { Articles } from './collection'
export { ArticleDetailPage } from './components/ArticleDetailPage'
export { ArticlesIndexPage } from './components/ArticlesIndexPage'
export { GuidesSection } from './components/GuidesSection'
export { guidesForService, guidesForUnivers, homeGuides } from './guides'
export { getIndexPage } from './index-page'
export { ARTICLES_PATH, articlePath, parsePageNumber } from './paths'
export { getPublishedArticle, listPublishedArticles, publishedArticleSlugs } from './queries'
export { articleSitemapPaths } from './sitemap-paths'
export { articleMetadata, articleSeoEntries, indexMetadata } from './seo'
export { articleSlugRule } from './slug'
export type {
  ArticleAuthor,
  ArticleCardItem,
  ArticleDetail,
  ArticleImage,
  ArticlePage,
  ArticleSlugEntry,
  ArticleSummary,
  Guide,
} from './types'
