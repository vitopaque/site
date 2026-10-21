import type { Field, TextFieldSingleValidation } from 'payload'

import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'
import { checkSeoLengths, DESCRIPTION_MAX } from '@/shared/content/seo-rules'
import { textareaRule, textRule } from './validators'

type SeoFieldsOptions = { titleTemplate: string }

export const seoFields = ({ titleTemplate }: SeoFieldsOptions): Field => {
  const titleRule = textRule(noCityInTitle)
  const validateTitle: TextFieldSingleValidation = async (value, options) => {
    const base = titleRule(value, options)
    if (base !== true || typeof value !== 'string') return base
    const violations: string[] = []
    checkSeoLengths(violations, 'SEO', { title: value, description: '' }, titleTemplate)
    return violations[0] ?? true
  }
  return {
    name: 'seo',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        validate: validateTitle,
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        maxLength: DESCRIPTION_MAX,
        validate: textareaRule(noCityNumber),
      },
    ],
  }
}
