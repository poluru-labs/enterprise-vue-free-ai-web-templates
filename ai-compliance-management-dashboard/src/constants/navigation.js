export const APP_NAME = 'Aegis';
export const APP_TAGLINE = 'Compliance desk';
export const BASE_PATH = '/compliance';
export const SIGNED_IN_USER = {
  name: 'Kavya Poluru',
  role: 'Compliance lead',
  email: 'kavya.poluru@polurulabs.example',
};

export const NAV_GROUPS = [
  {
    label: 'Program',
    items: [
      { to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'bi-grid-1x2' },
      { to: `${BASE_PATH}/controls`, label: 'Controls', icon: 'bi-shield-check' },
      { to: `${BASE_PATH}/audits`, label: 'Audits', icon: 'bi-clipboard-check' },
    ],
  },
  {
    label: 'Library',
    items: [
      { to: `${BASE_PATH}/policies`, label: 'Policies', icon: 'bi-journal-text' },
      { to: `${BASE_PATH}/risks`, label: 'Risks', icon: 'bi-exclamation-triangle' },
      { to: `${BASE_PATH}/requirements`, label: 'Requirements', icon: 'bi-diagram-3' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { to: `${BASE_PATH}/search`, label: 'Search', icon: 'bi-search' },
      { to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'bi-gear' },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const BREADCRUMB_ROOT = {
  label: 'Aegis',
  to: `${BASE_PATH}/overview`,
};

export const DOMAIN_OPTIONS = [
  { value: 'Access', label: 'Access' },
  { value: 'Data', label: 'Data' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Privacy', label: 'Privacy' },
  { value: 'Vendor', label: 'Vendor' },
];

export const FRAMEWORK_OPTIONS = [
  { value: 'SOC 2', label: 'SOC 2' },
  { value: 'ISO 27001', label: 'ISO 27001' },
  { value: 'GDPR', label: 'GDPR' },
  { value: 'HIPAA', label: 'HIPAA' },
  { value: 'PCI DSS', label: 'PCI DSS' },
];

export const CONTROL_STATUS_OPTIONS = [
  { value: 'effective', label: 'Effective' },
  { value: 'in_review', label: 'In review' },
  { value: 'gap', label: 'Gap' },
  { value: 'draft', label: 'Draft' },
];

export const AUDIT_STATUS_OPTIONS = [
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'fieldwork', label: 'Fieldwork' },
  { value: 'reporting', label: 'Reporting' },
  { value: 'closed', label: 'Closed' },
];

export const POLICY_STATUS_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'review', label: 'Review' },
  { value: 'draft', label: 'Draft' },
];

export const RISK_STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'mitigating', label: 'Mitigating' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'closed', label: 'Closed' },
];

export const OWNER_OPTIONS = [
  { value: 'Kavya Poluru', label: 'Kavya Poluru' },
  { value: 'Lakshmi Poluru', label: 'Lakshmi Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Meera Poluru', label: 'Meera Poluru' },
  { value: 'Madhav Poluru', label: 'Madhav Poluru' },
  { value: 'Harini Poluru', label: 'Harini Poluru' },
  { value: 'Ananya Poluru', label: 'Ananya Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
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
    id: 'new-control',
    label: 'Add control',
    hint: 'Open the control form',
    to: `${BASE_PATH}/controls?new=1`,
    group: 'Actions',
  },
  {
    id: 'open-audits',
    label: 'Review audits',
    hint: 'Fieldwork and due dates',
    to: `${BASE_PATH}/audits`,
    group: 'Actions',
  },
  {
    id: 'open-risks',
    label: 'Open risks',
    hint: 'Residual score register',
    to: `${BASE_PATH}/risks`,
    group: 'Actions',
  },
];
