import { JsonLd } from '@/shared/seo/jsonld'

import { localBusinessJsonLd } from '../seo'

export function LocalBusinessJsonLd() {
  return <JsonLd data={localBusinessJsonLd()} />
}
