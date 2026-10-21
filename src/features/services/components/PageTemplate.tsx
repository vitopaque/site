import { JsonLd } from '@/shared/seo/jsonld'

import type { Page } from '../queries'
import { pageJsonLd } from '../seo'
import { HubPage } from './HubPage'
import { ServicePage } from './ServicePage'

export function PageTemplate({ entry }: { entry: Page }) {
  return (
    <>
      {pageJsonLd(entry).map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      {entry.kind === 'hub' ? <HubPage entry={entry} /> : <ServicePage entry={entry} />}
    </>
  )
}
