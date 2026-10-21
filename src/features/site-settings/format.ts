import type { ServiceArea, SiteConfig, Weekday } from './types'

const WEEK: readonly Weekday[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const DAY_NAMES: Record<Weekday, string> = {
  Monday: 'lundi',
  Tuesday: 'mardi',
  Wednesday: 'mercredi',
  Thursday: 'jeudi',
  Friday: 'vendredi',
  Saturday: 'samedi',
  Sunday: 'dimanche',
}

export type HoursLine = { days: string; slots: string }

export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`

const clock = (value: string): string => {
  const [hours = '', minutes = ''] = value.split(':')
  return minutes === '00' ? `${Number(hours)}\u00A0h` : `${Number(hours)}\u00A0h\u00A0${minutes}`
}

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1)

function daysLabel(days: readonly Weekday[]): string {
  const indexes = days.map((day) => WEEK.indexOf(day)).sort((a, b) => a - b)
  const names = indexes.map((index) => DAY_NAMES[WEEK[index] as Weekday])
  const first = indexes[0] ?? 0
  const last = indexes[indexes.length - 1] ?? 0
  const contiguous = last - first === indexes.length - 1
  if (names.length >= 3 && contiguous) return `${names[0]} au ${names[names.length - 1]}`
  return names.length > 1
    ? `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}`
    : (names[0] ?? '')
}

export function formatOpeningHours(hours: SiteConfig['contact']['hours']): HoursLine[] {
  const groups = new Map<string, { days: Weekday[]; slots: string[] }>()
  for (const slot of hours) {
    const key = [...slot.days].sort().join(',')
    const group = groups.get(key) ?? { days: slot.days, slots: [] }
    group.slots.push(`${clock(slot.opens)}\u00A0–\u00A0${clock(slot.closes)}`)
    groups.set(key, group)
  }
  return [...groups.values()].map(({ days, slots }) => ({
    days: capitalize(daysLabel(days)),
    slots: slots.join(' et '),
  }))
}

const joinList = (items: readonly string[]): string =>
  items.length > 1
    ? `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`
    : (items[0] ?? '')

export const formatServiceArea = ({ automotive, building, liquidCrystal }: ServiceArea): string =>
  `Bâtiment : ${joinList(building.departments)}, et toute l’${building.region.name} à partir de ${building.region.minSurfaceM2}\u00A0m². Automobile : à l’atelier de ${automotive.location}. Film PDLC : partout en ${liquidCrystal.country}.`
