# Enterprise Vue Free AI Web Templates

A curated collection of free Vue 3 templates for AI dashboards, SaaS products, admin panels, and internal tools. Each template is a self-contained Vite app that uses [`@poluru-labs/enterprise-design-system-vue`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

## Templates

| Template | Description | Dev port |
| --- | --- | --- |
| [AI Admin Dashboard](ai-admin-dashboard/README.md) | Organizations, seats, flags, and workspace settings. | 5190 |
| [AI CRM](ai-crm-template/README.md) | Bloom CRM — pipeline, accounts, and sales activity. Theme `#F13E93`. | 5191 |
| [AI SaaS Analytics](ai-saas-analytics-dashboard/README.md) | Activation, retention, and product usage. | 5192 |
| [AI Helpdesk Portal](ai-helpdesk-support-portal/README.md) | Support queues, SLAs, and suggested replies. | 5193 |
| [AI HR Management](ai-hr-management-dashboard/README.md) | Headcount, leave, hiring, and learning. | 5194 |
| [AI Project Management](ai-project-management-app/README.md) | Boards, sprints, capacity, and delivery risk. | 5195 |
| [AI Finance & Expense](ai-finance-expense-dashboard/README.md) | Spend, invoices, and month-end close. | 5196 |
| [AI Document Workspace](ai-document-workspace/README.md) | Document library, reviews, and search. | 5197 |
| [AI Sales Ops](ai-sales-ops-dashboard/README.md) | Forecast, coverage, and deal hygiene. | 5198 |
| [AI Knowledge Intranet](ai-knowledge-base-intranet-template/README.md) | Policies, how-tos, and team spaces. | 5199 |

## Getting started

Requires Node.js 20+. Choose a template, install its dependencies, and start Vite:

```bash
cd ai-admin-dashboard
npm install
npm run dev
```

Each template has its own `package.json`. Shared stack:

- Vue 3
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-vue`

## Boilerplate layout

```
<template-name/
  index.html
  package.json
  vite.config.js
  public/favicon.svg
  src/main.js
  src/App.vue
  src/style.css
  README.md
```
