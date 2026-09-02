# Mint — Spend control

Vue 3 finance operations template for expenses, invoices, budgets, vendors, and month-end close. Built with Vue Router and `@poluru-labs/enterprise-design-system-vue`.

- **Product:** Mint
- **User:** Hana Poluru, Finance lead
- **Theme:** emerald `#047857` / `#10B981` on canvas `#F4FBF7`
- **Base path:** `/finance`
- **Ports:** `5196` (dev) · `4196` (preview)

## Unique header

The header is a **light mint bar** with a **bottom emerald close track** (64% of August close). It is not a page-link nav.

- Left: mint leaf/ledger mark + Mint
- Center: August close burn meter + remaining budget
- Pill search for expenses and vendors
- Submit expense, ⌘K, notifications, theme, Hana Poluru avatar

Page links live in the **deep forest sidebar**.

## Routes

| Path | View |
| --- | --- |
| `/finance/overview` | 6 KPIs, spend trend, accruals, recent expenses |
| `/finance/expenses` | Filterable expense list + composer |
| `/finance/expenses/:id` | Expense detail, approve / reject / delete |
| `/finance/invoices` | AP list, mark paid toast |
| `/finance/budgets` | Eight equal-height category cards |
| `/finance/analytics` | SVG category, invoice, and monthly charts |
| `/finance/vendors` | Vendor directory |
| `/finance/search` | Unified search |
| `/finance/settings` | Close calendar and alerts |

`/`, `/finance`, and unknown paths redirect to `/finance/overview`.

## Structure

```
src/
  App.vue
  main.js
  components/layout/   AppShell, AppHeader, AppSidebar
  components/widgets/  PageHeader, StatCard, StatusBadge, BudgetCard, ExpenseComposer, CommandPalette
  components/charts/   Sparkline, BarChart, ColumnChart, DonutChart, AreaChart
  composables/useCommandPalette.js
  constants/navigation.js
  data/*.json
  router/index.js
  stores/finance.js
  utils/format.js, search.js, status.js (+ tests)
  views/               Overview, Expenses, ExpenseDetail, Invoices, Budgets, Analytics, Vendors, Search, Settings
  test/setup.js
```

## Scripts

```bash
npm install
npm run dev      # http://localhost:5196
npm test         # vitest + jsdom
npm run build
npm run preview  # http://localhost:4196
```

## Features

- CRUD-ish expenses (add modal, approve, reject, delete)
- Invoice list with **Mark paid** toast
- Eight budget cards in a 4-column equal-height grid
- SVG analytics
- Vendor directory
- Six overview KPIs
- ⌘K command palette

Sample people and merchants use the Poluru last name. Data is local reactive state — no backend.
