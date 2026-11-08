export const APP_NAME = 'Studyhall'
export const BASE_PATH = '/studyhall'

export const SIGNED_IN_USER = {
  name: 'Raghav Poluru',
  role: 'Lab lead',
  email: 'raghav.poluru@studyhall.example',
}

export const NAV_ITEMS = [
  { id: 'studies', label: 'Studies', to: `${BASE_PATH}/studies` },
  { id: 'papers', label: 'Papers', to: `${BASE_PATH}/papers` },
  { id: 'grants', label: 'Grants', to: `${BASE_PATH}/grants` },
  { id: 'labs', label: 'Labs', to: `${BASE_PATH}/labs` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Studyhall', to: `${BASE_PATH}/studies` }

export const CATALOG_TABS = [
  { id: 'studies', label: 'Studies' },
  { id: 'papers', label: 'Papers' },
  { id: 'grants', label: 'Grants' },
] as const

export const KINDS = ['Materials', 'Field', 'Archive'] as const

export const MILESTONES = [
  { id: 'scope', label: 'Scope', description: 'Question set.' },
  { id: 'sample', label: 'Sample', description: 'Material in hand.' },
  { id: 'write', label: 'Write', description: 'Notes on the shelf.' },
  { id: 'file', label: 'File', description: 'Filed with the grant.' },
] as const

export const PEOPLE = [
  'Raghav Poluru',
  'Sahana Poluru',
  'Tejas Poluru',
  'Usha Poluru',
  'Vedha Poluru',
  'Yash Poluru',
  'Amol Poluru',
  'Bindu Poluru',
] as const
