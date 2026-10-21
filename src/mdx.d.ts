declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const Body: ComponentType
  export const headings: readonly { id: string; text: string }[]
  export default Body
}
