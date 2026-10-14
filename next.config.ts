import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { blobImageHostname } from './src/shared/env'
import { NOINDEX_DIRECTIVE, noindexHeaderSources } from './src/shared/seo/indexing'

const blobHostname = blobImageHostname()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: blobHostname ? [{ protocol: 'https', hostname: blobHostname }] : [],
  },
  async headers() {
    return noindexHeaderSources().map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: NOINDEX_DIRECTIVE }],
    }))
  },
}

export default withPayload(nextConfig)
