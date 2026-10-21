import { siteConfig } from '@/features/site-settings'
import { buildMetadata } from '@/shared/seo/metadata'

export function homeMetadata() {
  const { home, titleTemplate } = siteConfig.seo
  return buildMetadata({ ...home, path: '/', titleTemplate })
}
