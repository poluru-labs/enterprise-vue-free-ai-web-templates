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

## Stack

- Vue 3
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
