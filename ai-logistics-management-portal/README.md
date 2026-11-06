# Waybill

Shipment board for lanes between Austin, Dallas, and Chicago. A load shows its stage across the top: Picked up, In transit, At hub, Out for delivery, Delivered. The table under that bar selects a load, and the scans for that load sit below.

Signed in as Meera Poluru, Dock lead.

## Pages

- Loads — the board, the stage bar, and scans
- Load — pieces, scans, and proof of delivery
- Hubs — Austin, Dallas, and Chicago capacity
- Carriers — scores and a contact drawer
- Exceptions — delayed and short loads
- Settings — default hub and cutoff

## Stack

Vue 3, Vite, TypeScript, vue-router, and `@poluru-labs/enterprise-design-system-vue`. Light theme, clay `#C2410C`. Roboto for the interface, Lato for titles.

```sh
npm install
npm run dev
```

The dev server uses port **5224**. Open `http://localhost:5224/waybill/loads`.
