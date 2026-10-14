import type { Field, GroupField, TextField } from 'payload'

import { noCityInTitle, noCityNumber, textareaRule, textRule } from './validators'

export const h1Field = (): TextField => ({
  name: 'h1',
  label: 'H1',
  type: 'text',
  required: true,
  maxLength: 80,
  validate: textRule(noCityInTitle),
  admin: { description: 'Un seul H1 par page.' },
})

export const seoFields = (): GroupField => ({
  name: 'seo',
  label: 'SEO',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Titre de la page',
      type: 'text',
      required: true,
      unique: true,
      maxLength: 70,
      validate: textRule(noCityInTitle),
    },
    {
      name: 'description',
      label: 'Méta-description',
      type: 'textarea',
      required: true,
      unique: true,
      maxLength: 160,
      validate: textareaRule(noCityNumber),
    },
  ] satisfies Field[],
})

export const pageHeaderFields = (): Field[] => [
  h1Field(),
  {
    name: 'tagline',
    label: 'Accroche',
    type: 'text',
    required: true,
    maxLength: 160,
    validate: textRule(noCityNumber),
  },
  {
    name: 'intro',
    label: 'Introduction',
    type: 'textarea',
    required: true,
    validate: textareaRule(noCityNumber),
  },
]
