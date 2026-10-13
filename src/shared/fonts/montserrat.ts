import localFont from 'next/font/local'

export const montserrat = localFont({
  src: './Montserrat-latin-variable.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-montserrat',
})
