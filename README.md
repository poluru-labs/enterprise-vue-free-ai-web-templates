# Enterprise Vue Free AI Web Templates

A curated collection of free Vue 3 templates for AI dashboards, SaaS products, admin panels, and internal tools. Each template is a self-contained Vite app that uses [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

## Templates

| Template | Description | Dev port |
| --- | --- | --- |
| [Harbor Admin](ai-admin-dashboard/README.md) | Tenants, seats, flags, and audit. Theme `#0F172A`. Dark slate header with sky stripe. | 5190 |
| [Bloom CRM](ai-crm-template/README.md) | Pipeline, accounts, and sales activity. Theme `#F13E93`. Magenta ribbon with stage pills. | 5191 |
| [Pulse Analytics](ai-saas-analytics-dashboard/README.md) | Activation, retention, and usage. Theme `#4F46E5`. Indigo glass header with sparklines. | 5192 |
| [Lumen Helpdesk](ai-helpdesk-support-portal/README.md) | Queues, SLAs, and suggested replies. Theme `#0284C7`. Sky count-badge header. | 5193 |
| [Grove HR](ai-hr-management-dashboard/README.md) | Headcount, leave, hiring, and learning. Theme `#7C3AED`. Violet leave-avatar header. | 5194 |
| [Keel Projects](ai-project-management-app/README.md) | Boards, sprints, and delivery risk. Theme `#0F766E`. Teal sprint-progress header. | 5195 |
| [Mint Finance](ai-finance-expense-dashboard/README.md) | Spend, invoices, and month-end close. Theme `#047857`. Emerald close-track header. | 5196 |
| [Vault Documents](ai-document-workspace/README.md) | Library, reviews, and search. Theme `#B45309`. Paper file-path header. | 5197 |
| [Quota Sales Ops](ai-sales-ops-dashboard/README.md) | Forecast, coverage, and hygiene. Theme `#1E3A8A`. Navy circular forecast gauge. | 5198 |
| [Atlas Intranet](ai-knowledge-base-intranet-template/README.md) | Spaces, how-tos, and policies. Theme `#3F6212`. Olive + lime space-switcher. | 5199 |

## Getting started

Requires Node.js 20+. Choose a template, install its dependencies, and start Vite:

```bash
cd ai-admin-dashboard
npm install
npm run dev
```

Each template has its own `package.json`. Shared stack:

- Vue 3 + Vue Router
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
- Vitest + Vue Test Utils

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm test` | Vitest unit tests |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Project structure

Each app follows the Vue recommended layout:

```
src/
  App.vue
  main.js
  components/layout/     AppShell, AppHeader, AppSidebar
  components/widgets/    PageHeader, StatCard, charts
  composables/
  constants/
  data/
  router/
  stores/
  utils/
  views/
  test/  or tests/
```

KPI, plan, space, and content cards use equal-height grid rules so rows stay aligned.
