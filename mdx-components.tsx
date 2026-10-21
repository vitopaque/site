import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

import { ServiceAreaText } from '@/features/site-settings'
import { proseClasses } from '@/shared/ui/prose-classes'

const components: MDXComponents = {
  ServiceArea: ServiceAreaText,
  h2: (props) => <h2 {...props} className={proseClasses.h2} />,
  h3: (props) => <h3 {...props} className={proseClasses.h3} />,
  p: (props) => <p {...props} className={proseClasses.p} />,
  ul: (props) => <ul {...props} className={proseClasses.ul} />,
  ol: (props) => <ol {...props} className={proseClasses.ol} />,
  li: (props) => <li {...props} className={proseClasses.li} />,
  a: ({ href = '', ...props }) => <Link href={href} {...props} className={proseClasses.a} />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
