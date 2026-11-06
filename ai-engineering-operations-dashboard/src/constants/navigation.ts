export const APP_NAME = 'Northline'
export const BASE_PATH = '/northline'

export const SIGNED_IN_USER = {
  name: 'Sana Poluru',
  role: 'Engineering lead',
  email: 'sana.poluru@northline.example',
}

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', to: `${BASE_PATH}/overview` },
  { id: 'services', label: 'Services', to: `${BASE_PATH}/services` },
  { id: 'deploys', label: 'Deploys', to: `${BASE_PATH}/deploys` },
  { id: 'incidents', label: 'Incidents', to: `${BASE_PATH}/incidents` },
  { id: 'people', label: 'People', to: `${BASE_PATH}/people` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Northline', to: `${BASE_PATH}/overview` }
