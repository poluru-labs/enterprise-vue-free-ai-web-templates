# Aegis · Compliance desk

Vue 3 dashboard for controls, audits, policies, risks, and regulatory requirements. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Kavya Poluru**, compliance lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-compliance-management-dashboard
npm install
npm run dev
```

Default dev server: **http://localhost:5200**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5200) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4200) |
| `npm test` | Vitest unit tests |

## Unique header

Light sticky bar (`#FFFFFF`) with a **4px `#FF5722` stripe on the top**:

- Shield **Aegis** mark on the left
- Center **audit calendar chip** plus a **coverage meter**
- Search, **⌘K**, **Add control**, notifications, Kavya avatar

## Theme

- Orange `#FF5722` / `#E64A19` / `#BF360C`
- Canvas `#FFF7F4`
- Fonts: Roboto (UI) + Lato (headings)
- CSS prefix: `aeg-`
- Light theme only
- Equal-height cards: `.aeg-stat-card, .aeg-panel { display:flex; flex-direction:column; height:100%; }`

## Routes

Base path: `/compliance`

| Path | Page |
| --- | --- |
| `/compliance/overview` | Six KPIs, coverage trend, framework mix, audits, evidence |
| `/compliance/controls` | Control library with filters and CRUD |
| `/compliance/controls/:id` | Control detail — score, mapping, notes |
| `/compliance/audits` | Audit calendar, timeline, evidence upload |
| `/compliance/audits/:id` | Audit detail |
| `/compliance/policies` | Policy cards and acknowledgments |
| `/compliance/risks` | Risk register with residual bands |
| `/compliance/requirements` | Framework tree and clause mapping |
| `/compliance/search` | Cross-search controls, audits, risks |
| `/compliance/settings` | Workspace defaults and alert routing |

## Stack

- Vue 3 + Vue Router
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
- Vitest
