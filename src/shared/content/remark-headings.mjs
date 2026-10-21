import { createHeadingIds } from './heading-id.mjs'
import { textOf } from './mdast-text.mjs'

const literal = (value) => ({ type: 'Literal', value })
const property = (key, value) => ({
  type: 'Property',
  kind: 'init',
  method: false,
  shorthand: false,
  computed: false,
  key: { type: 'Identifier', name: key },
  value: literal(value),
})

const exportHeadings = (headings) => ({
  type: 'mdxjsEsm',
  value: '',
  data: {
    estree: {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ExportNamedDeclaration',
          specifiers: [],
          source: null,
          attributes: [],
          declaration: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'headings' },
                init: {
                  type: 'ArrayExpression',
                  elements: headings.map(({ id, text }) => ({
                    type: 'ObjectExpression',
                    properties: [property('id', id), property('text', text)],
                  })),
                },
              },
            ],
          },
        },
      ],
    },
  },
})

export default function remarkHeadings() {
  return (tree, file) => {
    const headingId = createHeadingIds()
    const headings = []

    for (const node of tree.children ?? []) {
      if (node.type !== 'heading' || node.depth !== 2) continue
      const text = textOf(node).trim()
      const id = headingId(text)
      if (!id) throw new Error(`${file.path ?? 'MDX'} : titre H2 sans texte exploitable.`)
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
      headings.push({ id, text })
    }

    tree.children.push(exportHeadings(headings))
  }
}
