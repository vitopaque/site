import { absoluteUrl } from './metadata'

type JsonLdProps = { data: Record<string, unknown> }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export type Crumb = { name: string; path: string }

export const breadcrumbList = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
})

export const faqPage = (items: readonly { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

type VideoInput = {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
}

export const videoObject = (video: VideoInput) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  ...video,
})

type BlogPostingInput = {
  headline: string
  description: string
  path: string
  image: string | null
  datePublished: string
  dateModified: string
  author: { name: string; url?: string | null } | null
}

const isoDate = (value: string): string => new Date(value).toISOString()

export const blogPosting = (post: BlogPostingInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.headline,
  description: post.description,
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(post.path) },
  ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
  datePublished: isoDate(post.datePublished),
  dateModified: isoDate(post.dateModified),
  ...(post.author
    ? {
        author: {
          '@type': 'Person',
          name: post.author.name,
          ...(post.author.url ? { url: post.author.url } : {}),
        },
      }
    : {}),
})
