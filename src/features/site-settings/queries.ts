import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/shared/payload/client'
import { SITE_SETTINGS_TAG } from '@/shared/payload/hooks'

export const getSeoSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'seo-settings', depth: 1 })
  },
  ['seo-settings'],
  { tags: [SITE_SETTINGS_TAG] },
)
