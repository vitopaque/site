import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

const components: MDXComponents = {
  h2: (props) => <h2 {...props} className="text-headline-md mt-12 uppercase first:mt-0" />,
  h3: (props) => <h3 {...props} className="text-headline-sm mt-8 uppercase" />,
  p: (props) => <p {...props} className="text-body-lg mt-4 text-pretty" />,
  ul: (props) => <ul {...props} className="text-body-lg mt-4 list-disc pl-6" />,
  ol: (props) => <ol {...props} className="text-body-lg mt-4 list-decimal pl-6" />,
  li: (props) => <li {...props} className="mt-2" />,
  a: ({ href = '', ...props }) => (
    <Link href={href} {...props} className="text-accent-700 underline underline-offset-4" />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
