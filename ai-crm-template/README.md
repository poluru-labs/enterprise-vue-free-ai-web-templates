# Bloom CRM

Vue 3 revenue workspace for Poluru Cloud sales. Theme color is `#F13E93`. Built with Vite, Vue Router, Bootstrap, and [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Priya Poluru**, revenue lead.

## Run

Requires Node.js 20+.

```bash
cd ai-crm-template
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5191/crm/overview  
Preview: http://127.0.0.1:4191/crm/overview

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (5191) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (4191) |
| `npm test` | Vitest unit tests |

## Theme

- Brand magenta `#F13E93`
- Supporting `#D62E7E`, `#B81F68`, `#FDE8F3`
- Canvas `#FBF6F8`
- CSS prefix `bloom-`
- Fonts: Outfit + Plus Jakarta Sans

Header signature: full-bleed magenta ribbon with a Bloom **B** mark, pipeline stage pills (Qualify / Propose / Negotiate / Closed) and live deal counts, a Q3 quota ring, ⌘K, New deal, inbox bell, and Priya’s avatar. A thin light strip under the ribbon holds workspace search.

## Routes

Base path: `/crm`

| Path | Page |
| --- | --- |
| `/crm/overview` | Quota, 6 KPIs, pulse, team, account health |
| `/crm/pipeline` | Stage board |
| `/crm/deals` | Filterable deal table + CSV |
| `/crm/deals/:id` | Opportunity workspace and notes timeline |
| `/crm/leads` | Lead scores and convert |
| `/crm/accounts` | Account tree and health |
| `/crm/accounts/:id` | Buying team |
| `/crm/activities` | Agenda and email sequence |
| `/crm/reports` | Forecast by rep and region |
| `/crm/search` | Cross-entity search |
| `/crm/settings` | Profile, alerts, webhook |

## Features

- **Vue Router** history routes under `/crm` (no hash routing).
- **Global command search** (`⌘K` / `Ctrl+K`) — live results across deals, leads, accounts, and contacts, plus page shortcuts.
- **Notification badge** — inbox bell unread count and **Mark all read**.
- **CSV export** — Deals, Leads, and Accounts download the currently filtered rows.
- **Deal notes history** — saving a note appends it to that deal’s activity timeline.
- **New deal / log call / convert lead** modals from the shell and sidebar.
- **Equal-height** KPI and account health cards.

## Structure

```
src/
  App.vue, main.js
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/ (PageHeader, StatCard, ChartSection, FilterBar, StatusBadge, DataTable)
  components/charts/ Sparkline, AreaChart, BarChart, DonutChart
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/crm.js
  utils/format.js, search.js, status.js, csv.js
  views/ OverviewView, PipelineView, DealsView, DealDetailView, LeadsView,
         AccountsView, AccountDetailView, ActivitiesView, ReportsView, SearchView, SettingsView
  test/setup.js
```

## Stack

- Vue 3
- Vue Router
- Vite
- Vitest + @vue/test-utils + jsdom
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
