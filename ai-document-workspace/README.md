# Vault

Knowledge ops workspace for ingesting, reviewing, and retrieving documents with citations and owners. Vue 3 + Vite + Bootstrap + [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue) + vue-router.

## Product

- **Name:** Vault
- **Tagline:** Knowledge ops
- **Theme:** amber `#B45309` / paper `#FFFBEB`
- **CSS prefix:** `vault-`
- **Signed-in:** Ariana Poluru, Knowledge Ops Lead
- **Dev:** http://localhost:5197 (`/documents/overview`)
- **Preview:** http://localhost:4197

## Unique header

Cream **file-path** bar — not a dark command strip:

- Paper `#FFFBEB` with a **3px amber underline**
- Left: folder mark + Vault
- Center: filesystem crumbs `Workspace / Legal / Contracts` (clickable; filters the library)
- Storage meter chip (68%)
- Search, Upload, ⌘K, notifications, Ariana avatar

## Routes (`BASE_PATH` `/documents`)

| Path | View |
| --- | --- |
| `/documents/overview` | 6 KPIs, ingest chart, type mix, activity + review queue |
| `/documents/library` | Filters, table, pagination, upload modal |
| `/documents/library/:id` | Document detail + citation excerpt |
| `/documents/reviews` | Approve / reassign / remove |
| `/documents/search` | Citation-aware search mock |
| `/documents/sources` | Connected sources + storage |
| `/documents/settings` | Workspace, digest, PIN, logo upload |

`/` and unknown paths redirect to overview.

## Structure

```
src/
  App.vue, main.js, style.css
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/  PageHeader, StatCard, ChartSection, FilterBar, StatusBadge, DataTable, UploadModal
  components/charts/   Sparkline, AreaChart, BarChart, DonutChart
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/documents.js
  utils/format.js, search.js, status.js
  views/*.vue
  test/setup.js
```

Equal-height cards: `.vault-stat-card, .vault-panel { height:100%; display:flex; flex-direction:column; }` and `.row > [class*="col-"] { display:flex; }`.

## Scripts

Requires Node.js 20+.

```bash
cd ai-document-workspace
npm install
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (5197) |
| `npm test` | Vitest (jsdom) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (4197) |
