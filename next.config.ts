import path from 'node:path'

import createMDX from '@next/mdx'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { blobImageHostname } from './src/shared/env'
import { NOINDEX_DIRECTIVE, noindexHeaderSources } from './src/shared/seo/indexing'

const blobHostname = blobImageHostname()

const LEGACY_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/index.php', '/'],
  ['/nos-realisations', '/realisations'],
  ['/contactez-nous', '/contact-devis'],
  ['/foire-aux-questions', '/film-solaire-batiment'],
  ['/blog', '/conseils-expertises'],
  ['/enseignes-vitrophanie-et-signaletique-vehicule', '/vitrophanie-signaletique'],
  ['/blog/vitrophanie-dentreprise', '/vitrophanie-signaletique'],
  ['/blog/protection-des-locaux', '/film-securite-anti-effraction'],
  ['/blog/proprete-et-securite-des-commerces', '/film-securite-anti-effraction'],
  ['/blog/automobile-securite', '/vitres-teintees-auto'],
  ['/blog/technologie-innovation', '/film-pdlc-cristaux-liquides'],
  ['/blog/batiment-bureaux', '/film-solaire-batiment'],
  ['/blog/questions-frequentes-installation-entretien', '/film-solaire-batiment'],
  ['/blog/diy-vs-pro', '/film-solaire-batiment'],
  ['/blog/3-quels-sont-les-differents-types-de-films-solaires', '/film-solaire-batiment'],
  ['/blog/le-film-solaire-ideal', '/film-solaire-batiment'],
  ['/blog/films-solaires-sur-vitrages', '/film-solaire-batiment'],
]

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  images: {
    remotePatterns: blobHostname ? [{ protocol: 'https', hostname: blobHostname }] : [],
  },
  async redirects() {
    return [
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301 as const,
        ...(source === '/blog' ? { missing: [{ type: 'query' as const, key: 'format' }] } : {}),
      })),
      {
        source: '/conseils-expertises/page/1',
        destination: '/conseils-expertises',
        statusCode: 301 as const,
      },
    ]
  },
  async headers() {
    return noindexHeaderSources().map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: NOINDEX_DIRECTIVE }],
    }))
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      path.join(process.cwd(), 'src/shared/content/remark-content-rules.mjs'),
      path.join(process.cwd(), 'src/shared/content/remark-headings.mjs'),
    ],
  },
})

export default withPayload(withMDX(nextConfig))
