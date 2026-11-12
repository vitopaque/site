import { LegalPage, legalMetadata } from '@/features/legal'

export const metadata = legalMetadata('mentions')

export default function Page() {
  return <LegalPage pageKey="mentions" />
}
