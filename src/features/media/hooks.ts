import { type CollectionBeforeValidateHook, ValidationError } from 'payload'

import { noCityInTitle } from '@/shared/content/city-rules.mjs'

export const validateFilename: CollectionBeforeValidateHook = ({ data, req }) => {
  const filename = data?.filename ?? req.file?.name
  if (typeof filename !== 'string') return data
  const result = noCityInTitle(filename)
  if (result === true) return data
  throw new ValidationError({
    collection: 'media',
    errors: [{ message: result, path: 'filename' }],
    req,
  })
}
