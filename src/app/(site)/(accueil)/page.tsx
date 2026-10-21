import { HomePage, homeMetadata } from '@/features/home'
import { LocalBusinessJsonLd } from '@/features/site-settings'

export const metadata = homeMetadata()

export default function Page() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomePage />
    </>
  )
}
