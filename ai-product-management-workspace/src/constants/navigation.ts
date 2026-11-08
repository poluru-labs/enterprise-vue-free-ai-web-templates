export const APP_NAME = 'Specboard'
export const BASE_PATH = '/specboard'

export const SIGNED_IN_USER = {
  name: 'Maya Poluru',
  role: 'Product lead',
  email: 'maya.poluru@specboard.example',
}

export const NAV_ITEMS = [
  { id: 'roadmap', label: 'Roadmap', to: `${BASE_PATH}/roadmap` },
  { id: 'specs', label: 'Specs', to: `${BASE_PATH}/specs` },
  { id: 'backlog', label: 'Backlog', to: `${BASE_PATH}/backlog` },
  { id: 'releases', label: 'Releases', to: `${BASE_PATH}/releases` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Specboard', to: `${BASE_PATH}/roadmap` }

export const HORIZONS = ['Now', 'Next', 'Later'] as const

export const AREAS = ['Notifications', 'Audit', 'Access'] as const

export const PEOPLE = [
  'Maya Poluru',
  'Naveen Poluru',
  'Ojas Poluru',
  'Priya Poluru',
  'Rahul Poluru',
  'Sneha Poluru',
  'Tilak Poluru',
  'Urvi Poluru',
] as const

export const SPEC_STEPS = [
  { id: 'draft', label: 'Draft', description: 'Still being written.' },
  { id: 'review', label: 'In review', description: 'With the owners.' },
  { id: 'locked', label: 'Locked', description: 'Scope is set.' },
  { id: 'shipped', label: 'Shipped', description: 'In the product.' },
] as const
