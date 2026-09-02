# Quota — Sales operations

Vue 3 sales-ops starter. Built with Vite, vue-router, Bootstrap, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

The signature chrome is a **royal navy header** (`#1E3A8A` / `#1D4ED8`) with a circular **Q3 forecast gauge** (86% of plan) and a **3.1× coverage** chip — not pipeline stage pills and not product sparklines.

## Run

Requires Node.js 20+.

```bash
cd ai-sales-ops-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5198/sales-ops/

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5198) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (port 4198) |
| `npm test` | Vitest + jsdom |

## Routes

Base path: `/sales-ops`

| Path | View |
| --- | --- |
| `/sales-ops/` | Overview — 6 KPIs, pipeline chart, at-risk deals |
| `/sales-ops/forecast` | Q3 attainment gauge, commit / best-case bands |
| `/sales-ops/coverage` | 3.1× remaining quota by rep |
| `/sales-ops/pipeline` | Stage mix, monthly pipeline, deal table |
| `/sales-ops/hygiene` | Missing next step and stale deals |
| `/sales-ops/teams` | Equal-height team cards (padded short rows) |
| `/sales-ops/playbooks` | Equal-height playbook cards (padded short rows) |
| `/sales-ops/search` | Cross-surface search |
| `/sales-ops/settings` | Profile and theme |

## Stack

- Vue 3 + vue-router
- Vite (`base: /sales-ops/`)
- Bootstrap 5 + Bootstrap Icons
- Vitest, @vue/test-utils, jsdom
- `@poluru-labs/enterprise-design-system-vue`

## Structure

Vue recommended layout: `components/layout`, `widgets`, `charts`, `composables`, `constants`, `data` JSON, `router`, `stores`, `utils`, `views`, and `tests`.
