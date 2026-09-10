# AI Marketing Command Center

A responsive Vue 3 + TypeScript marketing workspace for Poluru Labs, featuring the #5FACD3 brand palette and Google Roboto / Open Sans fonts.

## Run locally

```sh
npm install
npm run dev
```

## Validate and build

```sh
npm run build
```

The build runs Vue TypeScript checks and produces a static site in `dist/`.

## Included

- Overview with revenue trends, channel breakdown, and campaign metrics
- Searchable campaigns, status filters, draft creation, and activation/pause controls
- CSV campaign report export
- Audience segments with campaign creation shortcuts
- Content studio with sample creatives and demo publication
- Automation workflows with pause/resume controls
- Sample AI insights, workspace preferences, and help
- Responsive navigation, keyboard search (Cmd/Ctrl+K), keyboard-accessible campaign details, and focus-trapped dialogs
- Optional WebMCP campaign filtering when supported by the browser

## Demo scope

All records and insights are sample data. Edits last for the current browser session and reset on reload. Campaign activation and content publication do not send emails or publish ads. Live analytics, AI generation, authentication, and durable storage require backend and marketing-platform integrations. Reporting periods illustrate sample aggregates.

WebMCP registration is feature detected. A supporting browser is required to validate its runtime contract.
