import localFont from 'next/font/local'

export const barlow = localFont({
  src: [{ path: './Barlow-400-latin.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-barlow',
})

export const barlowCondensed = localFont({
  src: [
    { path: './BarlowCondensed-400-latin.woff2', weight: '400', style: 'normal' },
    { path: './BarlowCondensed-600-latin.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-barlow-condensed',
})
