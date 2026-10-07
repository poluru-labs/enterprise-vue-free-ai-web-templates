# Marigold · Customer success

Vue 3 dashboard for customer health, renewals, onboarding, and success activities. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Meera Poluru**, customer success lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-customer-success-hub
npm install
npm run dev
```

Default dev server: **http://localhost:5202**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5202) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build (port 4202) |

## Header

Light sticky bar (`#FFFFFF`) with a **4px `#F2C46A` stripe**:

- Marigold mark on the left
- Search and **⌘K**
- Renewals pill, notifications, and **Add account**

## Theme

- Gold `#F2C46A`, with deep gold `#8A6410` for text on light surfaces
- Canvas `#FFF9F0`
- Fonts: Roboto (UI) + Lato (headings)
- CSS prefix: `mrg-`
- Light theme only
- No borders on the shell, cards, or panels — soft shadow only
- Equal-height cards: `.mrg-stat-card, .mrg-panel { display:flex; flex-direction:column; height:100%; }`

## Routes

Base path: `/success`

| Path | Page |
| --- | --- |
| `/success/overview` | Book health, trend, segments, renewals, onboarding |
| `/success/accounts` | Account cards with health and sentiment |
| `/success/accounts/:id` | Account detail, people, plan, activity |
| `/success/renewals` | Renewal window, table, and sequence |
| `/success/onboarding` | Plays, progress, and kickoff files |
| `/success/activities` | QBRs, health checks, training, executive notes |
| `/success/search` | Cross-search the book |
| `/success/settings` | Digest, health line, and workspace mark |

## Stack

- Vue 3 + Vue Router
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
