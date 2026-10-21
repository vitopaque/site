import { QuoteForm } from '@/features/quote'
import { Section } from '@/shared/ui/Section'

export function ContactSection() {
  return (
    <Section
      id="contact"
      labelledBy="contact-titre"
      tone="dark"
      className="relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden">
        <div className="sweep-band animate-sweep-cta absolute -inset-x-3/10 -inset-y-1/5" />
      </div>
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,23.75rem),1fr))] items-start gap-14">
        <div className="flex flex-col gap-5">
          <p className="label-caps text-accent-300">Contact</p>
          <h2 id="contact-titre" className="text-headline-xl wrap-break-word uppercase">
            <span className="block">Passons de l’autre </span>
            <span className="block">côté du verre.</span>
          </h2>
          <p className="text-body-lg text-accent-100 max-w-105">
            Décrivez votre vitrage et votre projet : nous revenons vers vous pour établir votre
            devis.
          </p>
        </div>
        <div className="blueprint blueprint-inverse p-8">
          <QuoteForm />
        </div>
      </div>
    </Section>
  )
}
