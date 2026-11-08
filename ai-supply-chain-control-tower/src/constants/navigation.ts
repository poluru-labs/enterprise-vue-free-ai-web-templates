export const APP_NAME = 'Stockwell'
export const BASE_PATH = '/stockwell'

export const SIGNED_IN_USER = {
  name: 'Firoz Poluru',
  role: 'Planner',
  email: 'firoz.poluru@stockwell.example',
}

export const NAV_ITEMS = [
  { id: 'tower', label: 'Tower', to: `${BASE_PATH}/tower` },
  { id: 'orders', label: 'Orders', to: `${BASE_PATH}/orders` },
  { id: 'suppliers', label: 'Suppliers', to: `${BASE_PATH}/suppliers` },
  { id: 'sites', label: 'Sites', to: `${BASE_PATH}/sites` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Stockwell', to: `${BASE_PATH}/tower` }

export const ORDER_STEPS = [
  { id: 'placed', label: 'Placed', description: 'On the sheet.' },
  { id: 'transit', label: 'In transit', description: 'With the carrier.' },
  { id: 'received', label: 'Received', description: 'On the dock.' },
] as const

export const PEOPLE = [
  'Firoz Poluru',
  'Heena Poluru',
  'Ishan Poluru',
  'Jahnavi Poluru',
  'Karan Poluru',
  'Lakshmi Poluru',
  'Madhav Poluru',
  'Niharika Poluru',
] as const
