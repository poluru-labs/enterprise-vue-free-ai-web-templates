export const APP_NAME = 'Lumen';
export const APP_TAGLINE = 'Support operations';
export const BASE_PATH = '/helpdesk';
export const SIGNED_IN_USER = {
  id: 'agt-meera',
  name: 'Meera Poluru',
  role: 'Support lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Queue',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Load, SLA, and volume',
      },
      {
        to: `${BASE_PATH}/inbox`,
        label: 'Inbox',
        icon: 'bi-inbox',
        description: 'Live conversation queue',
      },
      {
        to: `${BASE_PATH}/tickets`,
        label: 'Tickets',
        icon: 'bi-ticket-perforated',
        description: 'Full ticket register',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/customers`,
        label: 'Customers',
        icon: 'bi-buildings',
        description: 'Accounts and contacts',
      },
      {
        to: `${BASE_PATH}/macros`,
        label: 'Macros',
        icon: 'bi-lightning',
        description: 'Canned replies',
      },
      {
        to: `${BASE_PATH}/knowledge`,
        label: 'Knowledge',
        icon: 'bi-journal-text',
        description: 'Help articles',
      },
      {
        to: `${BASE_PATH}/sla`,
        label: 'SLA',
        icon: 'bi-hourglass-split',
        description: 'Response policies',
      },
      {
        to: `${BASE_PATH}/agents`,
        label: 'Agents',
        icon: 'bi-headset',
        description: 'Coverage and load',
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Tickets, people, macros',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Desk defaults',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Lumen',
  to: `${BASE_PATH}/overview`,
};

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'pending', label: 'Pending' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const QUEUE_OPTIONS = [
  { value: 'all', label: 'All queues' },
  { value: 'Identity', label: 'Identity' },
  { value: 'Billing', label: 'Billing' },
  { value: 'Platform', label: 'Platform' },
  { value: 'Onboarding', label: 'Onboarding' },
];

export const CHANNEL_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'chat', label: 'Chat' },
  { value: 'portal', label: 'Portal' },
  { value: 'phone', label: 'Phone' },
];

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.description,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'assign-next',
    label: 'Assign next',
    hint: 'Take the oldest unassigned ticket',
    to: `${BASE_PATH}/inbox?assign=next`,
    group: 'Actions',
  },
  {
    id: 'open-breached',
    label: 'Breached tickets',
    hint: 'Jump to SLA breaches',
    to: `${BASE_PATH}/inbox?sla=breached`,
    group: 'Actions',
  },
  {
    id: 'new-macro',
    label: 'New macro',
    hint: 'Draft a canned reply',
    to: `${BASE_PATH}/macros?new=1`,
    group: 'Actions',
  },
];
