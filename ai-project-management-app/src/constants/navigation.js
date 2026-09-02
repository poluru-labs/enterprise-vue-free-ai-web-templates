export const APP_NAME = 'Keel';
export const APP_TAGLINE = 'Delivery workspace';
export const BASE_PATH = '/projects';
export const BRAND_COLOR = '#0F766E';
export const ACCENT_COLOR = '#14B8A6';

export const SIGNED_IN_USER = {
  name: 'Arjun Poluru',
  email: 'arjun.poluru@polurulabs.example',
  role: 'Delivery lead',
  initials: 'AP',
  team: 'Platform',
};

export const COMPANY = {
  name: 'Poluru Labs',
  program: 'Keel workspace',
  quarter: 'FY26 Q3',
};

export const NAV_GROUPS = [
  {
    label: 'Delivery',
    items: [
      { to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'bi-grid-1x2', description: 'Six delivery KPIs' },
      { to: `${BASE_PATH}/board`, label: 'Board', icon: 'bi-kanban', description: 'Sprint columns' },
      { to: `${BASE_PATH}/backlog`, label: 'Backlog', icon: 'bi-list-task', description: 'Ranked work' },
      { to: `${BASE_PATH}/sprint`, label: 'Sprint', icon: 'bi-lightning', description: 'Burndown and scope' },
    ],
  },
  {
    label: 'Plan',
    items: [
      { to: `${BASE_PATH}/roadmap`, label: 'Roadmap', icon: 'bi-signpost-split', description: 'Quarter lanes' },
      { to: `${BASE_PATH}/teams`, label: 'Teams', icon: 'bi-people', description: 'Capacity load' },
      { to: `${BASE_PATH}/risks`, label: 'Risks', icon: 'bi-exclamation-diamond', description: 'Blockers and bets' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { to: `${BASE_PATH}/search`, label: 'Search', icon: 'bi-search', description: 'Issues, people, risks' },
      { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'bi-gear', description: 'Alerts and ingest' },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Keel',
  to: `${BASE_PATH}/overview`,
};

export const COLUMNS = [
  { id: 'todo', label: 'To do' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

export const ISSUE_TYPES = [
  { value: 'story', label: 'Story' },
  { value: 'bug', label: 'Bug' },
  { value: 'task', label: 'Task' },
];

export const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

export const QUICK_LINKS = [
  { id: 'ql-issue', label: 'New issue', description: 'Open the create-issue form', icon: 'plus' },
  { id: 'ql-board', label: 'Open board', description: 'Move work between columns', icon: 'folder' },
  { id: 'ql-sprint', label: 'Sprint 24', description: 'Burndown and remaining points', icon: 'clock' },
];

export const COMMAND_PAGES = NAV_ITEMS.map((item) => ({
  id: item.to,
  label: item.label,
  hint: item.description,
  to: item.to,
  group: 'Go to',
}));
