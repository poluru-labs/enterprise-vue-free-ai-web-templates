export const APP_NAME = 'Copperlane'
export const BASE_PATH = '/copperlane'

export const SIGNED_IN_USER = {
  name: 'Farah Poluru',
  role: 'Reviewer',
  email: 'farah.poluru@copperlane.example',
}

export const NAV_ITEMS = [
  { id: 'inbox', label: 'Inbox', to: `${BASE_PATH}/inbox` },
  { id: 'mine', label: 'Mine', to: `${BASE_PATH}/mine` },
  { id: 'reports', label: 'Reports', to: `${BASE_PATH}/reports` },
  { id: 'vendors', label: 'Vendors', to: `${BASE_PATH}/vendors` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Copperlane', to: `${BASE_PATH}/inbox` }
