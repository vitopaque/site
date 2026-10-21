import type {
  CollectionSlug,
  Field,
  TextareaFieldValidation,
  TextFieldSingleValidation,
} from 'payload'

import { noCityInTitle, noCityNumber } from '@/shared/content/city-rules.mjs'
import { checkSeoLengths, DESCRIPTION_MAX } from '@/shared/content/seo-rules'
import { uniqueAmongDocs } from './unique-field'
import { textareaRule, textRule } from './validators'

type SeoFieldsOptions = { titleTemplate: string; collection: CollectionSlug }

export const seoFields = ({ titleTemplate, collection }: SeoFieldsOptions): Field => {
  const uniqueTitle = uniqueAmongDocs(
    collection,
    'seo.title',
    'Ce titre SEO est déjà utilisé par un autre article.',
  )
  const uniqueDescription = uniqueAmongDocs(
    collection,
    'seo.description',
    'Cette méta-description est déjà utilisée par un autre article.',
  )
  const descriptionRule = textareaRule(noCityNumber)
  const titleRule = textRule(noCityInTitle)
  const validateTitle: TextFieldSingleValidation = async (value, options) => {
    const base = titleRule(value, options)
    if (base !== true || typeof value !== 'string') return base
    const violations: string[] = []
    checkSeoLengths(violations, 'SEO', { title: value, description: '' }, titleTemplate)
    return violations[0] ?? (await uniqueTitle(value, options))
  }
  const validateDescription: TextareaFieldValidation = async (value, options) => {
    const base = descriptionRule(value, options)
    return base === true ? uniqueDescription(value, options) : base
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
        validate: validateDescription,
      },
    ],
  }
}
