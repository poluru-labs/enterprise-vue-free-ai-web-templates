export const APP_NAME = 'Hearth';
export const APP_TAGLINE = 'Employee experience';
export const BASE_PATH = '/experience';

export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Workplace lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_ITEMS = [
  { id: 'overview', to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'home' },
  { id: 'services', to: `${BASE_PATH}/services`, label: 'Services', icon: 'folder' },
  { id: 'feedback', to: `${BASE_PATH}/feedback`, label: 'Feedback', icon: 'star' },
  { id: 'announcements', to: `${BASE_PATH}/announcements`, label: 'Announcements', icon: 'bell' },
  { id: 'resources', to: `${BASE_PATH}/resources`, label: 'Resources', icon: 'file' },
  { id: 'search', to: `${BASE_PATH}/search`, label: 'Search', icon: 'search' },
  { id: 'settings', to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'Hearth',
  to: `${BASE_PATH}/overview`,
};

export const CATEGORY_OPTIONS = [
  { value: 'Workplace', label: 'Workplace' },
  { value: 'People', label: 'People' },
  { value: 'IT', label: 'IT' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Learning', label: 'Learning' },
];

export const SITE_OPTIONS = [
  { value: 'Austin', label: 'Austin' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'London', label: 'London' },
  { value: 'Remote', label: 'Remote' },
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

export const REQUEST_STEPS = [
  { id: 'asked', label: 'Asked', description: 'Request recorded' },
  { id: 'scheduled', label: 'Scheduled', description: 'Owner assigned a time' },
  { id: 'done', label: 'Done', description: 'Service completed' },
  { id: 'closed', label: 'Closed', description: 'Employee confirmed' },
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
    id: 'new-service',
    label: 'Add service',
    hint: 'Register a workplace service',
    to: `${BASE_PATH}/services?new=1`,
    group: 'Actions',
  },
];
