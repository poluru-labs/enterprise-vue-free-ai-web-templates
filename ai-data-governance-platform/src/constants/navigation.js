export const APP_NAME = 'Cobalt';
export const APP_TAGLINE = 'Data governance';
export const BASE_PATH = '/governance';

export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Data steward lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_ITEMS = [
  { id: 'overview', to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'home' },
  { id: 'catalog', to: `${BASE_PATH}/catalog`, label: 'Catalog', icon: 'folder' },
  { id: 'owners', to: `${BASE_PATH}/owners`, label: 'Owners', icon: 'user' },
  { id: 'quality', to: `${BASE_PATH}/quality`, label: 'Quality', icon: 'check-circle' },
  { id: 'policies', to: `${BASE_PATH}/policies`, label: 'Policies', icon: 'file' },
  { id: 'access', to: `${BASE_PATH}/access`, label: 'Access', icon: 'lock' },
  { id: 'search', to: `${BASE_PATH}/search`, label: 'Search', icon: 'search' },
  { id: 'settings', to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'Cobalt',
  to: `${BASE_PATH}/overview`,
};

export const DOMAIN_OPTIONS = [
  { value: 'Customer', label: 'Customer' },
  { value: 'Finance', label: 'Finance' },
  { value: 'People', label: 'People' },
  { value: 'Product', label: 'Product' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Platform', label: 'Platform' },
];

export const CLASS_OPTIONS = [
  { value: 'public', label: 'Public' },
  { value: 'internal', label: 'Internal' },
  { value: 'confidential', label: 'Confidential' },
  { value: 'restricted', label: 'Restricted' },
];

export const SYSTEM_OPTIONS = [
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Lake', label: 'Lake' },
  { value: 'App', label: 'App' },
  { value: 'Files', label: 'Files' },
];

export const OWNER_OPTIONS = [
  { value: 'Meera Poluru', label: 'Meera Poluru' },
  { value: 'Arjun Poluru', label: 'Arjun Poluru' },
  { value: 'Kavya Poluru', label: 'Kavya Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
  { value: 'Ananya Poluru', label: 'Ananya Poluru' },
  { value: 'Lakshmi Poluru', label: 'Lakshmi Poluru' },
  { value: 'Madhav Poluru', label: 'Madhav Poluru' },
  { value: 'Harini Poluru', label: 'Harini Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Sana Poluru', label: 'Sana Poluru' },
  { value: 'Nikhil Poluru', label: 'Nikhil Poluru' },
];

export const ACCESS_STEPS = [
  { id: 'requested', label: 'Requested', description: 'Purpose recorded' },
  { id: 'review', label: 'Review', description: 'Steward check' },
  { id: 'approved', label: 'Approved', description: 'Owner signed' },
  { id: 'granted', label: 'Granted', description: 'Access live' },
];

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: `Open ${item.label.toLowerCase()}`,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'new-asset',
    label: 'Register asset',
    hint: 'Add a dataset to the catalog',
    to: `${BASE_PATH}/catalog?new=1`,
    group: 'Actions',
  },
];
