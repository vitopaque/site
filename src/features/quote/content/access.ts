import type { StaticImageData } from 'next/image'

// Image statique du plan d'accès, à fournir dans le dépôt : tant qu'elle est absente, seul le lien d'itinéraire s'affiche.
export const accessMap: { src: StaticImageData; alt: string } | null = null
