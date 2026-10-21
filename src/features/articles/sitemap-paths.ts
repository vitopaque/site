import { publishedArticleSlugs } from './queries'
import { blogSitemapPaths } from './seo'

export const articleSitemapPaths = async () => blogSitemapPaths(await publishedArticleSlugs())
