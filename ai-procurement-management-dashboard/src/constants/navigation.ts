export const APP_NAME = 'Purchasewell'
export const BASE_PATH = '/purchasewell'

export const SIGNED_IN_USER = {
  name: 'Gita Poluru',
  role: 'Buyer',
  email: 'gita.poluru@purchasewell.example',
}

export const NAV_ITEMS = [
  { id: 'orders', label: 'Orders', to: `${BASE_PATH}/orders` },
  { id: 'suppliers', label: 'Suppliers', to: `${BASE_PATH}/suppliers` },
  { id: 'approvals', label: 'Approvals', to: `${BASE_PATH}/approvals` },
  { id: 'receipts', label: 'Receipts', to: `${BASE_PATH}/receipts` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Purchasewell', to: `${BASE_PATH}/orders` }

export const STAGES = [
  { id: 'draft', label: 'Draft', description: 'Still with the buyer.' },
  { id: 'review', label: 'Review', description: 'Waiting on an approver.' },
  { id: 'approved', label: 'Approved', description: 'Cleared to place.' },
  { id: 'ordered', label: 'Ordered', description: 'Sent to the supplier.' },
  { id: 'received', label: 'Received', description: 'On the dock.' },
] as const

export const SITES = ['Austin', 'Dallas', 'Chicago'] as const
