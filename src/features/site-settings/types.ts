export type NavLink = { label: string; href: string }

export type SocialNetwork = 'facebook' | 'instagram' | 'linkedin'

export type Weekday =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type SiteConfig = {
  name: string
  baseline: string
  locationNote: string | null
  contact: {
    phone: string
    email: string | null
    address: { street: string | null; postalCode: string | null; city: string }
    hours: { days: Weekday[]; opens: string; closes: string }[]
  }
  social: { network: SocialNetwork; url: string }[]
  seo: { titleTemplate: string; home: { title: string; description: string } }
  navigation: { links: NavLink[]; cta: NavLink }
  footerColumns: { title: string; links: NavLink[] }[]
}
