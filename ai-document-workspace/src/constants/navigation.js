export const PRODUCT_NAME = 'Vault';
export const PRODUCT_TAGLINE = 'Knowledge ops';
export const BASE_PATH = '/documents';
export const STORAGE_USED = 68;

export const currentUser = {
  name: 'Ariana Poluru',
  role: 'Knowledge Ops Lead',
  email: 'ariana.poluru@polurulabs.example',
  initials: 'AP',
};

export const PATH_CRUMBS = [
  { id: 'workspace', label: 'Workspace', folder: null },
  { id: 'legal', label: 'Legal', folder: 'Legal' },
  { id: 'contracts', label: 'Contracts', folder: 'Contracts' },
];

export const NAV_ITEMS = [
  { name: 'overview', label: 'Overview', icon: 'bi-grid-1x2', to: `${BASE_PATH}/overview` },
  { name: 'library', label: 'Library', icon: 'bi-folder2-open', to: `${BASE_PATH}/library` },
  { name: 'reviews', label: 'Reviews', icon: 'bi-clipboard-check', to: `${BASE_PATH}/reviews` },
  { name: 'search', label: 'Search', icon: 'bi-search', to: `${BASE_PATH}/search` },
  { name: 'sources', label: 'Sources', icon: 'bi-hdd-network', to: `${BASE_PATH}/sources` },
  { name: 'settings', label: 'Settings', icon: 'bi-gear', to: `${BASE_PATH}/settings` },
];

export const COMMAND_ITEMS = [
  { label: 'Overview', hint: 'KPIs, activity, review queue', to: `${BASE_PATH}/overview`, group: 'Go to' },
  { label: 'Library', hint: 'Browse and filter documents', to: `${BASE_PATH}/library`, group: 'Go to' },
  { label: 'Reviews', hint: 'Approve, reassign, remove', to: `${BASE_PATH}/reviews`, group: 'Go to' },
  { label: 'Citation search', hint: 'Answers with source paragraphs', to: `${BASE_PATH}/search`, group: 'Go to' },
  { label: 'Sources', hint: 'Drive, SharePoint, Notion', to: `${BASE_PATH}/sources`, group: 'Go to' },
  { label: 'Settings', hint: 'Workspace, digest, PIN', to: `${BASE_PATH}/settings`, group: 'Go to' },
  { label: 'New document', hint: 'Upload to the library', action: 'upload', group: 'Actions' },
];
