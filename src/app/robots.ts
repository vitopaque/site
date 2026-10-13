import type { MetadataRoute } from 'next'
import { robotsRules } from '@/shared'

export default function robots(): MetadataRoute.Robots {
  return robotsRules()
}
