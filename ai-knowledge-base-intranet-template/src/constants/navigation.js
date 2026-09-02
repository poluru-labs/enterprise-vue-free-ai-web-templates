export const PRODUCT_NAME = 'Atlas';
export const PRODUCT_TAGLINE = 'Company intranet';
export const BASE_PATH = '/intranet';

export const currentUser = {
  name: 'Ramesh Poluru',
  role: 'Internal comms',
  email: 'ramesh.poluru@polurulabs.example',
  initials: 'RP',
};

export const SPACE_TABS = [
  { id: 'engineering', label: 'Engineering', icon: 'bi-cpu' },
  { id: 'people', label: 'People', icon: 'bi-people' },
  { id: 'legal', label: 'Legal', icon: 'bi-bank' },
  { id: 'gtm', label: 'GTM', icon: 'bi-graph-up-arrow' },
];

export const NAV_ITEMS = [
  { name: 'overview', label: 'Overview', icon: 'bi-grid-1x2', to: `${BASE_PATH}/overview` },
  { name: 'spaces', label: 'Spaces', icon: 'bi-diagram-3', to: `${BASE_PATH}/spaces` },
  { name: 'articles', label: 'Articles', icon: 'bi-journal-text', to: `${BASE_PATH}/articles` },
  { name: 'how-tos', label: 'How-tos', icon: 'bi-list-check', to: `${BASE_PATH}/how-tos` },
  { name: 'policies', label: 'Policies', icon: 'bi-shield-check', to: `${BASE_PATH}/policies` },
  { name: 'search', label: 'Search', icon: 'bi-search', to: `${BASE_PATH}/search` },
  { name: 'settings', label: 'Settings', icon: 'bi-gear', to: `${BASE_PATH}/settings` },
];

export const COMMAND_ITEMS = [
  { label: 'Overview', hint: 'KPIs, reads, and stale pages', to: `${BASE_PATH}/overview`, group: 'Go to' },
  { label: 'Spaces', hint: 'Six team knowledge spaces', to: `${BASE_PATH}/spaces`, group: 'Go to' },
  { label: 'Articles', hint: 'Browse and filter the intranet', to: `${BASE_PATH}/articles`, group: 'Go to' },
  { label: 'How-tos', hint: 'Step-by-step internal guides', to: `${BASE_PATH}/how-tos`, group: 'Go to' },
  { label: 'Policies', hint: 'Company rules that stay current', to: `${BASE_PATH}/policies`, group: 'Go to' },
  { label: 'Search', hint: 'Find a page across spaces', to: `${BASE_PATH}/search`, group: 'Go to' },
  { label: 'Settings', hint: 'Digest, default space, bookmarks', to: `${BASE_PATH}/settings`, group: 'Go to' },
  { label: 'Engineering space', hint: 'Jump via the space switcher', to: `${BASE_PATH}/spaces/engineering`, group: 'Spaces' },
  { label: 'People space', hint: 'Benefits and leave', to: `${BASE_PATH}/spaces/people`, group: 'Spaces' },
  { label: 'Legal space', hint: 'Contracts and privacy', to: `${BASE_PATH}/spaces/legal`, group: 'Spaces' },
  { label: 'GTM space', hint: 'Playbooks and launches', to: `${BASE_PATH}/spaces/gtm`, group: 'Spaces' },
  { label: 'Publish article', hint: 'Draft a page in Atlas', action: 'publish', group: 'Actions' },
];
