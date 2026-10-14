export const APP_NAME = 'Tide';
export const APP_TAGLINE = 'DevOps control';
export const BASE_PATH = '/devops';

export const SIGNED_IN_USER = {
  name: 'Meera Poluru',
  role: 'Release lead',
  email: 'meera.poluru@polurulabs.example',
};

export const NAV_ITEMS = [
  { id: 'overview', to: `${BASE_PATH}/overview`, label: 'Overview', icon: 'home' },
  { id: 'pipelines', to: `${BASE_PATH}/pipelines`, label: 'Pipelines', icon: 'refresh' },
  { id: 'environments', to: `${BASE_PATH}/environments`, label: 'Environments', icon: 'folder' },
  { id: 'deployments', to: `${BASE_PATH}/deployments`, label: 'Deployments', icon: 'upload' },
  { id: 'uptime', to: `${BASE_PATH}/uptime`, label: 'Uptime', icon: 'check-circle' },
  { id: 'infrastructure', to: `${BASE_PATH}/infrastructure`, label: 'Infrastructure', icon: 'alert-triangle' },
  { id: 'search', to: `${BASE_PATH}/search`, label: 'Search', icon: 'search' },
  { id: 'settings', to: `${BASE_PATH}/settings`, label: 'Settings', icon: 'settings' },
];

export const BREADCRUMB_ROOT = {
  label: 'Tide',
  to: `${BASE_PATH}/overview`,
};

export const ENV_OPTIONS = [
  { value: 'Production', label: 'Production' },
  { value: 'Staging', label: 'Staging' },
  { value: 'Preview', label: 'Preview' },
  { value: 'EU production', label: 'EU production' },
  { value: 'Sandbox', label: 'Sandbox' },
];

export const REGION_OPTIONS = [
  { value: 'us-east', label: 'us-east' },
  { value: 'us-west', label: 'us-west' },
  { value: 'eu-central', label: 'eu-central' },
];

export const BRANCH_OPTIONS = [
  { value: 'main', label: 'main' },
  { value: 'release', label: 'release' },
  { value: 'hotfix', label: 'hotfix' },
];

export const OWNER_OPTIONS = [
  { value: 'Meera Poluru', label: 'Meera Poluru' },
  { value: 'Arjun Poluru', label: 'Arjun Poluru' },
  { value: 'Kavya Poluru', label: 'Kavya Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
  { value: 'Ananya Poluru', label: 'Ananya Poluru' },
  { value: 'Lakshmi Poluru', label: 'Lakshmi Poluru' },
  { value: 'Madhav Poluru', label: 'Madhav Poluru' },
  { value: 'Harini Poluru', label: 'Harini Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Sana Poluru', label: 'Sana Poluru' },
  { value: 'Nikhil Poluru', label: 'Nikhil Poluru' },
];

export const RELEASE_STEPS = [
  { id: 'queued', label: 'Queued', description: 'Waiting for a runner' },
  { id: 'building', label: 'Building', description: 'Image and tests' },
  { id: 'staged', label: 'Staged', description: 'Ready for the window' },
  { id: 'shipped', label: 'Shipped', description: 'Live in the environment' },
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
    id: 'new-pipeline',
    label: 'Start pipeline',
    hint: 'Register a service pipeline',
    to: `${BASE_PATH}/pipelines?new=1`,
    group: 'Actions',
  },
];
