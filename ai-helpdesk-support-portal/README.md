# Lumen · Support operations

Vue 3 AI helpdesk for queues, SLAs, macros, and suggested replies. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Meera Poluru**, support lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-helpdesk-support-portal
npm install
npm run dev
```

Default dev server: **http://localhost:5193**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5193) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4193) |
| `npm test` | Vitest unit tests |

## Unique header

Sky sticky bar (`#0284C7`) with **white rectangular ticket COUNT BADGES** (not circular SLA rings, not magenta):

- Left: lighthouse mark + **Lumen** / Support operations
- Center: three rectangular badges — **Open 47 · Waiting 11 · Breached 3**
- Thin second line: **first response 42m**
- Compact search, **Assign next**, ⌘K, notifications, theme (`setEdsTheme`), Meera avatar

Assign next claims the oldest unassigned ticket, shows a toast, and opens ticket detail.

## Theme

- Sky `#0284C7` / `#0369A1`
- Canvas `#F0F9FF`
- Font: Plus Jakarta Sans
- CSS prefix: `lumen-`
- Equal-height cards: `.lumen-stat-card, .lumen-panel, .lumen-macro-card { display:flex; flex-direction:column; height:100%; }` with `.lumen-stat-card { min-height:168px; }` and `.row > [class*="col-"] { display:flex; }`

## Routes

Base path: `/helpdesk`

| Path | Page |
| --- | --- |
| `/helpdesk/overview` | Six KPI cards, volume chart, queue cards |
| `/helpdesk/inbox` | Filtered live queue |
| `/helpdesk/tickets` | Full ticket register |
| `/helpdesk/tickets/:id` | Conversation, reply composer, AI draft |
| `/helpdesk/customers` | Accounts and contacts |
| `/helpdesk/macros` | Equal-height canned replies |
| `/helpdesk/knowledge` | Help articles |
| `/helpdesk/sla` | Response policies |
| `/helpdesk/agents` | Coverage and load |
| `/helpdesk/search` | Cross-search tickets, customers, macros |
| `/helpdesk/settings` | Desk defaults and intake channels |

## Structure

```
src/
  App.vue
  main.js
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/PageHeader.vue, StatCard.vue, ChartSection.vue, FilterBar.vue, StatusBadge.vue, DataTable.vue
  components/charts/Sparkline.vue, AreaChart.vue, BarChart.vue, DonutChart.vue
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/helpdesk.js
  utils/format.js, search.js, status.js  + *.test.js
  views/OverviewView.vue, InboxView.vue, TicketsView.vue, TicketDetailView.vue, CustomersView.vue, MacrosView.vue, KnowledgeView.vue, SlaView.vue, AgentsView.vue, SearchView.vue, SettingsView.vue
  test/setup.js
```

`App.vue` only wraps `EdsThemeProvider`, `ToastProvider`, and `AppShell`.

## Stack

- Vue 3
- Vue Router 4
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
- Vitest + @vue/test-utils + jsdom

## License

MIT
