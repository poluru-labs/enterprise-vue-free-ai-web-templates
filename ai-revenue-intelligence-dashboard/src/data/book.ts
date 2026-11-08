import { reactive } from 'vue'

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue'

export interface Rep {
  id: string
  name: string
  region: string
  quota: number
}

export interface Account {
  id: string
  name: string
  ownerId: string
  renewal: string
  renewalStep: number
  contact: string
  notes: { id: string; title: string; description: string; time: string }[]
}

export interface Invoice {
  id: string
  number: string
  accountId: string
  amount: number
  status: InvoiceStatus
  issued: string
}

export const book = reactive({
  currency: 'USD',
  fiscalStart: '2026-01-01',
  closeTime: '17:00',
  closeDay: '2026-12-31',
  note: 'Amounts stay in USD.',
  pin: '',
  lockPaid: true,
  notify: 'controller',
  reps: [
    { id: 'charu', name: 'Charu Poluru', region: 'Austin', quota: 480000 },
    { id: 'dinesh', name: 'Dinesh Poluru', region: 'Austin', quota: 420000 },
    { id: 'elina', name: 'Elina Poluru', region: 'Denver', quota: 390000 },
    { id: 'farhan', name: 'Farhan Poluru', region: 'Denver', quota: 360000 },
  ] as Rep[],
  accounts: [
    {
      id: 'north',
      name: 'North mill',
      ownerId: 'charu',
      renewal: '2027-02-01',
      renewalStep: 2,
      contact: 'Gauri Poluru',
      notes: [{ id: 'n1', title: 'Quote sent', description: 'Charu Poluru sent the renewal quote.', time: '2026-10-01' }],
    },
    {
      id: 'harbor',
      name: 'Harbor glass',
      ownerId: 'dinesh',
      renewal: '2026-12-01',
      renewalStep: 2,
      contact: 'Harsh Poluru',
      notes: [{ id: 'n2', title: 'Terms signed', description: 'Harsh Poluru signed the order.', time: '2026-09-02' }],
    },
    {
      id: 'cedar',
      name: 'Cedar freight',
      ownerId: 'elina',
      renewal: '2027-04-15',
      renewalStep: 1,
      contact: 'Inaya Poluru',
      notes: [{ id: 'n3', title: 'Quote out', description: 'Elina Poluru mailed the quote.', time: '2026-08-12' }],
    },
    {
      id: 'oak',
      name: 'Oak press',
      ownerId: 'farhan',
      renewal: '2026-11-20',
      renewalStep: 0,
      contact: 'Varun Poluru',
      notes: [{ id: 'n4', title: 'On the calendar', description: 'Farhan Poluru set the review.', time: '2026-10-20' }],
    },
    {
      id: 'pine',
      name: 'Pine clinic',
      ownerId: 'charu',
      renewal: '2027-01-08',
      renewalStep: 3,
      contact: 'Gauri Poluru',
      notes: [{ id: 'n5', title: 'Booked', description: 'Charu Poluru booked the renewal.', time: '2026-09-12' }],
    },
    {
      id: 'river',
      name: 'River paper',
      ownerId: 'dinesh',
      renewal: '2026-09-30',
      renewalStep: 2,
      contact: 'Harsh Poluru',
      notes: [{ id: 'n6', title: 'Terms signed', description: 'Dinesh Poluru filed the signature.', time: '2026-09-18' }],
    },
    {
      id: 'summit',
      name: 'Summit tools',
      ownerId: 'elina',
      renewal: '2027-06-01',
      renewalStep: 3,
      contact: 'Inaya Poluru',
      notes: [{ id: 'n7', title: 'Booked', description: 'Elina Poluru booked the year.', time: '2026-07-28' }],
    },
    {
      id: 'west',
      name: 'West kiln',
      ownerId: 'farhan',
      renewal: '2026-08-12',
      renewalStep: 1,
      contact: 'Harsh Poluru',
      notes: [{ id: 'n8', title: 'Quote out', description: 'Farhan Poluru sent the kiln quote.', time: '2026-10-11' }],
    },
    {
      id: 'lane',
      name: 'Lane bindery',
      ownerId: 'farhan',
      renewal: '2027-03-01',
      renewalStep: 0,
      contact: 'Inaya Poluru',
      notes: [{ id: 'n9', title: 'Opened', description: 'Farhan Poluru added the account.', time: '2026-11-02' }],
    },
  ] as Account[],
  invoices: [
    { id: 'i1041', number: 'LL-1041', accountId: 'north', amount: 124000, status: 'Sent', issued: '2026-10-02' },
    { id: 'i1048', number: 'LL-1048', accountId: 'pine', amount: 96000, status: 'Paid', issued: '2026-09-12' },
    { id: 'i1036', number: 'LL-1036', accountId: 'north', amount: 48000, status: 'Overdue', issued: '2026-08-04' },
    { id: 'i1044', number: 'LL-1044', accountId: 'harbor', amount: 82000, status: 'Paid', issued: '2026-09-14' },
    { id: 'i1033', number: 'LL-1033', accountId: 'river', amount: 61000, status: 'Sent', issued: '2026-10-20' },
    { id: 'i1055', number: 'LL-1055', accountId: 'harbor', amount: 54000, status: 'Draft', issued: '2026-11-06' },
    { id: 'i1038', number: 'LL-1038', accountId: 'cedar', amount: 210000, status: 'Overdue', issued: '2026-08-03' },
    { id: 'i1052', number: 'LL-1052', accountId: 'summit', amount: 98000, status: 'Paid', issued: '2026-07-28' },
    { id: 'i1040', number: 'LL-1040', accountId: 'west', amount: 110000, status: 'Sent', issued: '2026-10-11' },
    { id: 'i1050', number: 'LL-1050', accountId: 'oak', amount: 46000, status: 'Draft', issued: '2026-11-01' },
    { id: 'i1028', number: 'LL-1028', accountId: 'pine', amount: 20000, status: 'Paid', issued: '2026-06-02' },
  ] as Invoice[],
})

export function money(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function findAccount(id: string) {
  return book.accounts.find((account) => account.id === id)
}

export function findInvoice(id: string) {
  return book.invoices.find((invoice) => invoice.id === id)
}

export function findRep(id: string) {
  return book.reps.find((rep) => rep.id === id)
}

export function repName(id: string) {
  return findRep(id)?.name ?? 'Rep'
}

export function accountName(id: string) {
  return findAccount(id)?.name ?? 'Account'
}

export function inRange(issued: string, start: string, end: string) {
  return issued >= start && issued <= end
}

export function isBooked(status: InvoiceStatus) {
  return status !== 'Draft'
}

export function isOpen(status: InvoiceStatus) {
  return status === 'Draft' || status === 'Sent'
}

export function sumAmounts(invoices: Invoice[]) {
  return invoices.reduce((total, invoice) => total + invoice.amount, 0)
}

export function accountBalance(accountId: string) {
  return sumAmounts(book.invoices.filter((invoice) => invoice.accountId === accountId && invoice.status !== 'Paid'))
}

export function recordPayment(id: string, day: string) {
  const invoice = findInvoice(id)
  if (!invoice || invoice.status === 'Paid' || invoice.status === 'Draft') return
  invoice.status = 'Paid'
  const account = findAccount(invoice.accountId)
  account?.notes.unshift({
    id: `pay-${Date.now()}`,
    title: 'Payment recorded',
    description: `${invoice.number} paid on ${day}.`,
    time: day,
  })
}
