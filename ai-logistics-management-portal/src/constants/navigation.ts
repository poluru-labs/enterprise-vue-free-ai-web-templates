export const APP_NAME = 'Waybill'
export const BASE_PATH = '/waybill'

export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Dock lead',
  email: 'meera.poluru@waybill.example',
}

export const NAV_ITEMS = [
  { id: 'loads', label: 'Loads', to: `${BASE_PATH}/loads` },
  { id: 'hubs', label: 'Hubs', to: `${BASE_PATH}/hubs` },
  { id: 'carriers', label: 'Carriers', to: `${BASE_PATH}/carriers` },
  { id: 'exceptions', label: 'Exceptions', to: `${BASE_PATH}/exceptions` },
  { id: 'settings', label: 'Settings', to: `${BASE_PATH}/settings` },
] as const

export const BREADCRUMB_ROOT = { label: 'Waybill', to: `${BASE_PATH}/loads` }

export const STAGES = [
  { id: 'picked', label: 'Picked up', description: 'Left the shipper.' },
  { id: 'transit', label: 'In transit', description: 'On the lane.' },
  { id: 'hub', label: 'At hub', description: 'On the dock.' },
  { id: 'out', label: 'Out for delivery', description: 'With the driver.' },
  { id: 'done', label: 'Delivered', description: 'Signed for.' },
] as const
