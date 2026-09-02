export const APP_NAME = 'Harbor';
export const APP_TAGLINE = 'Workspace control plane';
export const BASE_PATH = '/admin';
export const SIGNED_IN_USER = {
  name: 'Lakshmi Poluru',
  role: 'Platform admin',
  email: 'lakshmi.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Health, seats, and flags',
      },
      {
        to: `${BASE_PATH}/tenants`,
        label: 'Tenants',
        icon: 'bi-building',
        description: 'Workspaces and plans',
      },
      {
        to: `${BASE_PATH}/members`,
        label: 'Members',
        icon: 'bi-people',
        description: 'Seats and roles',
      },
    ],
  },
  {
    label: 'Governance',
    items: [
      {
        to: `${BASE_PATH}/flags`,
        label: 'Flags',
        icon: 'bi-flag',
        description: 'Rollouts and betas',
      },
      {
        to: `${BASE_PATH}/audit`,
        label: 'Audit',
        icon: 'bi-shield-lock',
        description: 'Security event log',
      },
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'Tenants, members, flags',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Workspace defaults',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Harbor',
  to: `${BASE_PATH}/overview`,
};

export const ROLE_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
];

export const PLAN_OPTIONS = [
  { value: 'Starter', label: 'Starter' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Enterprise', label: 'Enterprise' },
];

export const FLAG_STATUS_OPTIONS = [
  { value: 'development', label: 'Development' },
  { value: 'beta', label: 'Beta' },
  { value: 'rollout', label: 'Rollout' },
  { value: 'stable', label: 'Stable' },
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
    id: 'invite-member',
    label: 'Invite member',
    hint: 'Send a Harbor seat invite',
    to: `${BASE_PATH}/members?invite=1`,
    group: 'Actions',
  },
  {
    id: 'new-tenant',
    label: 'Create tenant',
    hint: 'Add a workspace to the control plane',
    to: `${BASE_PATH}/tenants?new=1`,
    group: 'Actions',
  },
  {
    id: 'new-flag',
    label: 'Create flag',
    hint: 'Start a new rollout',
    to: `${BASE_PATH}/flags?new=1`,
    group: 'Actions',
  },
  {
    id: 'poluru-cloud',
    label: 'Poluru Cloud',
    hint: 'Open the internal Enterprise workspace',
    to: `${BASE_PATH}/tenants/poluru-cloud`,
    group: 'Tenants',
  },
];
