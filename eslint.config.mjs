import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'

const featureInternal = {
  element: { type: 'feature', fileInternalPath: '!(index.ts|index.tsx)' },
}

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'next-env.d.ts',
    '.claude/**',
    '.vercel/**',
    '.remember/**',
    'migrations/**',
    'playwright-report/**',
    'test-results/**',
  ]),
  {
    files: ['src/**/*.{ts,tsx}', 'mdx-components.tsx'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', partialMatch: false },
        { type: 'feature', pattern: 'src/features/*', partialMatch: false, capture: ['feature'] },
        { type: 'shared', pattern: 'src/shared', partialMatch: false },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        2,
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'shared' } },
              disallow: { to: { element: { type: ['feature', 'app'] } } },
              message: 'shared ne doit importer ni feature ni app',
            },
            {
              from: { element: { type: 'feature' } },
              disallow: { to: { element: { type: 'app' } } },
              message: 'une feature ne doit pas importer app',
            },
            {
              from: { element: { type: ['app', 'feature'] } },
              disallow: { to: featureInternal },
              message: "une feature n'expose que son index.ts",
            },
            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: {
                    type: 'feature',
                    captured: { feature: '{{ from.element.captured.feature }}' },
                  },
                },
              },
            },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*', '**/features/*/*'],
              message: 'Importer une feature uniquement par son index.ts (@/features/<nom>)',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features', '@/features/**', '**/features/**'],
              message: 'shared n’importe aucune feature',
            },
            { group: ['@/app', '@/app/**'], message: 'shared n’importe pas app' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*', '**/features/*/*'],
              message: 'Importer une autre feature uniquement par son index.ts',
            },
            { group: ['@/app', '@/app/**'], message: 'une feature n’importe pas app' },
          ],
        },
      ],
    },
  },
])
