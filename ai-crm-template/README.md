# Bloom CRM

Vue 3 CRM workspace for Poluru Cloud sales. Theme color is `#F13E93`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Priya Poluru**, revenue lead.

## Run

Requires Node.js 20+.

```bash
cd ai-crm-template
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5191

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Hash | Page |
| --- | --- |
| `#/overview` | Quota, coaching, team board, agenda |
| `#/pipeline` | Stage board |
| `#/deals` | Filterable deal table |
| `#/deal/:id` | Opportunity workspace |
| `#/leads` | Lead scores and convert |
| `#/accounts` | Account tree and health |
| `#/account/:id` | Buying team |
| `#/activities` | Agenda and email sequence |
| `#/reports` | Forecast by rep |
| `#/settings` | Profile, alerts, webhook |

## Features

- **Global command search** (`⌘K` / `Ctrl+K`) — the palette now searches live across deals, leads, accounts, and contacts, in addition to the static page shortcuts.
- **Notification badge** — the inbox bell shows an unread count and supports "Mark all read" from the popover.
- **CSV export** — Deals, Leads, and Accounts pages have an "Export CSV" button that downloads the currently filtered rows.
- **Deal notes history** — saving a note on the deal workspace now appends it to that deal's activity timeline instead of only showing a toast.

## Stack

- Vue 3
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
