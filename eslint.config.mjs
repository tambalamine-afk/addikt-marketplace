import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    // Ignorés par défaut par eslint-config-next
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // L'app mobile (Expo) a son propre outillage
    'mobile/**',
    'dist/**',
  ]),
])

export default eslintConfig
