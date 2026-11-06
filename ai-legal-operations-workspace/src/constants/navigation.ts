export const APP_NAME = 'Briefwell'
export const BASE_PATH = '/briefwell'

export const SIGNED_IN_USER = {
  name: 'Geeta Poluru',
  role: 'Counsel',
  email: 'geeta.poluru@briefwell.example',
}

export const NAV_ITEMS = [
  { id: 'matters', label: 'Matters', to: `${BASE_PATH}/matters` },
  { id: 'contracts', label: 'Contracts', to: `${BASE_PATH}/contracts` },
  { id: 'calendar', label: 'Calendar', to: `${BASE_PATH}/calendar` },
  { id: 'counsel', label: 'Counsel', to: `${BASE_PATH}/counsel` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Briefwell', to: `${BASE_PATH}/matters` }
