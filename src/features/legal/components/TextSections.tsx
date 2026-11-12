import { Fragment } from 'react'

import type { TextSection } from '@/shared/content/text-page'
import { proseClasses } from '@/shared/ui/prose-classes'
import { Section } from '@/shared/ui/Section'

export function TextSections({ sections }: { sections: readonly TextSection[] }) {
  return (
    <Section tone="light">
      <div className="max-w-prose">
        {sections.map((section) => (
          <Fragment key={section.title}>
            <h2 className={proseClasses.h2}>{section.title}</h2>
            {section.blocks.map((block) =>
              typeof block === 'string' ? (
                <p key={block} className={proseClasses.p}>
                  {block}
                </p>
              ) : (
                <ul key={block.join('|')} className={proseClasses.ul}>
                  {block.map((item) => (
                    <li key={item} className={proseClasses.li}>
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            )}
          </Fragment>
        ))}
      </div>
    </Section>
  )
}
