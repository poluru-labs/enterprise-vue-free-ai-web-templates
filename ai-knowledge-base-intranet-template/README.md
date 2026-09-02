# Atlas

Company intranet for team spaces, policies, and how-tos. Vue 3 + Vite + Bootstrap + [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue) + vue-router.

## Product

- **Name:** Atlas
- **Tagline:** Company intranet
- **Theme:** olive `#3F6212` / lime `#65A30D`, canvas `#F7FEE7`
- **CSS prefix:** `atlas-`
- **Signed-in:** Ramesh Poluru, Internal comms
- **Dev:** http://localhost:5199 (`/intranet/overview`)
- **Preview:** http://localhost:4199

## Unique header

Olive / forest **space switcher** — two rows, not a cream file-path bar:

- Top row: forest `#365314` with globe mark + **Atlas**, search, **Publish article**, ⌘K, notifications, Ramesh avatar
- Second row: light lime `#ECFCCB` **space tabs** — Engineering / People / Legal / GTM (jump to space detail or filter articles)
- Serif-ish Fraunces kicker (“Company intranet”) on the olive bar

## Routes (`BASE_PATH` `/intranet`)

| Path | View |
| --- | --- |
| `/intranet/overview` | 6 KPIs (articles, spaces, unread, searches, drafts, stale), reads chart, space mix |
| `/intranet/spaces` | Six equal-height space cards |
| `/intranet/spaces/:id` | Space detail + pages in that team |
| `/intranet/articles` | Article list + space / type / status filters |
| `/intranet/articles/:id` | Article detail + bookmark toast |
| `/intranet/how-tos` | Six equal-height how-to cards |
| `/intranet/policies` | Policy cards by space |
| `/intranet/search` | Intranet search mock |
| `/intranet/settings` | Workspace, default space, digest |

`/` and unknown paths redirect to overview.

## Structure

```
src/
  App.vue, main.js, style.css
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/  PageHeader, StatCard, ChartSection, FilterBar, StatusBadge, DataTable, SpaceCard, HowToCard, PublishModal
  components/charts/   Sparkline, AreaChart, BarChart, DonutChart
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/intranet.js
  utils/format.js, search.js, status.js
  views/*.vue
  test/setup.js
```

Equal-height cards: `.atlas-stat-card, .atlas-panel, .atlas-space-card, .atlas-howto-card { height:100%; display:flex; flex-direction:column; }` and `.row > [class*="col-"] { display:flex; }`.

## Scripts

Requires Node.js 20+.

```bash
cd ai-knowledge-base-intranet-template
npm install
npm run dev
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (5199) |
| `npm test` | Vitest (jsdom) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build (4199) |
