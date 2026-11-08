export const APP_NAME = 'Hirewell'
export const BASE_PATH = '/hirewell'

export const SIGNED_IN_USER = {
  name: 'Ishaan Poluru',
  role: 'Recruiting lead',
  email: 'ishaan.poluru@hirewell.example',
}

export const NAV_ITEMS = [
  { id: 'roles', label: 'Roles', to: `${BASE_PATH}/roles` },
  { id: 'candidates', label: 'Candidates', to: `${BASE_PATH}/candidates` },
  { id: 'interviews', label: 'Interviews', to: `${BASE_PATH}/interviews` },
  { id: 'offers', label: 'Offers', to: `${BASE_PATH}/offers` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Hirewell', to: `${BASE_PATH}/roles` }

export const STAGES = [
  { id: 'applied', label: 'Applied', description: 'In the pile.' },
  { id: 'screen', label: 'Screen', description: 'First call.' },
  { id: 'interview', label: 'Interview', description: 'On site.' },
  { id: 'offer', label: 'Offer', description: 'Terms out.' },
] as const

export const LOCATIONS = ['Austin', 'Denver'] as const

export const PEOPLE = [
  'Ishaan Poluru',
  'Juhi Poluru',
  'Kunal Poluru',
  'Lila Poluru',
  'Manoj Poluru',
  'Nandini Poluru',
  'Omkar Poluru',
  'Pallavi Poluru',
] as const
