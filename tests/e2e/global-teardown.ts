import { execFileSync } from 'node:child_process'

export default function globalTeardown(): void {
  execFileSync('pnpm', ['payload', 'run', 'tests/e2e/seed.ts'], {
    stdio: 'inherit',
    env: { ...process.env, E2E_SEED_MODE: 'clean' },
  })
}
