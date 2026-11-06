export const APP_NAME = 'Wardline'
export const BASE_PATH = '/wardline'

export const SIGNED_IN_USER = {
  name: 'Isha Poluru',
  role: 'House lead',
  email: 'isha.poluru@wardline.example',
}

export const NAV_ITEMS = [
  { id: 'board', label: 'Board', to: `${BASE_PATH}/board` },
  { id: 'units', label: 'Units', to: `${BASE_PATH}/units` },
  { id: 'shifts', label: 'Shifts', to: `${BASE_PATH}/shifts` },
  { id: 'supplies', label: 'Supplies', to: `${BASE_PATH}/supplies` },
  { id: 'directory', label: 'Directory', to: `${BASE_PATH}/directory` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Wardline', to: `${BASE_PATH}/board` }
