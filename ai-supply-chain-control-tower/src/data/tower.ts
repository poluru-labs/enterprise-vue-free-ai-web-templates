import { reactive } from 'vue'

export type OrderState = 'Open' | 'Late' | 'Received' | 'Draft'

export interface Line {
  id: string
  item: string
  qty: number
  unit: string
}

export interface Order {
  id: string
  number: string
  title: string
  supplierId: string
  siteId: string
  carrier: string
  owner: string
  state: OrderState
  due: string
  step: number
  delay: string
  lines: Line[]
}

export interface Supplier {
  id: string
  name: string
  siteId: string
  owner: string
  goods: string
  score: number
}

export interface Site {
  id: string
  name: string
  city: string
  lead: string
  capacity: number
  max: number
}

export const tower = reactive({
  name: 'Stockwell',
  defaultSite: 'austin',
  planStart: '2026-11-09',
  planEnd: '2026-11-15',
  cutoff: '15:00',
  note: 'Late orders stay on the delay list.',
  pin: '',
  holdDrafts: true,
  notify: 'planner',
  fillRate: 86,
  sites: [
    { id: 'austin', name: 'Austin dock', city: 'Austin', lead: 'Firoz Poluru', capacity: 78, max: 100 },
    { id: 'denver', name: 'Denver yard', city: 'Denver', lead: 'Heena Poluru', capacity: 64, max: 100 },
    { id: 'harbor', name: 'Harbor shed', city: 'Harbor', lead: 'Ishan Poluru', capacity: 51, max: 100 },
  ] as Site[],
  suppliers: [
    { id: 'mill', name: 'North mill', siteId: 'austin', owner: 'Heena Poluru', goods: 'Flour', score: 4 },
    { id: 'glass', name: 'Harbor glass', siteId: 'denver', owner: 'Ishan Poluru', goods: 'Jars', score: 5 },
    { id: 'freight', name: 'Cedar freight', siteId: 'harbor', owner: 'Jahnavi Poluru', goods: 'Carrier', score: 3 },
    { id: 'press', name: 'Oak press', siteId: 'austin', owner: 'Karan Poluru', goods: 'Labels', score: 4 },
    { id: 'paper', name: 'River paper', siteId: 'denver', owner: 'Lakshmi Poluru', goods: 'Sacks', score: 5 },
    { id: 'lane', name: 'Lane bindery', siteId: 'harbor', owner: 'Niharika Poluru', goods: 'Twine', score: 2 },
  ] as Supplier[],
  orders: [
    {
      id: 'sw-5510',
      number: 'SW-5510',
      title: 'Rye flour',
      supplierId: 'mill',
      siteId: 'austin',
      carrier: 'Cedar freight',
      owner: 'Firoz Poluru',
      state: 'Open',
      due: '2026-11-12',
      step: 1,
      delay: '',
      lines: [
        { id: 'l1', item: 'Rye flour', qty: 40, unit: 'bags' },
        { id: 'l2', item: 'Honey', qty: 12, unit: 'jars' },
      ],
    },
    {
      id: 'sw-5514',
      number: 'SW-5514',
      title: 'Jar cases',
      supplierId: 'glass',
      siteId: 'denver',
      carrier: 'Cedar freight',
      owner: 'Heena Poluru',
      state: 'Open',
      due: '2026-11-20',
      step: 0,
      delay: '',
      lines: [{ id: 'l3', item: 'Jars', qty: 200, unit: 'cases' }],
    },
    {
      id: 'sw-5518',
      number: 'SW-5518',
      title: 'Pallet transfer',
      supplierId: 'freight',
      siteId: 'harbor',
      carrier: 'Cedar freight',
      owner: 'Ishan Poluru',
      state: 'Late',
      due: '2026-11-02',
      step: 1,
      delay: 'The truck left Denver a day late.',
      lines: [{ id: 'l4', item: 'Pallets', qty: 18, unit: 'pallets' }],
    },
    {
      id: 'sw-5522',
      number: 'SW-5522',
      title: 'Label sheets',
      supplierId: 'press',
      siteId: 'austin',
      carrier: 'Oak press',
      owner: 'Jahnavi Poluru',
      state: 'Open',
      due: '2026-11-18',
      step: 0,
      delay: '',
      lines: [{ id: 'l5', item: 'Labels', qty: 5000, unit: 'sheets' }],
    },
    {
      id: 'sw-5526',
      number: 'SW-5526',
      title: 'Sack bales',
      supplierId: 'paper',
      siteId: 'denver',
      carrier: 'River paper',
      owner: 'Karan Poluru',
      state: 'Received',
      due: '2026-10-28',
      step: 2,
      delay: '',
      lines: [{ id: 'l6', item: 'Sacks', qty: 80, unit: 'bales' }],
    },
    {
      id: 'sw-5530',
      number: 'SW-5530',
      title: 'Flour top-up',
      supplierId: 'mill',
      siteId: 'harbor',
      carrier: 'North mill',
      owner: 'Lakshmi Poluru',
      state: 'Open',
      due: '2026-11-25',
      step: 0,
      delay: '',
      lines: [{ id: 'l7', item: 'Flour', qty: 20, unit: 'bags' }],
    },
    {
      id: 'sw-5504',
      number: 'SW-5504',
      title: 'Label run',
      supplierId: 'press',
      siteId: 'denver',
      carrier: 'Oak press',
      owner: 'Madhav Poluru',
      state: 'Late',
      due: '2026-11-01',
      step: 1,
      delay: 'The print run missed Friday.',
      lines: [{ id: 'l8', item: 'Labels', qty: 1200, unit: 'sheets' }],
    },
    {
      id: 'sw-5508',
      number: 'SW-5508',
      title: 'Flour short',
      supplierId: 'mill',
      siteId: 'austin',
      carrier: 'North mill',
      owner: 'Firoz Poluru',
      state: 'Late',
      due: '2026-10-30',
      step: 1,
      delay: 'The mill was short 10 bags.',
      lines: [{ id: 'l9', item: 'Flour', qty: 30, unit: 'bags' }],
    },
    {
      id: 'sw-5538',
      number: 'SW-5538',
      title: 'Twine spool',
      supplierId: 'lane',
      siteId: 'harbor',
      carrier: 'Lane bindery',
      owner: 'Niharika Poluru',
      state: 'Draft',
      due: '2026-11-28',
      step: 0,
      delay: '',
      lines: [],
    },
  ] as Order[],
})

export function findOrder(id: string) {
  return tower.orders.find((order) => order.id === id)
}

export function findSite(id: string) {
  return tower.sites.find((site) => site.id === id)
}

export function findSupplier(id: string) {
  return tower.suppliers.find((supplier) => supplier.id === id)
}

export function siteName(id: string) {
  return findSite(id)?.name ?? id
}

export function supplierName(id: string) {
  return findSupplier(id)?.name ?? id
}

export function ordersByState(state: OrderState) {
  return tower.orders.filter((order) => order.state === state)
}
