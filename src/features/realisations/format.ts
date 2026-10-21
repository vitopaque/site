const MONTH_YEAR = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export const DATE_FORMAT = /^\d{4}-(0[1-9]|1[0-2])$/

export const formatRealisationDate = (date: string): string =>
  MONTH_YEAR.format(new Date(`${date}-01T00:00:00Z`))
