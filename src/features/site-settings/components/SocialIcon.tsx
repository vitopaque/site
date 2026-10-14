import type { SocialNetwork } from '../types'

const PATHS: Record<SocialNetwork, string> = {
  facebook:
    'M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.5V4.3C16.3 4.2 15.4 4 14.4 4 12.2 4 10.5 5.3 10.5 7.9v2.6H8v3h2.5V21h3Z',
  instagram:
    'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.9-2.6a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z',
  linkedin:
    'M5.2 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM3.6 9h3.2v11.5H3.6V9Zm5.2 0h3.1v1.6c.5-.9 1.6-1.9 3.4-1.9 3.4 0 4 2.2 4 5.1v6.7h-3.2v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2v6.1H8.8V9Z',
}

export function SocialIcon({ network }: { network: SocialNetwork }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d={PATHS[network]} />
    </svg>
  )
}
