'use client'

import { useId, useState } from 'react'

import { silosOfUnivers } from '@/features/services'
import { UNIVERS_OPTIONS, type Univers } from '@/shared/payload/univers'

import { UNKNOWN_NEED, type QuoteField, type QuoteValues } from '../types'
import { consentError, contactError, needError, nameError } from '../validators'

const FIELD_CLASS =
  'border-outline-inverse text-background placeholder:text-accent-200 min-h-11 w-full border bg-transparent px-3 py-2'

const DETAILS_FIELD: Record<Univers, { label: string; placeholder: string }> = {
  batiment: { label: 'Surface approximative (m²)', placeholder: '25' },
  voiture: { label: 'Marque et modèle', placeholder: 'Porsche 911' },
  bateau: { label: 'Marque et modèle', placeholder: 'Jeanneau Merry Fisher 895' },
}

const INITIAL_VALUES: QuoteValues = {
  name: '',
  contact: '',
  univers: UNIVERS_OPTIONS[0].value,
  need: UNKNOWN_NEED,
  details: '',
  consent: false,
}

export function QuoteForm() {
  const uid = useId()
  const [values, setValues] = useState<QuoteValues>(INITIAL_VALUES)
  const [touched, setTouched] = useState<Record<QuoteField, boolean>>({
    name: false,
    contact: false,
    need: false,
    consent: false,
  })

  const update = <K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }))
  const touch = (name: QuoteField) => setTouched((current) => ({ ...current, [name]: true }))

  const changeUnivers = (univers: Univers) =>
    setValues((current) => ({
      ...current,
      univers,
      need: needError(univers, current.need) ? UNKNOWN_NEED : current.need,
    }))

  const errors: Record<QuoteField, string | null> = {
    name: touched.name ? nameError(values.name) : null,
    contact: touched.contact ? contactError(values.contact) : null,
    need: touched.need ? needError(values.univers, values.need) : null,
    consent: touched.consent ? consentError(values.consent) : null,
  }

  const idOf = (name: string) => `${uid}-${name}`
  const errorProps = (name: QuoteField) => ({
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${idOf(name)}-erreur` : undefined,
  })
  const errorMessage = (name: QuoteField) =>
    errors[name] ? (
      <p id={`${idOf(name)}-erreur`} role="alert" className="text-body-sm text-accent-100">
        {errors[name]}
      </p>
    ) : null

  const textField = (
    name: 'name' | 'contact',
    label: string,
    placeholder: string,
    autoComplete: string,
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={idOf(name)} className="text-body-sm text-accent-200">
        {label}
      </label>
      <input
        id={idOf(name)}
        name={name}
        type="text"
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[name]}
        onChange={(event) => update(name, event.target.value)}
        onBlur={() => touch(name)}
        className={FIELD_CLASS}
        {...errorProps(name)}
      />
      {errorMessage(name)}
    </div>
  )

  const details = DETAILS_FIELD[values.univers]

  return (
    <form noValidate onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-5">
      {textField('name', 'Nom', 'Camille Durand', 'name')}
      {textField('contact', 'Téléphone ou e-mail', '06 00 00 00 00', 'off')}
      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-body-sm text-accent-200 mb-1.5">Univers</legend>
        <div className="border-outline-inverse flex flex-wrap border">
          {UNIVERS_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="has-checked:bg-background has-checked:text-accent-900 has-focus-visible:outline-accent-300 flex min-h-11 flex-1 cursor-pointer items-center justify-center px-3.5 py-2.5 text-center has-focus-visible:outline-2 has-focus-visible:-outline-offset-2"
            >
              <input
                type="radio"
                name="univers"
                value={option.value}
                checked={values.univers === option.value}
                onChange={() => changeUnivers(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={idOf('need')} className="text-body-sm text-accent-200">
          Type de besoin
        </label>
        <select
          id={idOf('need')}
          name="need"
          value={values.need}
          onChange={(event) => update('need', event.target.value as QuoteValues['need'])}
          onBlur={() => touch('need')}
          className={FIELD_CLASS}
          {...errorProps('need')}
        >
          <option value={UNKNOWN_NEED} className="text-accent-900">
            Je ne sais pas encore
          </option>
          {silosOfUnivers(values.univers).map((silo) => (
            <option key={silo.key} value={silo.key} className="text-accent-900">
              {silo.label}
            </option>
          ))}
        </select>
        {errorMessage('need')}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={idOf('details')} className="text-body-sm text-accent-200">
          {details.label} <span className="text-accent-200">(facultatif)</span>
        </label>
        <input
          id={idOf('details')}
          name="details"
          type="text"
          autoComplete="off"
          placeholder={details.placeholder}
          value={values.details}
          onChange={(event) => update('details', event.target.value)}
          className={FIELD_CLASS}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-body-sm text-accent-100 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            checked={values.consent}
            onChange={(event) => {
              update('consent', event.target.checked)
              touch('consent')
            }}
            className="accent-background focus-visible:outline-accent-300 mt-0.5 size-5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
            {...errorProps('consent')}
          />
          J’accepte que mes informations soient utilisées pour répondre à ma demande de devis.
        </label>
        {errorMessage('consent')}
      </div>
      <button
        type="submit"
        disabled
        aria-describedby={`${uid}-envoi`}
        className="blueprint blueprint-inverse label-btn-lg bg-background text-accent-900 disabled:text-accent-200 mt-1.5 p-4 disabled:cursor-not-allowed disabled:bg-transparent"
      >
        Demander un devis
      </button>
      <p id={`${uid}-envoi`} className="text-body-sm text-accent-200">
        L’envoi de la demande n’est pas encore disponible.
      </p>
    </form>
  )
}
