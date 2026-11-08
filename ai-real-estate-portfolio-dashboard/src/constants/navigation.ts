export const APP_NAME = 'Lotwell'
export const BASE_PATH = '/lotwell'

export const SIGNED_IN_USER = {
  name: 'Anil Poluru',
  role: 'Portfolio lead',
  email: 'anil.poluru@lotwell.example',
}

export const NAV_ITEMS = [
  { id: 'portfolio', label: 'Portfolio', to: `${BASE_PATH}/portfolio` },
  { id: 'properties', label: 'Properties', to: `${BASE_PATH}/properties` },
  { id: 'leases', label: 'Leases', to: `${BASE_PATH}/leases` },
  { id: 'maintenance', label: 'Maintenance', to: `${BASE_PATH}/maintenance` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Lotwell', to: `${BASE_PATH}/portfolio` }

export const CITIES = ['Austin', 'Denver'] as const

export const PEOPLE = [
  'Anil Poluru',
  'Bhavna Poluru',
  'Chirag Poluru',
  'Damini Poluru',
  'Gautam Poluru',
  'Hema Poluru',
  'Imran Poluru',
  'Jasmin Poluru',
] as const
