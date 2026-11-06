export const APP_NAME = 'Allyard'
export const BASE_PATH = '/allyard'

export const SIGNED_IN_USER = {
  name: 'Asha Poluru',
  role: 'Alliance lead',
  email: 'asha.poluru@allyard.example',
}

export const NAV_ITEMS = [
  { id: 'partners', label: 'Partners', to: `${BASE_PATH}/partners` },
  { id: 'deals', label: 'Deals', to: `${BASE_PATH}/deals` },
  { id: 'enablement', label: 'Enablement', to: `${BASE_PATH}/enablement` },
  { id: 'contacts', label: 'Contacts', to: `${BASE_PATH}/contacts` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Allyard', to: `${BASE_PATH}/partners` }

export const TIERS = ['Registered', 'Select', 'Premier'] as const

export const ENABLEMENT_STEPS = [
  { id: 'agreement', label: 'Agreement', description: 'Signed and filed.' },
  { id: 'access', label: 'Portal access', description: 'Desk login is live.' },
  { id: 'training', label: 'First training', description: 'A named session.' },
  { id: 'deal', label: 'First deal', description: 'One deal on the book.' },
] as const
