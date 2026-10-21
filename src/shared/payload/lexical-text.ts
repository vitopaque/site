type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] }

const INLINE_TYPES: ReadonlySet<string> = new Set(['text', 'linebreak', 'tab', 'link', 'autolink'])

const inlineText = (node: LexicalNode): string => {
  if (node.type === 'text') return node.text ?? ''
  if (node.type === 'linebreak') return '\n'
  return (node.children ?? []).map(inlineText).join('')
}

export function lexicalTexts(node: LexicalNode | null | undefined): string[] {
  const children = node?.children ?? []
  if (children.some((child) => INLINE_TYPES.has(child.type ?? ''))) return [inlineText(node ?? {})]
  return children.flatMap(lexicalTexts)
}
