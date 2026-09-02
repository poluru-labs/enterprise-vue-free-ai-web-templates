export const APP_NAME = 'Grove';
export const APP_TAGLINE = 'People operations';
export const BASE_PATH = '/hr';
export const SIGNED_IN_USER = {
  name: 'Sravani Poluru',
  role: 'People lead',
  email: 'sravani.poluru@polurulabs.example',
};

export const NEXT_HOLIDAY = {
  name: 'Labor Day',
  date: '2026-09-07',
  label: 'Next holiday · Labor Day',
};

export const NAV_GROUPS = [
  {
    label: 'People',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-grid-1x2',
        description: 'Headcount and pulse',
      },
      {
        to: `${BASE_PATH}/people`,
        label: 'People',
        icon: 'bi-people',
        description: 'Employee directory',
      },
      {
        to: `${BASE_PATH}/org`,
        label: 'Org',
        icon: 'bi-diagram-3',
        description: 'Teams and reporting',
      },
    ],
  },
  {
    label: 'Cycles',
    items: [
      {
        to: `${BASE_PATH}/leave`,
        label: 'Leave',
        icon: 'bi-calendar-heart',
        description: 'PTO and holidays',
      },
      {
        to: `${BASE_PATH}/hiring`,
        label: 'Hiring',
        icon: 'bi-briefcase',
        description: 'Reqs and pipeline',
      },
      {
        to: `${BASE_PATH}/learning`,
        label: 'Learning',
        icon: 'bi-mortarboard',
        description: 'Courses and hours',
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        to: `${BASE_PATH}/search`,
        label: 'Search',
        icon: 'bi-search',
        description: 'People, leave, reqs',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Grove defaults',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Grove',
  to: `${BASE_PATH}/overview`,
};

export const DEPARTMENT_OPTIONS = [
  { value: 'People', label: 'People' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Customer Success', label: 'Customer Success' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Data', label: 'Data' },
  { value: 'Learning', label: 'Learning' },
];

export const LOCATION_OPTIONS = [
  { value: 'Austin', label: 'Austin' },
  { value: 'Chicago', label: 'Chicago' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Remote', label: 'Remote' },
];

export const EMPLOYMENT_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Contract', label: 'Contract' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'on_leave', label: 'On leave' },
  { value: 'offboarding', label: 'Offboarding' },
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
    id: 'add-employee',
    label: 'Add employee',
    hint: 'Open the Grove hire modal',
    to: `${BASE_PATH}/people?new=1`,
    group: 'Actions',
  },
  {
    id: 'approve-leave',
    label: 'Review leave',
    hint: 'Pending PTO this week',
    to: `${BASE_PATH}/leave`,
    group: 'Actions',
  },
  {
    id: 'open-reqs',
    label: 'Open requisitions',
    hint: 'Hiring pipeline',
    to: `${BASE_PATH}/hiring`,
    group: 'Actions',
  },
];
