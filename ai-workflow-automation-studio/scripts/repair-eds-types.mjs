import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const file = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../node_modules/@poluru-labs/enterprise-design-system-vue/dist/components/Toast/Toast.d.ts',
)

const source = readFileSync(file, 'utf8')
const marker = 'export {};\n number;'
if (!source.includes(marker)) {
  process.exit(0)
}

const repaired = `${source.slice(0, source.indexOf(marker))}declare const _default: import('vue').DefineComponent<{
    title?: string;
    description?: string;
    variant?: ToastVariant;
    open?: boolean;
    duration?: number;
}>;
export default _default;
`
writeFileSync(file, repaired)
