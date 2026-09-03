import { computed, proxyRefs, reactive } from 'vue';
import tenantsSeed from '../data/tenants.json';
import membersSeed from '../data/members.json';
import flagsSeed from '../data/flags.json';
import auditSeed from '../data/audit.json';
import settingsSeed from '../data/settings.json';
import { BASE_PATH, SIGNED_IN_USER } from '../constants/navigation.js';
import { slugify, todayIso } from '../utils/format.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = reactive({
  tenants: clone(tenantsSeed),
  members: clone(membersSeed),
  featureFlags: clone(flagsSeed),
  audit: clone(auditSeed),
  settings: clone(settingsSeed.workspace),
  selectedTenantId: tenantsSeed[0]?.id || '',
  inviteOpen: false,
});

function nextNumeric(list) {
  const numbers = list
    .map((item) => Number(String(item.id).replace(/\D/g, '')))
    .filter((n) => Number.isFinite(n));
  return (numbers.length ? Math.max(...numbers) : 0) + 1;
}

function uniqueTenantId(name) {
  const base = slugify(name) || `tenant-${Date.now()}`;
  if (!state.tenants.some((item) => item.id === base)) return base;
  return `${base}-${nextNumeric(state.tenants)}`;
}

function logAudit({ action, target, href, tone = 'info' }) {
  state.audit.unshift({
    id: `aud-${Date.now()}`,
    actor: SIGNED_IN_USER.name,
    action,
    target,
    href,
    ip: '10.18.4.12',
    time: new Date().toISOString(),
    tone,
  });
}

const getters = {
  tenants: computed(() => state.tenants),
  members: computed(() => state.members),
  featureFlags: computed(() => state.featureFlags),
  audit: computed(() => state.audit),
  settings: computed(() => state.settings),
  selectedTenantId: computed(() => state.selectedTenantId),
  inviteOpen: computed(() => state.inviteOpen),
  selectedTenant: computed(
    () => state.tenants.find((item) => item.id === state.selectedTenantId) || state.tenants[0] || null,
  ),
  organizationCount: computed(() => state.tenants.length),
  activeMembers: computed(() => state.members.filter((item) => item.status === 'active').length),
  stableFlags: computed(() => state.featureFlags.filter((item) => item.status === 'stable').length),
  rolloutFlags: computed(() => state.featureFlags.filter((item) => item.status === 'rollout')),
  seatsUsed: computed(() => state.tenants.reduce((sum, item) => sum + Number(item.seatsUsed || 0), 0)),
  seatsLimit: computed(() => state.tenants.reduce((sum, item) => sum + Number(item.seatsLimit || 0), 0)),
};

const actions = {
  setSelectedTenant(id) {
    state.selectedTenantId = id;
  },
  setInviteOpen(open) {
    state.inviteOpen = Boolean(open);
  },
  getTenant(id) {
    return state.tenants.find((item) => item.id === id) || null;
  },
  membersForTenant(id) {
    return state.members.filter((item) => item.orgId === id);
  },
  addTenant(org) {
    const name = org.name?.trim();
    if (!name) return null;
    const id = uniqueTenantId(name);
    const tenant = {
      id,
      slug: id,
      name,
      plan: org.plan || 'Professional',
      status: org.status || 'active',
      owner: org.owner || SIGNED_IN_USER.name,
      email: org.email || '',
      region: org.region || 'us-east-1',
      members: Number(org.members) || 0,
      seatsUsed: Number(org.seatsUsed) || Number(org.members) || 0,
      seatsLimit: Number(org.seatsLimit) || 10,
      health: Number(org.health) || 80,
      created: todayIso(),
      note: org.note || 'Created from Harbor.',
    };
    state.tenants.unshift(tenant);
    state.selectedTenantId = id;
    logAudit({
      action: 'Created tenant',
      target: tenant.name,
      href: `${BASE_PATH}/tenants/${id}`,
      tone: 'success',
    });
    return tenant;
  },
  updateTenant(id, updates) {
    const tenant = state.tenants.find((item) => item.id === id);
    if (!tenant) return;
    Object.assign(tenant, updates);
    logAudit({
      action: 'Updated tenant',
      target: tenant.name,
      href: `${BASE_PATH}/tenants/${id}`,
      tone: 'info',
    });
  },
  deleteTenant(id) {
    const index = state.tenants.findIndex((item) => item.id === id);
    if (index < 0) return;
    const [removed] = state.tenants.splice(index, 1);
    if (state.selectedTenantId === id) {
      state.selectedTenantId = state.tenants[0]?.id || '';
    }
    logAudit({
      action: 'Deleted tenant',
      target: removed.name,
      href: `${BASE_PATH}/tenants`,
      tone: 'danger',
    });
  },
  addMember(member) {
    const name = member.name?.trim();
    const email = member.email?.trim();
    if (!name || !email) return null;
    const tenant = state.tenants.find((item) => item.id === member.orgId || item.name === member.org);
    const record = {
      id: `m-${Date.now()}`,
      name,
      email,
      role: member.role || 'Viewer',
      org: tenant?.name || member.org || '',
      orgId: tenant?.id || member.orgId || '',
      status: member.status || 'invited',
      joined: todayIso(),
    };
    state.members.unshift(record);
    if (tenant) {
      tenant.members = Number(tenant.members || 0) + 1;
      tenant.seatsUsed = Number(tenant.seatsUsed || 0) + 1;
    }
    logAudit({
      action: 'Invited member',
      target: `${record.name} · ${record.org}`,
      href: `${BASE_PATH}/members`,
      tone: 'success',
    });
    return record;
  },
  updateMember(id, updates) {
    const member = state.members.find((item) => item.id === id);
    if (!member) return;
    if (updates.orgId && updates.orgId !== member.orgId) {
      const tenant = state.tenants.find((item) => item.id === updates.orgId);
      if (tenant) {
        updates.org = tenant.name;
      }
    }
    Object.assign(member, updates);
    logAudit({
      action: 'Updated member',
      target: member.name,
      href: `${BASE_PATH}/members`,
      tone: 'info',
    });
  },
  deleteMember(id) {
    const index = state.members.findIndex((item) => item.id === id);
    if (index < 0) return;
    const [removed] = state.members.splice(index, 1);
    const tenant = state.tenants.find((item) => item.id === removed.orgId);
    if (tenant) {
      tenant.members = Math.max(0, Number(tenant.members || 0) - 1);
      tenant.seatsUsed = Math.max(0, Number(tenant.seatsUsed || 0) - 1);
    }
    logAudit({
      action: 'Removed member',
      target: removed.name,
      href: `${BASE_PATH}/members`,
      tone: 'warning',
    });
  },
  addFeatureFlag(flag) {
    const name = flag.name?.trim();
    if (!name) return null;
    const record = {
      id: `f-${slugify(name) || Date.now()}`,
      name,
      description: flag.description || '',
      status: flag.status || 'development',
      rolloutPercent: Number(flag.rolloutPercent) || 0,
      owner: flag.owner || SIGNED_IN_USER.name,
      created: todayIso(),
    };
    state.featureFlags.unshift(record);
    logAudit({
      action: 'Created flag',
      target: record.name,
      href: `${BASE_PATH}/flags`,
      tone: 'success',
    });
    return record;
  },
  updateFeatureFlag(id, updates) {
    const flag = state.featureFlags.find((item) => item.id === id);
    if (!flag) return;
    Object.assign(flag, updates);
    logAudit({
      action: 'Updated flag',
      target: flag.name,
      href: `${BASE_PATH}/flags`,
      tone: 'info',
    });
  },
  deleteFeatureFlag(id) {
    const index = state.featureFlags.findIndex((item) => item.id === id);
    if (index < 0) return;
    const [removed] = state.featureFlags.splice(index, 1);
    logAudit({
      action: 'Deleted flag',
      target: removed.name,
      href: `${BASE_PATH}/flags`,
      tone: 'danger',
    });
  },
  updateSettings(updates) {
    Object.assign(state.settings, updates);
    logAudit({
      action: 'Updated workspace',
      target: state.settings.name,
      href: `${BASE_PATH}/settings`,
      tone: 'info',
    });
  },
};

export function useWorkspace() {
  return proxyRefs({ state, ...getters, ...actions });
}

export function useStore() {
  return useWorkspace();
}
