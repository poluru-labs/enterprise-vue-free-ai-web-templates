export const APP_NAME = 'Watchline'
export const BASE_PATH = '/watchline'

export const SIGNED_IN_USER = {
  name: 'Jhanvi Poluru',
  role: 'Watch lead',
  email: 'jhanvi.poluru@watchline.example',
}

export const NAV_ITEMS = [
  { id: 'incidents', label: 'Incidents', to: `${BASE_PATH}/incidents` },
  { id: 'assets', label: 'Assets', to: `${BASE_PATH}/assets` },
  { id: 'access', label: 'Access', to: `${BASE_PATH}/access` },
  { id: 'changes', label: 'Changes', to: `${BASE_PATH}/changes` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Watchline', to: `${BASE_PATH}/incidents` }

export const SEVERITIES = ['Info', 'Low', 'High'] as const

export const WATCH_STEPS = [
  { id: 'open', label: 'Open', description: 'On the queue.' },
  { id: 'owned', label: 'Owned', description: 'Someone is on it.' },
  { id: 'closed', label: 'Closed', description: 'Filed.' },
] as const

export const PEOPLE = [
  'Jhanvi Poluru',
  'Krish Poluru',
  'Lina Poluru',
  'Mohit Poluru',
  'Naina Poluru',
  'Parth Poluru',
  'Reva Poluru',
  'Samar Poluru',
] as const
