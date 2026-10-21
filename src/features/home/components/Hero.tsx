import Image from 'next/image'
import Link from 'next/link'

import grandMonogram from '@/shared/assets/brand/monogramme-v-grand.webp'
import { provisionalPhoto } from '@/shared/assets/photos/provisional'
import { ordinal } from '@/shared/ui/ordinal'
import { Prose } from '@/shared/ui/Prose'

import { homeHero } from '../content/hero'
import { HeroLens } from './HeroLens'

const WORDS = ['Intimité', 'Lumière', 'Chaleur', 'Sécurité'] as const

export function Hero() {
  return (
    <section
      aria-labelledby="accueil-titre"
      className="on-dark bg-accent-900 text-background relative flex min-h-(--hero-min-height) flex-col overflow-hidden pt-(--header-height)"
    >
      <div className="duotone absolute inset-0">
        <Image src={provisionalPhoto} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <HeroLens label="Verre clair" />
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden">
        <div className="sweep-band animate-sweep absolute -inset-x-3/10 -inset-y-1/5" />
      </div>

      <div className="max-w-page px-margin relative mx-auto grid w-full flex-1 grid-cols-[repeat(auto-fit,minmax(min(100%,26.25rem),1fr))] items-center gap-10 py-(--hero-pad-y)">
        <div className="flex flex-col gap-6">
          <p className="label-caps text-accent-300">{homeHero.kicker}</p>
          <h1 id="accueil-titre" className="text-display-hero wrap-break-word uppercase">
            <span className="block">La lumière, </span>
            <span className="block">
              <span className="text-accent-300">à votre</span> mesure.
            </span>
          </h1>
          <p className="text-title-md text-accent-100 max-w-115 text-pretty">{homeHero.subtitle}</p>
          <p className="text-body-lg text-accent-100 max-w-115 text-pretty">
            <Prose segments={homeHero.intro} />
          </p>
          <div className="mt-1.5 flex flex-wrap gap-4">
            <a
              href="#films"
              className="blueprint blueprint-inverse label-btn-lg bg-background text-accent-900 hover:bg-accent-200 px-6 py-3.5"
            >
              Essayer les films
            </a>
            <Link
              href="/contact-devis"
              className="border-outline-inverse label-btn-lg hover:bg-hover-inverse border px-6 py-3.5"
            >
              Demander un devis
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={grandMonogram}
            alt=""
            aria-hidden="true"
            priority
            fetchPriority="high"
            sizes="(min-width: 60rem) min(35vw, 27.5rem), min(72vw, 27.5rem)"
            className="h-auto w-[min(80%,var(--logo-hero-max))]"
          />
        </div>
      </div>

      <ul className="border-divider-inverse relative grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] border-t">
        {WORDS.map((word, index) => (
          <li
            key={word}
            className="border-divider-inverse px-margin flex flex-col gap-1 py-5 not-first:border-l"
          >
            <span className="label-sm text-accent-300">{ordinal(index)}</span>
            <span className="font-heading text-title-md tracking-wider uppercase">{word}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
