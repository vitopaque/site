import { type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { ComponentType, ReactNode } from 'react'

import { proseClasses } from '@/shared/ui/prose-classes'

import { articlePath } from '../paths'

export type LinkComponent = ComponentType<{
  href: string
  className?: string
  children: ReactNode
}>

export type ImageComponent = ComponentType<{
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  className?: string
}>

type Deps = { idOf: WeakMap<object, string>; Link: LinkComponent; Image: ImageComponent }

type LinkFields = {
  linkType?: string
  url?: string | null
  newTab?: boolean
  doc?: { relationTo?: string; value?: unknown } | null
}

const IMAGE_SIZES = '(min-width: 75rem) 40rem, 100vw'
const FALLBACK_SIZE = { width: 1600, height: 900 }

const isInternalPath = (href: string): boolean => href.startsWith('/') && !href.startsWith('//')

const SAFE_PROTOCOLS: ReadonlySet<string> = new Set(['http:', 'https:', 'mailto:', 'tel:'])

export function safeHref(url: string | null | undefined): string | null {
  const href = url?.trim()
  if (!href) return null
  if (href.startsWith('#') || isInternalPath(href)) return href
  try {
    return SAFE_PROTOCOLS.has(new URL(href).protocol) ? href : null
  } catch {
    return /^[^\s:]*([/?#]|$)/.test(href) && !href.startsWith('//') ? href : null
  }
}

function hrefOf({ linkType, url, doc }: LinkFields): string | null {
  if (linkType !== 'internal') return safeHref(url)
  const target = doc?.value
  if (doc?.relationTo !== 'articles' || typeof target !== 'object' || target === null) return null
  const { slug } = target as { slug?: string | null }
  return slug ? articlePath(slug) : null
}

function renderLink(Link: LinkComponent, fields: LinkFields, children: ReactNode) {
  const href = hrefOf(fields)
  if (!href) return <>{children}</>
  if (isInternalPath(href)) {
    return (
      <Link href={href} className={proseClasses.a}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={proseClasses.a}
      {...(fields.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export const createArticleConverters =
  ({ idOf, Link, Image }: Deps): JSXConvertersFunction =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      if (node.tag === 'h2') {
        return (
          <h2 id={idOf.get(node)} className={proseClasses.h2}>
            {children}
          </h2>
        )
      }
      if (node.tag === 'h3') return <h3 className={proseClasses.h3}>{children}</h3>
      return <h4 className={proseClasses.h4}>{children}</h4>
    },
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return children.length > 0 ? <p className={proseClasses.p}>{children}</p> : null
    },
    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      return node.tag === 'ol' ? (
        <ol className={proseClasses.ol}>{children}</ol>
      ) : (
        <ul className={proseClasses.ul}>{children}</ul>
      )
    },
    listitem: ({ node, nodesToJSX }) => {
      const nested = node.children.some((child) => child.type === 'list')
      return (
        <li className={nested ? `${proseClasses.li} list-none` : proseClasses.li}>
          {nodesToJSX({ nodes: node.children })}
        </li>
      )
    },
    quote: ({ node, nodesToJSX }) => (
      <blockquote className={proseClasses.blockquote}>
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    ),
    link: ({ node, nodesToJSX }) =>
      renderLink(Link, node.fields as LinkFields, nodesToJSX({ nodes: node.children })),
    autolink: ({ node, nodesToJSX }) =>
      renderLink(Link, node.fields as LinkFields, nodesToJSX({ nodes: node.children })),
    upload: ({ node }) => {
      const media = node.value as {
        url?: string | null
        alt?: string
        mimeType?: string | null
        width?: number | null
        height?: number | null
      } | null
      if (typeof media !== 'object' || !media?.url || !media.mimeType?.startsWith('image/')) {
        return null
      }
      const alt = (node.fields as { alt?: string } | undefined)?.alt || media.alt || ''
      return (
        <figure className="blueprint relative mt-8">
          <Image
            src={media.url}
            alt={alt}
            width={media.width ?? FALLBACK_SIZE.width}
            height={media.height ?? FALLBACK_SIZE.height}
            sizes={IMAGE_SIZES}
            className="h-auto w-full"
          />
        </figure>
      )
    },
  })
