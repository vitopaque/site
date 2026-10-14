import type { Access } from 'payload'

import { hasRole, isAdmin } from '@/features/access'

const publishedOrAdmin: Access = ({ req }) => {
  if (hasRole(req.user, 'admin')) return true
  return req.user ? false : { _status: { equals: 'published' } }
}

export const servicesAccess = {
  read: publishedOrAdmin,
  readVersions: isAdmin,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}
