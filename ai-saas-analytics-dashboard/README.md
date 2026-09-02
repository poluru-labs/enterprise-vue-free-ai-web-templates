# Pulse — Product analytics

Vue 3 product-analytics starter. Built with Vite, vue-router, Bootstrap, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

The signature chrome is an **indigo glass header** (`#312E81` / `#4F46E5`) with four inline sparklines: WAU, activation, churn, and NPS.

## Run

Requires Node.js 20+.

```bash
cd ai-saas-analytics-dashboard
npm install
npm run dev
```

Default dev server: http://localhost:5192/analytics/

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5192) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (port 4192) |
| `npm test` | Vitest + jsdom |

## Routes

Base path: `/analytics`

| Path | View |
| --- | --- |
| `/analytics/` | Overview — 6 KPIs with sparklines, MRR chart, at-risk accounts |
| `/analytics/activation` | Activation funnel |
| `/analytics/retention` | Retention curve |
| `/analytics/usage` | Feature adoption + growth pod |
| `/analytics/cohorts` | Cohort heatmap |
| `/analytics/experiments` | Equal-height experiment and playbook cards |
| `/analytics/requests` | Feature & enhancement request table |
| `/analytics/search` | Cross-surface search |
| `/analytics/settings` | Profile and theme |

## Stack

- Vue 3 + vue-router
- Vite (`base: /analytics/`)
- Bootstrap 5 + Bootstrap Icons
- Vitest, @vue/test-utils, jsdom
- `@poluru-labs/enterprise-design-system-vue`

## Structure

Vue recommended layout: `components/layout`, `widgets`, `charts`, `composables`, `constants`, `data` JSON, `router`, `stores`, `utils`, `views`, and `tests`.
