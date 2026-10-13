const DEV_SITE_URL = 'http://localhost:3000'

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}. Voir .env.example.`)
  }
  return value
}

export function isOnVercel(): boolean {
  return Boolean(process.env.VERCEL)
}

export function isVercelProduction(): boolean {
  return process.env.VERCEL_ENV === 'production'
}

export function resolveSiteUrl(): URL {
  const raw = process.env.SITE_URL?.trim()
  if (!raw && process.env.NODE_ENV !== 'production') return new URL(DEV_SITE_URL)
  const value = raw || requireEnv('SITE_URL')
  try {
    return new URL(value)
  } catch {
    throw new Error("Variable d'environnement invalide : SITE_URL doit être une URL absolue.")
  }
}
