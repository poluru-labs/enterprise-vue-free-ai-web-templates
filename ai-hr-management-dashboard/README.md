# Grove · People operations

Vue 3 HR dashboard for headcount, leave, hiring, learning, and org groups. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Sravani Poluru**, people lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-hr-management-dashboard
npm install
npm run dev
```

Default dev server: **http://localhost:5194**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5194) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4194) |
| `npm test` | Vitest unit tests |

## Unique header

Light violet sticky bar (`#F5F3FF`) with a **4px `#7C3AED` stripe on the top** — not a left rail:

- Leaf-people **Grove** mark on the left
- Center **avatar cluster** of people currently on leave (4–5 avatars) plus **“6 on leave this week”**
- Mini calendar chip **“Next holiday · Labor Day”**
- Search people, **⌘K**, **Add employee**, notifications, Sravani avatar

## Theme

- Violet `#7C3AED` / `#5B21B6`
- Canvas `#F5F3FF`
- Font: Outfit
- CSS prefix: `grove-`
- Equal-height cards: `.grove-stat-card, .grove-panel, .grove-person-card, .grove-course-card, .grove-req-card, .grove-org-card { display:flex; flex-direction:column; height:100%; }` and `.row > [class*="col-"] { display:flex; }`

## Routes

Base path: `/hr`

| Path | Page |
| --- | --- |
| `/hr/overview` | Six KPIs (headcount, open roles, on leave, eNPS, time-to-hire, learning hours) |
| `/hr/people` | Employee directory with filters |
| `/hr/people/:id` | Person detail — profile and leave history |
| `/hr/leave` | PTO calendar and approve-leave toast |
| `/hr/hiring` | Open reqs and pipeline |
| `/hr/learning` | Equal-height course cards |
| `/hr/org` | Department groups |
| `/hr/search` | Cross-search people, leave, reqs |
| `/hr/settings` | Grove defaults and alert routing |

## Structure

```
src/
  App.vue
  main.js
  components/layout/AppShell.vue, AppHeader.vue, AppSidebar.vue
  components/widgets/PageHeader.vue, StatCard.vue, ChartSection.vue, FilterBar.vue, StatusBadge.vue, DataTable.vue, PersonCard.vue, CourseCard.vue, ReqCard.vue
  components/charts/Sparkline.vue, AreaChart.vue, BarChart.vue, DonutChart.vue
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/hr.js
  utils/format.js, search.js, status.js  + *.test.js
  views/OverviewView.vue, PeopleView.vue, PersonDetailView.vue, LeaveView.vue, HiringView.vue, LearningView.vue, OrgView.vue, SearchView.vue, SettingsView.vue
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
