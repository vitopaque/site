const PRODUCTION_HOSTS = ['vitopaque.com', 'www.vitopaque.com']

export function assertAllowedTarget(label: string, refVariable: string): void {
  const allowedRef = process.env[refVariable]?.trim()
  if (!allowedRef) {
    throw new Error(`${label} refusé : ${refVariable} absente.`)
  }
  const databaseUri = process.env.DATABASE_URI?.trim()
  if (!databaseUri) {
    throw new Error(`${label} refusé : DATABASE_URI absente.`)
  }
  if (!databaseUri.includes(allowedRef)) {
    throw new Error(`${label} refusé : DATABASE_URI ne correspond pas à ${refVariable}.`)
  }
}

export function assertNotProduction(label: string): void {
  if (process.env.VERCEL_ENV === 'production') {
    throw new Error(`${label} refusé : VERCEL_ENV=production.`)
  }
  const raw = process.env.SITE_URL?.trim()
  if (!raw) return
  let hostname: string
  try {
    hostname = new URL(raw).hostname.toLowerCase()
  } catch {
    throw new Error(`${label} refusé : SITE_URL illisible, environnement non vérifiable.`)
  }
  if (PRODUCTION_HOSTS.includes(hostname)) {
    throw new Error(`${label} refusé : SITE_URL pointe sur la production (${hostname}).`)
  }
}
