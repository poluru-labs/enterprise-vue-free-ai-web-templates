# Wardline

Hospital board for Wardline. A light, tide-colored Vue 3 app for rooms, units, shifts, and the supply carts.

People in the sample data use the surname Poluru. Rooms are numbers only. Status values are Open, Occupied, Cleaning, and Hold.

## Pages

- Board — beds open, admissions today, delayed discharges, and the room cards
- Units — one card per unit with an occupancy meter
- Unit detail — rooms, the charge nurse, and supply notes
- Shifts — the day timeline and a swap request
- Supplies — items under par
- Directory — the house roster
- Settings — the open-bed target

## Stack

Vue 3, Vite, TypeScript, vue-router, and [@poluru-labs/enterprise-design-system-vue](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-vue).

Fonts are Roboto and Lato. The accent is `#0284C7`.

## Scripts

```sh
npm install
npm run dev
npm run build
```

The dev server listens on port 5220. Open `/wardline/board`.

Created by [Subrahmanyam Poluru](https://polurus.com).
