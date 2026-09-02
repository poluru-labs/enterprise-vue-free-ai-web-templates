# Keel · Delivery workspace

Vue 3 project management for sprints, boards, capacity, and risks. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Arjun Poluru**, delivery lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-project-management-app
npm install
npm run dev
```

Default dev server: **http://localhost:5195**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5195) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4195) |
| `npm test` | Vitest unit tests |

## Unique header

Dark teal sticky bar (`#0F766E`) with a **full-width sprint progress rail** along the bottom (story points **34/50**):

- Left: keel/ship mark + **Keel**
- Center: **Sprint 24 · 8 days left** plus the story-point fraction
- Sprint **switcher** select (Sprint 23 / 24 / 25)
- Compact search, ⌘K, **New issue**, notifications, Arjun avatar
- Bottom rail fill is aqua (`#14B8A6` → `#5EEAD4`) with a diamond keel marker at 68%

Not a magenta ribbon, slate stripe, emerald close-track, indigo sparkline strip, sky badge row, violet avatar stack, or amber crumb path.

## Theme

- Teal `#0F766E` / accent `#14B8A6`
- Canvas `#F0FDFA`
- Font: Sora (display) + Figtree (UI)
- CSS prefix: `keel-`
- Equal-height cards: `.keel-stat-card, .keel-panel, .keel-issue-card, .keel-team-card, .keel-risk-card { display:flex; flex-direction:column; height:100%; }` and `.row > [class*="col-"] { display:flex; }`

## Routes

Base path: `/projects`

| Path | Page |
| --- | --- |
| `/projects/overview` | Six KPIs (on track, at risk, cycle time, velocity, bugs, capacity) |
| `/projects/board` | Kanban — To do / In progress / Review / Done, move-card toasts |
| `/projects/backlog` | Ranked unscheduled work |
| `/projects/sprint` | Current sprint + burndown chart |
| `/projects/roadmap` | Quarter lanes |
| `/projects/teams` | Equal-height capacity cards |
| `/projects/risks` | Equal-height risk cards |
| `/projects/search` | Cross-search issues, risks, teams |
| `/projects/settings` | Profile, alerts, WIP limit, webhook |

## Structure

```
src/
  App.vue
  main.js
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/PageHeader.vue, StatCard.vue, ChartSection.vue, FilterBar.vue, StatusBadge.vue, DataTable.vue
  components/charts/Sparkline.vue, AreaChart.vue, BarChart.vue, DonutChart.vue, BurndownChart.vue
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/projects.js
  utils/format.js, search.js, status.js  + *.test.js
  views/OverviewView.vue, BoardView.vue, BacklogView.vue, SprintView.vue, RoadmapView.vue, TeamsView.vue, RisksView.vue, SearchView.vue, SettingsView.vue
  test/setup.js
```

`App.vue` only wraps `EdsThemeProvider`, `ToastProvider`, and the router.

## Stack

- Vue 3
- Vue Router 4
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
- Vitest + @vue/test-utils + jsdom

## License

MIT
