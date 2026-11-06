import { reactive } from 'vue'

export type Stage = 'Draft' | 'Review' | 'Approved' | 'Ordered' | 'Received'
export type Category = 'Office' | 'Facilities' | 'Software'
export type Site = 'Austin' | 'Dallas' | 'Chicago'

export interface Line {
  id: string
  sku: string
  name: string
  qty: number
  price: number
  received: number
}

export interface Order {
  id: string
  number: string
  title: string
  stage: Stage
  supplierId: string
  buyer: string
  approver: string
  site: Site
  filed: string
  category: Category
  lines: Line[]
  note: string
  events: { id: string; title: string; description: string; time: string }[]
}

export interface Supplier {
  id: string
  name: string
  category: Category
  contact: string
  site: Site
  phone: string
  email: string
  score: number
}

export const book = reactive({
  threshold: 2500,
  site: 'Austin' as Site,
  cutoff: '15:00',
  reviewOn: '2026-11-20',
  note: 'Orders over the threshold need a named approver.',
  holdDraft: true,
  pin: '',
  suppliers: [
    { id: 'sp-north', name: 'North Desk', category: 'Office', contact: 'Hemant Poluru', site: 'Austin', phone: '512-0144', email: 'hemant.poluru@northdesk.example', score: 5 },
    { id: 'sp-bright', name: 'Bright Supply', category: 'Facilities', contact: 'Jatin Poluru', site: 'Dallas', phone: '214-0182', email: 'jatin.poluru@bright.example', score: 4 },
    { id: 'sp-harbor', name: 'Harbor Soft', category: 'Software', contact: 'Lokesh Poluru', site: 'Chicago', phone: '312-0119', email: 'lokesh.poluru@harbor.example', score: 4 },
    { id: 'sp-paper', name: 'Paper Dock', category: 'Office', contact: 'Nitin Poluru', site: 'Austin', phone: '512-0160', email: 'nitin.poluru@paper.example', score: 5 },
    { id: 'sp-elm', name: 'Elm Facilities', category: 'Facilities', contact: 'Ira Poluru', site: 'Dallas', phone: '214-0133', email: 'ira.poluru@elm.example', score: 4 },
    { id: 'sp-lantern', name: 'Lantern Soft', category: 'Software', contact: 'Kala Poluru', site: 'Chicago', phone: '312-0177', email: 'kala.poluru@lantern.example', score: 3 },
  ] as Supplier[],
  orders: [
    {
      id: 'po-1904',
      number: 'PW-1904',
      title: 'Office chairs',
      stage: 'Draft',
      supplierId: 'sp-north',
      buyer: 'Hemant Poluru',
      approver: 'Ira Poluru',
      site: 'Austin',
      filed: '2026-11-02',
      category: 'Office',
      note: '',
      lines: [
        { id: 'l1', sku: 'CH-14', name: 'Chair', qty: 8, price: 250, received: 0 },
        { id: 'l2', sku: 'CH-02', name: 'Mat', qty: 8, price: 50, received: 0 },
      ],
      events: [{ id: 'e1', title: 'Draft opened', description: 'Hemant Poluru started the chairs.', time: 'Nov 2' }],
    },
    {
      id: 'po-1908',
      number: 'PW-1908',
      title: 'Desk lamps',
      stage: 'Review',
      supplierId: 'sp-bright',
      buyer: 'Jatin Poluru',
      approver: 'Kala Poluru',
      site: 'Dallas',
      filed: '2026-11-06',
      category: 'Facilities',
      note: '',
      lines: [{ id: 'l3', sku: 'LM-3', name: 'Lamp', qty: 10, price: 86, received: 0 }],
      events: [{ id: 'e2', title: 'Sent for review', description: 'Waiting on Kala Poluru.', time: 'Nov 6' }],
    },
    {
      id: 'po-1912',
      number: 'PW-1912',
      title: 'Software seats',
      stage: 'Approved',
      supplierId: 'sp-harbor',
      buyer: 'Lokesh Poluru',
      approver: 'Mira Poluru',
      site: 'Chicago',
      filed: '2026-10-28',
      category: 'Software',
      note: '',
      lines: [
        { id: 'l4', sku: 'SW-1', name: 'Seat', qty: 20, price: 180, received: 0 },
        { id: 'l5', sku: 'SW-2', name: 'Support', qty: 1, price: 600, received: 0 },
      ],
      events: [{ id: 'e3', title: 'Approved', description: 'Mira Poluru cleared the seats.', time: 'Oct 30' }],
    },
    {
      id: 'po-1916',
      number: 'PW-1916',
      title: 'Office paper',
      stage: 'Ordered',
      supplierId: 'sp-paper',
      buyer: 'Nitin Poluru',
      approver: 'Gita Poluru',
      site: 'Austin',
      filed: '2026-11-01',
      category: 'Office',
      note: 'First cartons are on the dock.',
      lines: [
        { id: 'l6', sku: 'PP-1', name: 'Ream', qty: 40, price: 12, received: 20 },
        { id: 'l7', sku: 'PP-2', name: 'Folder', qty: 16, price: 10, received: 0 },
      ],
      events: [
        { id: 'e4', title: 'Ordered', description: 'Sent to Paper Dock.', time: 'Nov 1' },
        { id: 'e5', title: 'Partial receipt', description: '20 reams arrived.', time: 'Nov 8' },
      ],
    },
    {
      id: 'po-1920',
      number: 'PW-1920',
      title: 'Air filters',
      stage: 'Received',
      supplierId: 'sp-elm',
      buyer: 'Hemant Poluru',
      approver: 'Ira Poluru',
      site: 'Dallas',
      filed: '2026-10-18',
      category: 'Facilities',
      note: 'All filters are in the cage.',
      lines: [{ id: 'l8', sku: 'FL-1', name: 'Filter', qty: 20, price: 59, received: 20 }],
      events: [{ id: 'e6', title: 'Received', description: 'Ira Poluru signed the dock slip.', time: 'Oct 24' }],
    },
    {
      id: 'po-1924',
      number: 'PW-1924',
      title: 'Backup seats',
      stage: 'Review',
      supplierId: 'sp-lantern',
      buyer: 'Jatin Poluru',
      approver: 'Kala Poluru',
      site: 'Chicago',
      filed: '2026-11-10',
      category: 'Software',
      note: '',
      lines: [{ id: 'l9', sku: 'SW-9', name: 'Backup', qty: 1, price: 3100, received: 0 }],
      events: [{ id: 'e7', title: 'Sent for review', description: 'Over the spend threshold.', time: 'Nov 10' }],
    },
    {
      id: 'po-1928',
      number: 'PW-1928',
      title: 'Office desks',
      stage: 'Draft',
      supplierId: 'sp-north',
      buyer: 'Lokesh Poluru',
      approver: 'Mira Poluru',
      site: 'Austin',
      filed: '2026-11-12',
      category: 'Office',
      note: '',
      lines: [{ id: 'l10', sku: 'DK-1', name: 'Desk', qty: 4, price: 1400, received: 0 }],
      events: [{ id: 'e8', title: 'Draft opened', description: 'Lokesh Poluru priced four desks.', time: 'Nov 12' }],
    },
    {
      id: 'po-1932',
      number: 'PW-1932',
      title: 'Wall paint',
      stage: 'Ordered',
      supplierId: 'sp-elm',
      buyer: 'Nitin Poluru',
      approver: 'Gita Poluru',
      site: 'Chicago',
      filed: '2026-09-22',
      category: 'Facilities',
      note: '',
      lines: [{ id: 'l11', sku: 'PT-1', name: 'Paint', qty: 14, price: 70, received: 0 }],
      events: [{ id: 'e9', title: 'Ordered', description: 'Sent to Elm Facilities.', time: 'Sep 22' }],
    },
  ] as Order[],
})

export function findOrder(id: string) {
  return book.orders.find((order) => order.id === id)
}

export function findSupplier(id: string) {
  return book.suppliers.find((supplier) => supplier.id === id)
}

export function supplierName(id: string) {
  return findSupplier(id)?.name ?? 'Supplier'
}

export function orderTotal(order: Order) {
  return order.lines.reduce((sum, line) => sum + line.qty * line.price, 0)
}

export function money(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
