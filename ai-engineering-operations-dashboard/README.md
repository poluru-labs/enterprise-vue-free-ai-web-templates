# Northline

Engineering desk for Northline. A light, spruce-colored Vue 3 app for services, deploys, incidents, and the on-call roster.

People in the sample data use the surname Poluru. Status values are Healthy, Degraded, and Paused.

## Pages

- Overview — open incidents, deploy health, and the service table beside the deploy timeline
- Services — searchable catalog
- Service detail — facts, runbook, and the latest release
- Deploys — timeline and a release window
- Incidents — table and a write-up drawer
- People — teams and the on-call list
- Settings — desk profile

## Stack

Vue 3, Vite, TypeScript, vue-router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Fonts are Roboto and Lato. The accent is `#0F6E56`.

## Scripts

```sh
npm install
npm run dev
npm run build
```

The dev server listens on port 5218. Open `/northline/overview`.

Created by [Subrahmanyam Poluru](https://polurus.com).
