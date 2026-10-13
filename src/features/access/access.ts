import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

import type { Role } from './roles'

type UserWithRole = { id: number | string; role?: Role | null } | null | undefined

export const hasRole = (user: UserWithRole, ...roles: Role[]): boolean =>
  Boolean(user?.role && roles.includes(user.role))

type RequestArgs = { req: PayloadRequest }

export const isAdmin = ({ req }: RequestArgs): boolean => hasRole(req.user, 'admin')

export const isAdminOrEditor = ({ req }: RequestArgs): boolean =>
  hasRole(req.user, 'admin', 'editor')

export const adminOrSelf: Access = ({ req }): boolean | Where => {
  if (hasRole(req.user, 'admin')) return true
  return req.user ? { id: { equals: req.user.id } } : false
}

export const adminOrCreator =
  (field = 'createdBy'): Access =>
  ({ req }) => {
    if (hasRole(req.user, 'admin')) return true
    return hasRole(req.user, 'editor') ? { [field]: { equals: req.user?.id } } : false
  }

export const adminOtherThanSelf: Access = ({ req }): boolean | Where =>
  hasRole(req.user, 'admin') && req.user ? { id: { not_equals: req.user.id } } : false

export const adminOrSelfField: FieldAccess = ({ req, id }) =>
  hasRole(req.user, 'admin') || (req.user !== null && req.user.id === id)

export const adminOtherThanSelfField: FieldAccess = ({ req, id }) =>
  hasRole(req.user, 'admin') && req.user?.id !== id
