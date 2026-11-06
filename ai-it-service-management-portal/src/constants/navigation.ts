export const APP_NAME = 'Deskline'
export const BASE_PATH = '/deskline'

export const SIGNED_IN_USER = {
  name: 'Pavan Poluru',
  role: 'Desk lead',
  email: 'pavan.poluru@deskline.example',
}

export const NAV_ITEMS = [
  { id: 'queue', label: 'Queue', to: `${BASE_PATH}/queue` },
  { id: 'changes', label: 'Changes', to: `${BASE_PATH}/changes` },
  { id: 'assets', label: 'Assets', to: `${BASE_PATH}/assets` },
  { id: 'catalog', label: 'Catalog', to: `${BASE_PATH}/catalog` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Deskline', to: `${BASE_PATH}/queue` }
