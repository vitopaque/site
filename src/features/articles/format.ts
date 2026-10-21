const LONG_DATE = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Paris',
})

export const formatArticleDate = (iso: string): string => LONG_DATE.format(new Date(iso))
