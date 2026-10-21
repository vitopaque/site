import { textOf } from './mdast-text.mjs'

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

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
    const used = new Set()
    const headings = []

    for (const node of tree.children ?? []) {
      if (node.type !== 'heading' || node.depth !== 2) continue
      const text = textOf(node).trim()
      const base = slugify(text)
      if (!base) throw new Error(`${file.path ?? 'MDX'} : titre H2 sans texte exploitable.`)
      let id = base
      for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`
      used.add(id)
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
      headings.push({ id, text })
    }

    tree.children.push(exportHeadings(headings))
  }
}
