import type {
  RichTextFieldValidation,
  TextareaFieldValidation,
  TextFieldSingleValidation,
} from 'payload'
import { text, textarea } from 'payload/shared'

type Rule = (value: string) => true | string

const CITY = /montpellier/
const CITY_WITH_NUMBER = /montpellier[^\p{L}\p{N}]{0,3}34(?:\d{3})?(?!\d)|\b34[\s.-]?740\b/u

const normalize = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/g, '')
    .replace(/[‐-―−]/g, '-')
    .toLowerCase()

export const noCityInTitle: Rule = (value) => {
  const normalized = normalize(value)
  return CITY.test(normalized) || CITY_WITH_NUMBER.test(normalized)
    ? 'La ville ne doit pas figurer dans les titres, H1 et textes alternatifs.'
    : true
}

export const noCityNumber: Rule = (value) =>
  CITY_WITH_NUMBER.test(normalize(value)) ? 'Ne pas associer la ville à « 34 » ou « 34740 ».' : true

export const textRule =
  (rule: Rule): TextFieldSingleValidation =>
  (value, options) => {
    const base = text(value, options)
    if (base !== true) return base
    return typeof value === 'string' ? rule(value) : true
  }

export const textareaRule =
  (rule: Rule): TextareaFieldValidation =>
  (value, options) => {
    const base = textarea(value, options)
    if (base !== true) return base
    return typeof value === 'string' ? rule(value) : true
  }

type LexicalNode = { type?: string; text?: unknown; children?: LexicalNode[] }

const INLINE_TYPES = ['text', 'linebreak', 'tab', 'link', 'autolink']

const flatText = (node: LexicalNode): string =>
  typeof node.text === 'string' ? node.text : (node.children ?? []).map(flatText).join('')

const collectBlocks = (node: LexicalNode): string[] => {
  const children = node.children ?? []
  if (children.length === 0) return []
  if (children.every((child) => INLINE_TYPES.includes(child.type ?? 'text'))) {
    return [flatText(node)]
  }
  return children.flatMap(collectBlocks)
}

export const richTextRule =
  (rule: Rule): RichTextFieldValidation =>
  (value) => {
    const root = (value as { root?: LexicalNode } | null | undefined)?.root
    if (!root) return true
    for (const fragment of collectBlocks(root)) {
      const result = rule(fragment)
      if (result !== true) return result
    }
    return true
  }
