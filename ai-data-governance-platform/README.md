# Cobalt · Data governance

Vue 3 dashboard for data ownership, quality, catalogs, policies, and access requests. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Meera Poluru**, data steward lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-data-governance-platform
npm install
npm run dev
```

Default dev server: **http://localhost:5203**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5203) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build (port 4203) |

## Header

Light sticky bar (`#FFFFFF`) with a **4px `#3368A0` stripe**:

- Cobalt mark on the left
- Search and **⌘K**
- Open-requests pill, notifications, and **Register asset**

## Theme

- Cobalt `#3368A0`, with deep `#23486F` for links
- Canvas `#F4F7FB`
- Fonts: Roboto (UI) + Lato (headings)
- CSS prefix: `cbt-`
- Light theme only
- Equal-height cards: `.cbt-stat-card, .cbt-panel { display:flex; flex-direction:column; height:100%; }`

## Routes

Base path: `/governance`

| Path | Page |
| --- | --- |
| `/governance/overview` | Registry health, quality trend, classification, open access |
| `/governance/catalog` | Asset cards with owner, classification, and quality |
| `/governance/catalog/:id` | Asset facts, checks, access, and dictionary |
| `/governance/owners` | Domain tree and named owners |
| `/governance/quality` | Check table and passing share |
| `/governance/policies` | Policy library, coverage, and drafts |
| `/governance/access` | Requests, grant, and deny |
| `/governance/search` | Cross-search the registry |
| `/governance/settings` | Digest, quality line, and workspace mark |

## Stack

- Vue 3 + Vue Router
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
