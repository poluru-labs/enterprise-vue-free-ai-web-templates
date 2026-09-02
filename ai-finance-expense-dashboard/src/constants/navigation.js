export const APP_NAME = 'Mint';
export const APP_TAGLINE = 'Spend control';
export const BASE_PATH = '/finance';
export const SIGNED_IN_USER = {
  name: 'Hana Poluru',
  role: 'Finance lead',
  email: 'hana.poluru@polurulabs.example',
  initials: 'HP',
};

export const NAV_GROUPS = [
  {
    label: 'Control',
    items: [
      {
        to: `${BASE_PATH}/overview`,
        label: 'Overview',
        icon: 'bi-speedometer2',
        description: 'Close, spend, and AP health',
      },
      {
        to: `${BASE_PATH}/expenses`,
        label: 'Expenses',
        icon: 'bi-receipt',
        description: 'Cards, reimbursements, approvals',
      },
      {
        to: `${BASE_PATH}/invoices`,
        label: 'Invoices',
        icon: 'bi-file-earmark-text',
        description: 'Vendor bills and payments',
      },
      {
        to: `${BASE_PATH}/budgets`,
        label: 'Budgets',
        icon: 'bi-pie-chart',
        description: 'Category burn vs plan',
      },
    ],
  },
  {
    label: 'Insight',
    items: [
      {
        to: `${BASE_PATH}/analytics`,
        label: 'Analytics',
        icon: 'bi-graph-up',
        description: 'Trends and category mix',
      },
      {
        to: `${BASE_PATH}/vendors`,
        label: 'Vendors',
        icon: 'bi-building',
        description: 'Directory and spend share',
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
        description: 'Expenses, invoices, vendors',
      },
      {
        to: `${BASE_PATH}/settings`,
        label: 'Settings',
        icon: 'bi-gear',
        description: 'Close calendar and alerts',
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const COMMAND_ITEMS = [
  ...NAV_ITEMS.map((item) => ({
    id: item.to,
    label: item.label,
    hint: item.description,
    to: item.to,
    group: 'Go to',
  })),
  {
    id: 'submit-expense',
    label: 'Submit expense',
    hint: 'Open the expense composer',
    to: `${BASE_PATH}/expenses?compose=1`,
    group: 'Actions',
  },
  {
    id: 'pay-invoices',
    label: 'Review unpaid invoices',
    hint: 'Mark vendor bills paid',
    to: `${BASE_PATH}/invoices?status=Pending`,
    group: 'Actions',
  },
  {
    id: 'august-close',
    label: 'August close checklist',
    hint: '64% of close tasks complete',
    to: `${BASE_PATH}/overview`,
    group: 'Close',
  },
];

export const EXPENSE_CATEGORIES = [
  'Software',
  'Travel',
  'Marketing',
  'Supplies',
  'Equipment',
  'Training',
  'Facilities',
  'Meals',
  'Professional services',
];

export const EXPENSE_STATUSES = ['Pending', 'Approved', 'Rejected'];
export const INVOICE_STATUSES = ['Paid', 'Pending', 'Overdue'];
