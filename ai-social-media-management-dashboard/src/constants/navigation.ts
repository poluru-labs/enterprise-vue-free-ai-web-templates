export const APP_NAME = 'Postwell'
export const BASE_PATH = '/postwell'

export const SIGNED_IN_USER = {
  name: 'Tanvi Poluru',
  role: 'Publisher',
  email: 'tanvi.poluru@postwell.example',
}

export const NAV_ITEMS = [
  { id: 'calendar', label: 'Calendar', to: `${BASE_PATH}/calendar` },
  { id: 'drafts', label: 'Drafts', to: `${BASE_PATH}/drafts` },
  { id: 'channels', label: 'Channels', to: `${BASE_PATH}/channels` },
  { id: 'library', label: 'Library', to: `${BASE_PATH}/library` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Postwell', to: `${BASE_PATH}/calendar` }

export const CHANNELS = ['Notes', 'Photos', 'Mail'] as const

export const PEOPLE = [
  'Tanvi Poluru',
  'Uday Poluru',
  'Vani Poluru',
  'Yuvan Poluru',
  'Akarsh Poluru',
  'Brinda Poluru',
  'Darsh Poluru',
  'Eesha Poluru',
] as const
