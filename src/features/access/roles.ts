export const ROLE_OPTIONS = [
  { label: 'Administrateur', value: 'admin' },
  { label: 'Éditeur', value: 'editor' },
] as const

export type Role = (typeof ROLE_OPTIONS)[number]['value']
