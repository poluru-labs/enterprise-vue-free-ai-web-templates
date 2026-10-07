export const APP_NAME = 'Marigold';
export const APP_TAGLINE = 'Customer success';
export const BASE_PATH = '/success';

export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Customer success lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_ITEMS = [
  { id: 'overview', to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'home' },
  { id: 'accounts', to: `${BASE_PATH}/accounts`, label: 'Accounts', icon: 'user' },
  { id: 'renewals', to: `${BASE_PATH}/renewals`, label: 'Renewals', icon: 'calendar' },
  { id: 'onboarding', to: `${BASE_PATH}/onboarding`, label: 'Onboarding', icon: 'folder' },
  { id: 'activities', to: `${BASE_PATH}/activities`, label: 'Activities', icon: 'clock' },
  { id: 'search', to: `${BASE_PATH}/search`, label: 'Search', icon: 'search' },
  { id: 'settings', to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'Marigold',
  to: `${BASE_PATH}/overview`,
};

export const SEGMENT_OPTIONS = [
  { value: 'Enterprise', label: 'Enterprise' },
  { value: 'Mid-market', label: 'Mid-market' },
  { value: 'Growth', label: 'Growth' },
];

export const REGION_OPTIONS = [
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia Pacific', label: 'Asia Pacific' },
];

export const HEALTH_OPTIONS = [
  { value: 'all', label: 'All health' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'watch', label: 'Watch' },
  { value: 'at_risk', label: 'At risk' },
];

export const RENEWAL_STAGE_OPTIONS = [
  { value: 'all', label: 'All stages' },
  { value: 'committed', label: 'Committed' },
  { value: 'negotiating', label: 'Negotiating' },
  { value: 'at_risk', label: 'At risk' },
  { value: 'renewed', label: 'Renewed' },
];

export const ACTIVITY_OPTIONS = [
  { value: 'all', label: 'All activities' },
  { value: 'qbr', label: 'QBR' },
  { value: 'health_check', label: 'Health check' },
  { value: 'training', label: 'Training' },
  { value: 'renewal', label: 'Renewal' },
  { value: 'exec', label: 'Executive' },
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
];

export const ONBOARDING_STEPS = [
  { id: 'kickoff', label: 'Kickoff', description: 'Goals and sponsors' },
  { id: 'integrate', label: 'Integrate', description: 'Data and access' },
  { id: 'train', label: 'Train', description: 'Admins and champions' },
  { id: 'live', label: 'Go live', description: 'First value' },
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
    id: 'new-account',
    label: 'Add account',
    hint: 'Open the account form',
    to: `${BASE_PATH}/accounts?new=1`,
    group: 'Actions',
  },
];
