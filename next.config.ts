import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { NOINDEX_DIRECTIVE, noindexHeaderSources } from './src/shared/seo/indexing'

const nextConfig: NextConfig = {
  async headers() {
    return noindexHeaderSources().map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: NOINDEX_DIRECTIVE }],
    }))
  },
}

export default withPayload(nextConfig)
