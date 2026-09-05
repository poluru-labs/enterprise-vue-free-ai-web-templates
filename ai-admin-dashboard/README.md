# Harbor · Workspace control plane

Vue 3 admin dashboard for tenants, members, feature flags, and audit. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Lakshmi Poluru**, platform admin.

## Screenshot
<img width="3360" height="3874" alt="image" src="https://github.com/user-attachments/assets/cc9e460f-9a1d-4b5e-939a-a7966e1f19ec" />


## Setup

Requires Node.js 20+.

```bash
cd ai-admin-dashboard
npm install
npm run dev
```

Default dev server: **http://localhost:5190**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5190) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4190) |
| `npm test` | Vitest unit tests |

## Unique header

Dark slate sticky bar (`#0F172A`) with a **6px sky accent stripe** on the left (`#38BDF8`):

- Org **switcher** (select of Harbor tenants)
- Center **seat-usage meter** (used / limit) plus a **“3 flags in rollout”** chip
- **Inset search** with ⌘K (not a pill, not emerald)
- **Invite member** primary button, notifications drawer, theme toggle, Lakshmi avatar

Theme toggle calls `setEdsTheme` when available and also flips a local `hbr-dark` class.

## Theme

- Slate `#0F172A`
- Accent `#38BDF8`
- Font: Plus Jakarta Sans
- CSS prefix: `hbr-`
- Equal-height cards: `.hbr-stat-card, .hbr-panel { display:flex; flex-direction:column; height:100%; }` and `.row > [class*="col-"] { display:flex; }`

## Routes

Base path: `/admin`

| Path | Page |
| --- | --- |
| `/admin/overview` | Six KPI cards, seat trend, plan mix, tenant health |
| `/admin/tenants` | Tenant table with CRUD |
| `/admin/tenants/:id` | Tenant detail — seats, members, flags |
| `/admin/members` | Member CRUD and header invite |
| `/admin/flags` | Feature flag CRUD and rollout bars |
| `/admin/audit` | Security event log |
| `/admin/search` | Cross-search tenants, members, flags |
| `/admin/settings` | Workspace defaults and alert routing |

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
  stores/workspace.js
  utils/format.js, search.js, status.js  + *.test.js
  views/OverviewView.vue, TenantsView.vue, TenantDetailView.vue, MembersView.vue, FlagsView.vue, AuditView.vue, SearchView.vue, SettingsView.vue
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
