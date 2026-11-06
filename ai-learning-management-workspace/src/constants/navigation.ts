export const APP_NAME = 'Courtyard'
export const BASE_PATH = '/courtyard'

export const SIGNED_IN_USER = {
  name: 'Aditi Poluru',
  role: 'Registrar',
  email: 'aditi.poluru@courtyard.example',
}

export const NAV_ITEMS = [
  { id: 'catalog', label: 'Catalog', to: `${BASE_PATH}/catalog` },
  { id: 'paths', label: 'Paths', to: `${BASE_PATH}/paths` },
  { id: 'people', label: 'People', to: `${BASE_PATH}/people` },
  { id: 'sessions', label: 'Sessions', to: `${BASE_PATH}/sessions` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Courtyard', to: `${BASE_PATH}/catalog` }

export const LIBRARY_TABS = [
  { id: 'catalog', label: 'Catalog' },
  { id: 'paths', label: 'Paths' },
  { id: 'people', label: 'People' },
] as const
