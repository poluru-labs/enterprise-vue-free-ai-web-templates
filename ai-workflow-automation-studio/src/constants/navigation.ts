export const APP_NAME = 'Flowwell'
export const BASE_PATH = '/flowwell'

export const SIGNED_IN_USER = {
  name: 'Oviya Poluru',
  role: 'Studio lead',
  email: 'oviya.poluru@flowwell.example',
}

export const NAV_ITEMS = [
  { id: 'processes', label: 'Processes', to: `${BASE_PATH}/processes` },
  { id: 'runs', label: 'Runs', to: `${BASE_PATH}/runs` },
  { id: 'forms', label: 'Forms', to: `${BASE_PATH}/forms` },
  { id: 'owners', label: 'Owners', to: `${BASE_PATH}/owners` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Flowwell', to: `${BASE_PATH}/processes` }

export const PEOPLE = [
  'Oviya Poluru',
  'Pranav Poluru',
  'Ritika Poluru',
  'Sanjay Poluru',
  'Trisha Poluru',
  'Umesh Poluru',
  'Vidya Poluru',
  'Yogesh Poluru',
] as const
