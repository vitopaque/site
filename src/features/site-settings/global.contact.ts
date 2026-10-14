import type { Field, GlobalConfig } from 'payload'

import { hasRole, isAdmin } from '@/features/access'
import { revalidateTagAfterChange, SITE_SETTINGS_TAG } from '@/shared/payload/hooks'

const DAYS = [
  { label: 'Lundi', value: 'monday' },
  { label: 'Mardi', value: 'tuesday' },
  { label: 'Mercredi', value: 'wednesday' },
  { label: 'Jeudi', value: 'thursday' },
  { label: 'Vendredi', value: 'friday' },
  { label: 'Samedi', value: 'saturday' },
  { label: 'Dimanche', value: 'sunday' },
] as const

const TIME_FORMAT = /^([01]\d|2[0-3]):[0-5]\d$/

const timeField = (name: 'opens' | 'closes', label: string): Field => ({
  name,
  label,
  type: 'text',
  required: true,
  admin: { condition: (_, sibling) => !sibling?.closed, description: 'Format HH:MM' },
  validate: (value: string | null | undefined) =>
    typeof value === 'string' && TIME_FORMAT.test(value) ? true : 'Format attendu : HH:MM',
})

const uniqueDays = (rows: unknown): true | string => {
  const days = (Array.isArray(rows) ? rows : []).map((row: { day?: string }) => row.day)
  return new Set(days).size === days.length ? true : 'Un jour ne peut figurer qu’une fois.'
}

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Coordonnées et horaires',
  admin: { group: 'Réglages', hidden: ({ user }) => !hasRole(user, 'admin') },
  access: { read: () => true, update: isAdmin },
  hooks: { afterChange: [revalidateTagAfterChange(SITE_SETTINGS_TAG)] },
  fields: [
    { name: 'legalName', label: 'Raison sociale', type: 'text', required: true },
    {
      name: 'address',
      label: 'Adresse',
      type: 'group',
      fields: [
        { name: 'street', label: 'Rue', type: 'text', required: true },
        { name: 'postalCode', label: 'Code postal', type: 'text', required: true },
        { name: 'city', label: 'Ville', type: 'text', required: true },
      ],
    },
    { name: 'phone', label: 'Téléphone', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
      name: 'hours',
      label: 'Horaires',
      type: 'array',
      validate: uniqueDays,
      fields: [
        { name: 'day', label: 'Jour', type: 'select', options: [...DAYS], required: true },
        { name: 'closed', label: 'Fermé', type: 'checkbox', defaultValue: false },
        timeField('opens', 'Ouverture'),
        timeField('closes', 'Fermeture'),
      ],
    },
  ],
}
