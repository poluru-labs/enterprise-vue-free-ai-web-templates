# Folio · Content operations

Vue 3 dashboard to plan, create, review, publish, and measure content across channels. Built with Vite, Bootstrap, Vue Router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Signed in as **Ananya Poluru**, content lead.

## Setup

Requires Node.js 20+.

```bash
cd ai-content-operations-platform
npm install
npm run dev
```

Default dev server: **http://localhost:5201**

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server (port 5201) |
| `npm run build` | Production build (ES2022 target) |
| `npm run preview` | Preview production build (port 4201) |
| `npm test` | Vitest unit tests |

## Unique header

Light sticky bar (`#FFFFFF`) with **Folio** brand type in `#102E50` and a search field. New brief, reviews, notifications, and profile live in the sidebar.

## Theme

- Navy `#102E50` / `#1A406B` / `#3D6A96`
- Canvas `#F4F7FB`
- Fonts: Roboto (UI) + Lato (headings)
- CSS prefix: `flo-`
- Light theme only
- No borders — cards and chrome use soft shadow only

## Routes

Base path: `/content`

| Path | Page |
| --- | --- |
| `/content/overview` | Desk pulse, publish trend, channel mix, reviews |
| `/content/calendar` | Editorial calendar and asset drop |
| `/content/drafts` | Brief library with filters |
| `/content/drafts/:id` | Piece detail |
| `/content/reviews` | Approval queue |
| `/content/library` | Published pieces |
| `/content/channels` | Channel tree and fill |
| `/content/analytics` | Output and reach |
| `/content/search` | Cross-search pieces and channels |
| `/content/settings` | Workspace defaults |

## Stack

Vue 3, Vite, Vue Router, Bootstrap 5, Bootstrap Icons, Vitest, `@poluru-labs/enterprise-design-system-vue`.
