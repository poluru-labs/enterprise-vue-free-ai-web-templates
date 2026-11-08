export const APP_NAME = 'Ledgerline'
export const BASE_PATH = '/ledgerline'

export const SIGNED_IN_USER = {
  name: 'Varun Poluru',
  role: 'Controller',
  email: 'varun.poluru@ledgerline.example',
}

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', to: `${BASE_PATH}/overview` },
  { id: 'accounts', label: 'Accounts', to: `${BASE_PATH}/accounts` },
  { id: 'invoices', label: 'Invoices', to: `${BASE_PATH}/invoices` },
  { id: 'reps', label: 'Reps', to: `${BASE_PATH}/reps` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Ledgerline', to: `${BASE_PATH}/overview` }

export const INVOICE_STATUSES = ['Draft', 'Sent', 'Paid', 'Overdue'] as const

export const RENEWAL_STEPS = [
  { id: 'review', label: 'Review', description: 'On the calendar.' },
  { id: 'quoted', label: 'Quoted', description: 'Quote out.' },
  { id: 'signed', label: 'Signed', description: 'Terms signed.' },
  { id: 'booked', label: 'Booked', description: 'On the books.' },
] as const

export const CURRENCIES = ['USD'] as const

export const PEOPLE = [
  'Varun Poluru',
  'Charu Poluru',
  'Dinesh Poluru',
  'Elina Poluru',
  'Farhan Poluru',
  'Gauri Poluru',
  'Harsh Poluru',
  'Inaya Poluru',
] as const
