import { LegalPage, legalMetadata } from '@/features/legal'

export const metadata = legalMetadata('privacy')

export default function Page() {
  return <LegalPage pageKey="privacy" />
}
