import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { SanitizedConfig } from 'payload'

import { articleEditor } from '../editor'

export async function markdownToLexical(
  config: SanitizedConfig,
  markdown: string,
): Promise<ReturnType<typeof convertMarkdownToLexical>> {
  const editorConfig = await editorConfigFactory.fromEditor({ config, editor: articleEditor })
  return convertMarkdownToLexical({ editorConfig, markdown })
}
