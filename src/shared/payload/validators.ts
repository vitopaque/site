import type { TextFieldSingleValidation } from 'payload'
import { text } from 'payload/shared'

import type { Rule } from '@/shared/content/city-rules.mjs'

export const textRule =
  (rule: Rule): TextFieldSingleValidation =>
  (value, options) => {
    const base = text(value, options)
    if (base !== true) return base
    return typeof value === 'string' ? rule(value) : true
  }
