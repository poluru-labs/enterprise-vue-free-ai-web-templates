# Tide · DevOps control

Vue 3 dashboard for pipelines, environments, deployments, uptime, and infrastructure health. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Meera Poluru**, release lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-devops-control-center
npm install
npm run dev
```

Default dev server: **http://localhost:5204**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5204) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build (port 4204) |

## Header

Light sticky bar (`#FFFFFF`) with a **4px `#086288` stripe**:

- Tide mark on the left
- Search and **⌘K**
- In-flight pill, notifications, and **Start pipeline**

## Theme

- Teal `#086288`, with deep `#043E56` for links
- Canvas `#F3F8FA`
- Fonts: Roboto (UI) + Lato (headings)
- CSS prefix: `tde-`
- Light theme only
- Equal-height cards: `.tde-stat-card, .tde-panel { display:flex; flex-direction:column; height:100%; }`

## Routes

Base path: `/devops`

| Path | Page |
| --- | --- |
| `/devops/overview` | Board health, ship trend, environments, in-flight deploys |
| `/devops/pipelines` | Pipeline cards with owner, region, and success |
| `/devops/pipelines/:id` | Facts, runs, release steps, and notes |
| `/devops/environments` | Service tree and environment health |
| `/devops/deployments` | Release table, ship, and fail |
| `/devops/uptime` | Service checks and healthy share |
| `/devops/infrastructure` | Clusters, databases, queues, and caches |
| `/devops/search` | Cross-search the board |
| `/devops/settings` | Digest, uptime line, and board mark |

## Stack

- Vue 3 + Vue Router
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`
