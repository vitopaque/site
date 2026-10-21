type Logger = Pick<Console, 'error' | 'warn'>

export const isProductionBuild = (): boolean => process.env.NEXT_PHASE === 'phase-production-build'

export function createBuildFallback(
  isBuild: () => boolean = isProductionBuild,
  logger: Logger = console,
) {
  let degraded = false
  return async function withBuildFallback<T>(
    label: string,
    read: () => Promise<T>,
    fallback: T,
  ): Promise<T> {
    if (degraded) return fallback
    try {
      return await read()
    } catch (error) {
      if (!isBuild()) {
        logger.error(`[articles] ${label} : lecture impossible`, error)
        throw error
      }
      degraded = true
      logger.warn(
        `[articles] ${label} : lecture impossible pendant le build (base injoignable ou schéma absent), repli sur un contenu vide. Les pages concernées seront régénérées au prochain cycle de revalidation.`,
        error,
      )
      return fallback
    }
  }
}

export const withBuildFallback = createBuildFallback()
