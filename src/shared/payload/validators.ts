import type {
  RichTextFieldValidation,
  TextareaFieldValidation,
  TextFieldSingleValidation,
} from 'payload'
import { richText, text, textarea } from 'payload/shared'

import type { Rule } from '@/shared/content/city-rules.mjs'
import { lexicalTexts } from './lexical-text'

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

export const richTextRule =
  (rule: Rule): RichTextFieldValidation =>
  async (value, options) => {
    const base = await richText(value, options)
    if (base !== true) return base
    for (const block of lexicalTexts(
      (value as { root?: Parameters<typeof lexicalTexts>[0] })?.root,
    )) {
      const result = rule(block)
      if (result !== true) return result
    }
    return true
  }
