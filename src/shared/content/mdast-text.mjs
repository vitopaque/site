const PHRASING = new Set([
  'text',
  'emphasis',
  'strong',
  'link',
  'inlineCode',
  'delete',
  'linkReference',
])

export const textOf = (node) => {
  if (typeof node.value === 'string' && node.type !== 'html') return node.value
  const children = node.children ?? []
  const separator = children.every((child) => PHRASING.has(child.type)) ? '' : ' '
  return children.map(textOf).join(separator)
}
