<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Meter, ProgressBar, Switch, Tabs, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatDate, formatNumber } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useWorkspace();
const tab = ref('members');
const tabItems = [
  { id: 'members', label: 'Members' },
  { id: 'flags', label: 'Flags' },
  { id: 'usage', label: 'Usage' },
];

const tenant = computed(() => store.getTenant(route.params.id));
const members = computed(() => (tenant.value ? store.membersForTenant(tenant.value.id) : []));
const flags = computed(() => store.featureFlags);

function goTenants() {
  router.replace(`${BASE_PATH}/tenants`);
}

if (!tenant.value) {
  goTenants();
}
</script>

<template>
  <div v-if="tenant" class="hbr-page">
    <PageHeader
      :title="tenant.name"
      :description="`${tenant.owner} · ${tenant.plan} · ${tenant.region}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Tenants', to: `${BASE_PATH}/tenants` }, { label: tenant.name }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          @click="showToast({ title: tenant.status === 'inactive' ? 'Already offline' : 'Suspend queued', variant: 'warning' })"
        >
          Suspend
        </Button>
        <Button size="sm" icon="user" @click="store.setInviteOpen(true)">Invite</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Plan" :value="tenant.plan" :hint="`Created ${formatDate(tenant.created)}`" icon="bi-layers" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Seats"
          :value="`${formatNumber(tenant.seatsUsed)} / ${formatNumber(tenant.seatsLimit)}`"
          :hint="`${Math.round((tenant.seatsUsed / tenant.seatsLimit) * 100)}% used`"
          icon="bi-people"
          tone="info"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Members" :value="members.length" icon="bi-person-badge" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Health" :value="tenant.health" icon="bi-heart-pulse" tone="warning" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Workspace" :subtitle="tenant.note">
          <StatusBadge :status="tenant.status" />
          <dl class="hbr-settings-list mt-3">
            <div>
              <dt>Owner</dt>
              <dd>{{ tenant.owner }}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{{ tenant.email }}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{{ formatDate(tenant.created) }}</dd>
            </div>
            <div>
              <dt>Slug</dt>
              <dd class="hbr-mono">{{ tenant.slug }}</dd>
            </div>
          </dl>
          <Meter class="mt-3" label="Seat utilization" :value="tenant.seatsUsed" :max="tenant.seatsLimit" show-value />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <ChartSection title="Tenant workspace" subtitle="People, flags, and seat use">
          <Tabs v-model="tab" :items="tabItems">
            <template #default="{ active }">
              <div v-if="active === 'members'" class="hbr-form-stack">
                <DataTable
                  :columns="[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }]"
                  :rows="members"
                  empty-title="No members"
                  empty-description="Invite someone into this workspace."
                >
                  <template #name="{ value }"><strong>{{ value }}</strong></template>
                  <template #role="{ value }">{{ value }}</template>
                  <template #status="{ value }"><StatusBadge :status="value" /></template>
                </DataTable>
                <Button variant="secondary" size="sm" icon="user" @click="store.setInviteOpen(true)">
                  Invite member
                </Button>
              </div>
              <div v-else-if="active === 'flags'" class="hbr-form-stack">
                <div v-for="flag in flags" :key="flag.id" class="hbr-member">
                  <div>
                    <strong>{{ flag.name }}</strong>
                    <div class="hbr-subtle">{{ flag.status }} · {{ flag.rolloutPercent }}%</div>
                  </div>
                  <Switch
                    :model-value="flag.status === 'stable' || flag.status === 'rollout'"
                    :label="flag.status === 'stable' || flag.status === 'rollout' ? 'On' : 'Off'"
                    @update:model-value="showToast({ title: 'Toggle flags from Flags', variant: 'info' })"
                  />
                </div>
              </div>
              <div v-else class="hbr-form-stack">
                <div>
                  <div class="hbr-hbar-meta">
                    <span>Seats</span>
                    <strong>{{ formatNumber(tenant.seatsUsed) }} / {{ formatNumber(tenant.seatsLimit) }}</strong>
                  </div>
                  <ProgressBar :value="tenant.seatsUsed" :max="tenant.seatsLimit" />
                </div>
                <div>
                  <div class="hbr-hbar-meta">
                    <span>Health</span>
                    <strong>{{ tenant.health }}</strong>
                  </div>
                  <ProgressBar :value="tenant.health" :max="100" />
                </div>
              </div>
            </template>
          </Tabs>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
