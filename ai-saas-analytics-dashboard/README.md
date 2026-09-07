# Pulse · Product analytics

Vue 3 workspace for activation, retention, usage, experiments, and feature requests. Built with Vite, Vue Router, Bootstrap, and [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

| | |
| --- | --- |
| Product | Pulse · Product analytics |
| Signed in | **Ishaan Poluru**, Head of Growth |
| Brand | `#4F46E5` / deep `#312E81` / canvas `#EEF2FF` |
| Folder | `ai-saas-analytics-dashboard` |
| Local demo | [http://localhost:5192/](http://localhost:5192/) |
| Preview | [http://localhost:4192/](http://localhost:4192/) |
| Source | [github.com/poluru-labs/…/ai-saas-analytics-dashboard](https://github.com/poluru-labs/enterprise-vue-free-ai-web-templates/tree/main/ai-saas-analytics-dashboard) |

Page links live in the **Product** sidebar. Mock data is local reactive state in `src/data/pulse.json` — no backend.

## Run

Requires Node.js 20+.

```bash
cd ai-saas-analytics-dashboard
npm install
npm run dev
```

If another template is already on 5192, start with `npx vite --port 5292`.

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5192) |
| `npm run build` | Production build (ES2022, sourcemaps) |
| `npm run preview` | Preview the production build (port 4192) |
| `npm test` | Vitest + jsdom (header, overview, requests, router, store, csv, grid, sparkline, status, KpiCard) |
| `npm run test:watch` | Vitest watch mode |

## Unique header

Indigo glass sticky bar (`#312E81` / `#4F46E5`) with **four inline sparklines** — not a count-badge strip, not a quota ring:

- Pulse mark + **Pulse** / Product analytics
- Live **WAU**, **Activation**, **Churn**, and **NPS** mini-sparklines
- Week / Month / Quarter range control
- Inset search (opens `/search` on submit)
- **⌘K** command palette, **Export** CSV, theme toggle, inbox, Ishaan’s avatar

## Theme

- Brand indigo `#4F46E5`
- Deep `#312E81`, soft `#6366F1`, canvas `#EEF2FF`
- Ink `#1E1B4B`, rule `#C7D2FE`
- Font: Plus Jakarta Sans
- CSS prefix: `pulse-`
- Dark mode calls `setEdsTheme` and toggles `pulse-theme-dark` on `<html>`
- Equal-height cards via `EqualHeightGrid` so KPI, funnel, experiment, and playbook rows stay aligned

Copy lives in `src/data/pulse.json`. Layout and brand color live in `src/style.css`.

## Routes

History routes at `/`. Vite `base` is `'./'`. There is no `/analytics` prefix. Unknown paths redirect to overview.

| Path | Page |
| --- | --- |
| `/` | Six KPIs with sparklines, next-best-action alert, MRR chart, at-risk accounts |
| `/activation` | Four-step first-session funnel, playbook, today’s agenda |
| `/retention` | Five-week retention curve, win-back playbook, at-risk list |
| `/usage` | Feature adoption, growth pod, activity timeline |
| `/cohorts` | Monthly cohort cards (W1 / W4 / W8) plus heatmap table |
| `/experiments` | Equal-height experiment cards (padded to a full row) and playbooks |
| `/requests` | Feature / enhancement / fix table with owner filter, pagination, CSV |
| `/search` | Cross-surface search over metrics, requests, experiments, playbooks, inbox |
| `/settings` | Ishaan’s profile and dark-theme switch |

## Features

- **Command palette** (`⌘K` / `Ctrl+K`) — jump to a section or add a request
- **New request** modal from Overview, Experiments, Requests, and the shell
- **CSV export** — downloads the current request table
- **Notifications** — unread badge and mark-all-read
- **Date range** — Week / Month / Quarter on the header
- **Dark mode** — indigo glass header stays; canvas inverts
- **Equal-height grids** — extra experiment cards pad a short row so the grid never looks unfinished

Demo people include **Ishaan Poluru**, Meera Poluru, Arjun Poluru, Sana Poluru, Rahul Poluru, Kiran Poluru, Dev Poluru, and Ananya Poluru.

## Structure

```
src/
  App.vue                 EdsThemeProvider + ToastProvider + AppShell
  main.js
  style.css
  components/layout/      AppShell, AppHeader, AppSidebar, CommandPalette, RequestModal
  components/widgets/     PageHeader, KpiCard, EqualHeightGrid, ExperimentCard,
                          PlaybookCard, GrowthPod, AtRiskList, RequestTable
  components/charts/      Sparkline, MiniSparkline, MrrChart
  composables/            useCommandPalette, useDateRange, useRequests, useSearch, useTheme
  constants/              nav.js, product.js, theme.js
  data/pulse.json
  router/index.js
  stores/pulse.js
  utils/                  csv.js, grid.js, sparkline.js, status.js
  views/                  Overview, Activation, Retention, Usage, Cohorts,
                          Experiments, Requests, Search, Settings
tests/                    10 Vitest specs
```

## Stack

- Vue 3 + Vue Router 4
- Vite 6
- Bootstrap 5 + Bootstrap Icons
- [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue)
- Vitest + @vue/test-utils + jsdom

## License

MIT © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs
