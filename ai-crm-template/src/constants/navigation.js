export const APP_NAME = 'Bloom CRM';
export const APP_TAGLINE = 'Revenue workspace';
export const BASE_PATH = '/crm';
export const BRAND_COLOR = '#F13E93';

export const SIGNED_IN_USER = {
  name: 'Priya Poluru',
  email: 'priya.poluru@polurulabs.example',
  role: 'Revenue lead',
  quota: '$1.20M',
  attained: 78,
  initials: 'PP',
};

export const COMPANY = {
  name: 'Poluru Cloud',
  region: 'Americas · EMEA',
  fiscal: 'FY26 Q3',
  currency: 'USD',
};

export const NAV_GROUPS = [
  {
    label: 'Revenue',
    items: [
      { to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'bi-grid-1x2', description: 'Quota, coaching, pulse' },
      { to: `${BASE_PATH}/pipeline`, label: 'Pipeline', icon: 'bi-kanban', description: 'Stage board' },
      { to: `${BASE_PATH}/deals`, label: 'Deals', icon: 'bi-star', description: 'Opportunities' },
      { to: `${BASE_PATH}/leads`, label: 'Leads', icon: 'bi-person-plus', description: 'Inbound scores' },
    ],
  },
  {
    label: 'Book',
    items: [
      { to: `${BASE_PATH}/accounts`, label: 'Accounts', icon: 'bi-buildings', description: 'Health and hierarchy' },
      { to: `${BASE_PATH}/activities`, label: 'Activities', icon: 'bi-calendar-week', description: 'Agenda and sequences' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { to: `${BASE_PATH}/reports`, label: 'Reports', icon: 'bi-graph-up', description: 'Forecast by rep' },
      { to: `${BASE_PATH}/search`, label: 'Search', icon: 'bi-search', description: 'Deals, people, accounts' },
      { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'bi-gear', description: 'Profile, alerts, webhook' },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Bloom',
  to: `${BASE_PATH}/overview`,
};

export const PIPELINE_PILLS = [
  { id: 'qualify', label: 'Qualify', stages: ['Qualify', 'Discovery'] },
  { id: 'propose', label: 'Propose', stages: ['Proposal'] },
  { id: 'negotiate', label: 'Negotiate', stages: ['Negotiation'] },
  { id: 'closed', label: 'Closed', stages: ['Closed won'] },
];

export const QUICK_LINKS = [
  { id: 'ql-deal', label: 'Create deal', description: 'Open the new opportunity form', icon: 'plus' },
  { id: 'ql-call', label: 'Log a call', description: 'Capture notes and next step', icon: 'mail' },
  { id: 'ql-lead', label: 'Convert lead', description: 'Turn a score into a deal', icon: 'user' },
];

export const COMMAND_PAGES = NAV_ITEMS.map((item) => ({
  id: item.to,
  label: item.label,
  hint: item.description,
  to: item.to,
  group: 'Go to',
}));
