import { reactive, computed } from 'vue';

// Sample data
const state = reactive({
  organizations: [
    { id: 1, name: 'Acme Corp', plan: 'Enterprise', status: 'active', members: 45, created: '2024-01-15' },
    { id: 2, name: 'TechStartup Inc', plan: 'Professional', status: 'active', members: 12, created: '2024-02-20' },
    { id: 3, name: 'Global Solutions', plan: 'Enterprise', status: 'active', members: 78, created: '2024-03-10' },
    { id: 4, name: 'Innovation Labs', plan: 'Starter', status: 'active', members: 5, created: '2024-04-05' },
  ],
  members: [
    { id: 1, name: 'John Doe', email: 'john@acme.com', role: 'Admin', org: 'Acme Corp', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@techstartup.com', role: 'Editor', org: 'TechStartup Inc', status: 'active', joined: '2024-02-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@global.com', role: 'Viewer', org: 'Global Solutions', status: 'active', joined: '2024-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@innovation.com', role: 'Admin', org: 'Innovation Labs', status: 'inactive', joined: '2024-04-05' },
  ],
  featureFlags: [
    { id: 1, name: 'dark-mode', description: 'Enable dark mode theme', status: 'stable', rolloutPercent: 100, created: '2024-01-20' },
    { id: 2, name: 'new-dashboard', description: 'Redesigned dashboard layout', status: 'rollout', rolloutPercent: 45, created: '2024-03-15' },
    { id: 3, name: 'advanced-analytics', description: 'Advanced analytics features', status: 'beta', rolloutPercent: 20, created: '2024-04-01' },
    { id: 4, name: 'api-v2', description: 'API Version 2', status: 'stable', rolloutPercent: 100, created: '2024-02-10' },
    { id: 5, name: 'experimental-ai', description: 'AI-powered features', status: 'development', rolloutPercent: 5, created: '2024-05-20' },
  ],
  settings: {
    apiEndpoint: 'https://api.example.com',
    webhookUrl: 'https://webhooks.example.com',
    emailNotifications: true,
    twoFactorAuth: true,
    apiRateLimit: 10000,
  },
});

// Getters
const getters = {
  organizations: computed(() => state.organizations),
  members: computed(() => state.members),
  featureFlags: computed(() => state.featureFlags),
  settings: computed(() => state.settings),
  organizationCount: computed(() => state.organizations.length),
  activeMembers: computed(() => state.members.filter(m => m.status === 'active').length),
  stableFlags: computed(() => state.featureFlags.filter(f => f.status === 'stable').length),
  rolloutFlags: computed(() => state.featureFlags.filter(f => f.status === 'rollout').length),
};

// Actions
const actions = {
  addOrganization(org) {
    const newOrg = {
      id: Math.max(...state.organizations.map(o => o.id), 0) + 1,
      ...org,
      created: new Date().toISOString().split('T')[0],
    };
    state.organizations.push(newOrg);
    return newOrg;
  },
  updateOrganization(id, updates) {
    const org = state.organizations.find(o => o.id === id);
    if (org) {
      Object.assign(org, updates);
    }
  },
  deleteOrganization(id) {
    const index = state.organizations.findIndex(o => o.id === id);
    if (index > -1) {
      state.organizations.splice(index, 1);
    }
  },
  addMember(member) {
    const newMember = {
      id: Math.max(...state.members.map(m => m.id), 0) + 1,
      ...member,
      joined: new Date().toISOString().split('T')[0],
    };
    state.members.push(newMember);
    return newMember;
  },
  updateMember(id, updates) {
    const member = state.members.find(m => m.id === id);
    if (member) {
      Object.assign(member, updates);
    }
  },
  deleteMember(id) {
    const index = state.members.findIndex(m => m.id === id);
    if (index > -1) {
      state.members.splice(index, 1);
    }
  },
  addFeatureFlag(flag) {
    const newFlag = {
      id: Math.max(...state.featureFlags.map(f => f.id), 0) + 1,
      ...flag,
      created: new Date().toISOString().split('T')[0],
    };
    state.featureFlags.push(newFlag);
    return newFlag;
  },
  updateFeatureFlag(id, updates) {
    const flag = state.featureFlags.find(f => f.id === id);
    if (flag) {
      Object.assign(flag, updates);
    }
  },
  deleteFeatureFlag(id) {
    const index = state.featureFlags.findIndex(f => f.id === id);
    if (index > -1) {
      state.featureFlags.splice(index, 1);
    }
  },
  updateSettings(updates) {
    Object.assign(state.settings, updates);
  },
};

export function useStore() {
  return { state, ...getters, ...actions };
}
