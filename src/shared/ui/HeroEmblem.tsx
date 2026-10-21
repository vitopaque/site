import Image from 'next/image'

import monogram from '@/shared/assets/brand/monogramme-v-grand.webp'

export function HeroEmblem() {
  return (
    <div className="blueprint blueprint-inverse on-dark bg-accent-900 grid-lines relative flex aspect-16/10 items-center justify-center">
      <Image
        src={monogram}
        alt=""
        aria-hidden="true"
        sizes="(min-width: 64rem) 20vw, 40vw"
        className="h-auto w-[min(45%,var(--logo-hero-max))]"
      />
    </div>
  )
}
