import { formatServiceAreaFor } from '../format'
import type { ServiceAreaScope } from '../types'

export function ServiceAreaText({ scope }: { scope: ServiceAreaScope }) {
  return <>{formatServiceAreaFor(scope)}</>
}
