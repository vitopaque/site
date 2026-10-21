import { noCityInTitle, noCityNumber } from './city-rules.mjs'
import { textOf } from './mdast-text.mjs'

const walk = (node, visit) => {
  visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

export default function remarkContentRules() {
  return (tree, file) => {
    const fail = (message) => {
      throw new Error(`${file.path ?? 'MDX'} : ${message}`)
    }

    for (const block of tree.children ?? []) {
      const result = noCityNumber(textOf(block))
      if (result !== true) fail(result)
    }

    walk(tree, (node) => {
      if (node.type === 'heading' && node.depth === 1) {
        fail('titre de niveau 1 interdit dans le corps (le H1 est géré par le gabarit).')
      }
      if (
        (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
        node.name === 'h1'
      ) {
        fail('balise <h1> interdite dans le corps (le H1 est géré par le gabarit).')
      }
      if (node.type === 'image' && typeof node.alt === 'string') {
        const result = noCityInTitle(node.alt)
        if (result !== true) fail(`texte alternatif : ${result}`)
      }
    })
  }
}
