import type {
  RichTextFieldValidation,
  TextFieldSingleValidation,
  UploadFieldSingleValidation,
} from 'payload'
import { text, upload } from 'payload/shared'

import { noCityNumber } from '@/shared/content/city-rules.mjs'
import { lexicalTexts } from '@/shared/payload/lexical-text'
import { requiredOnPublish } from '@/shared/payload/required-on-publish'
import { richTextRule } from '@/shared/payload/validators'
import { articleSlugRule } from './slug'

export const validateSlug: TextFieldSingleValidation = (value, options) => {
  const base = text(value, options)
  if (base !== true || typeof value !== 'string' || !value) return base
  return articleSlugRule(value)
}

export const validateImage: UploadFieldSingleValidation = (value, options) => {
  const base = upload(value, options)
  if (base !== true) return base
  return requiredOnPublish(options.data, Boolean(value), 'Une image est obligatoire pour publier.')
}

const contentRule = richTextRule(noCityNumber)

export const validateContent: RichTextFieldValidation = async (value, options) => {
  const base = await contentRule(value, options)
  if (base !== true) return base
  const root = (value as { root?: Parameters<typeof lexicalTexts>[0] } | null | undefined)?.root
  const hasText = lexicalTexts(root).some((block) => block.trim() !== '')
  return requiredOnPublish(
    options.data,
    hasText,
    'Le corps de l’article est obligatoire pour publier.',
  )
}
