export const APP_NAME = 'Folio';
export const APP_TAGLINE = 'Content operations';
export const BASE_PATH = '/content';
export const SIGNED_IN_USER = {
  name: 'Ananya Poluru',
  role: 'Content lead',
  email: 'ananya.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Desk',
    items: [
      { to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'bi-grid-1x2' },
      { to: `${BASE_PATH}/calendar`, label: 'Calendar', icon: 'bi-calendar3' },
      { to: `${BASE_PATH}/drafts`, label: 'Drafts', icon: 'bi-pencil-square' },
    ],
  },
  {
    label: 'Publish',
    items: [
      { to: `${BASE_PATH}/reviews`, label: 'Reviews', icon: 'bi-inboxes' },
      { to: `${BASE_PATH}/library`, label: 'Library', icon: 'bi-collection' },
      { to: `${BASE_PATH}/channels`, label: 'Channels', icon: 'bi-broadcast' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { to: `${BASE_PATH}/analytics`, label: 'Analytics', icon: 'bi-graph-up' },
      { to: `${BASE_PATH}/search`, label: 'Search', icon: 'bi-search' },
      { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'bi-gear' },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Folio',
  to: `${BASE_PATH}/overview`,
};

export const CHANNEL_OPTIONS = [
  { value: 'Web', label: 'Web' },
  { value: 'Email', label: 'Email' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'Help center', label: 'Help center' },
];

export const TYPE_OPTIONS = [
  { value: 'Article', label: 'Article' },
  { value: 'Email', label: 'Email' },
  { value: 'Social', label: 'Social' },
  { value: 'Landing', label: 'Landing' },
  { value: 'Video', label: 'Video' },
  { value: 'Help', label: 'Help' },
];

export const STATUS_OPTIONS = [
  { value: 'idea', label: 'Idea' },
  { value: 'draft', label: 'Draft' },
  { value: 'in_review', label: 'In review' },
  { value: 'approved', label: 'Approved' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
];

export const OWNER_OPTIONS = [
  { value: 'Ananya Poluru', label: 'Ananya Poluru' },
  { value: 'Kavya Poluru', label: 'Kavya Poluru' },
  { value: 'Meera Poluru', label: 'Meera Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
  { value: 'Divya Poluru', label: 'Divya Poluru' },
  { value: 'Vikram Poluru', label: 'Vikram Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Tara Poluru', label: 'Tara Poluru' },
];

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.label,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'new-brief',
    label: 'New brief',
    hint: 'Open a Folio brief',
    to: `${BASE_PATH}/drafts?new=1`,
    group: 'Actions',
  },
  {
    id: 'open-reviews',
    label: 'Review queue',
    hint: 'Pieces waiting on Tara Poluru',
    to: `${BASE_PATH}/reviews`,
    group: 'Actions',
  },
];
