<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Input, Modal, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, PLAN_OPTIONS } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatNumber } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'name', label: 'Tenant' },
  { key: 'plan', label: 'Plan' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'seatsUsed', label: 'Seats' },
  { key: 'actions', label: 'Actions' },
];

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Trial', value: 'trial' },
  { label: 'Inactive', value: 'inactive' },
];

const PLAN_FILTERS = [{ label: 'All plans', value: 'all' }, ...PLAN_OPTIONS];

const router = useRouter();
const route = useRoute();
const store = useWorkspace();
const query = ref('');
const status = ref('all');
const plan = ref('all');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const form = ref({ name: '', plan: 'Professional', status: 'active', members: 0, seatsLimit: 10 });

const rows = computed(() => {
  const filtered = store.state.tenants.filter((tenant) => {
    const statusOk = status.value === 'all' || tenant.status === status.value;
    const planOk = plan.value === 'all' || tenant.plan === plan.value;
    return statusOk && planOk;
  });
  return searchRecords(filtered, query.value, ['name', 'owner', 'plan', 'slug', 'region']);
});

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') openNew();
  },
  { immediate: true },
);

function openNew() {
  isEditing.value = false;
  editingId.value = null;
  form.value = { name: '', plan: 'Professional', status: 'active', members: 0, seatsLimit: 10 };
  showDialog.value = true;
}

function openEdit(tenant) {
  isEditing.value = true;
  editingId.value = tenant.id;
  form.value = {
    name: tenant.name,
    plan: tenant.plan,
    status: tenant.status,
    members: tenant.members,
    seatsLimit: tenant.seatsLimit,
  };
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
}

function saveTenant() {
  if (!form.value.name.trim()) {
    showToast({ title: 'Name required', variant: 'warning' });
    return;
  }
  if (isEditing.value) {
    store.updateTenant(editingId.value, form.value);
    showToast({ title: 'Tenant updated', variant: 'success' });
  } else {
    store.addTenant(form.value);
    showToast({ title: 'Tenant created', variant: 'success' });
  }
  closeDialog();
}

function removeTenant(event, tenant) {
  event.stopPropagation();
  store.deleteTenant(tenant.id);
  showToast({ title: 'Tenant deleted', description: tenant.name, variant: 'warning' });
}
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Tenants"
      description="Nine workspaces on the Harbor control plane. Click a row for seats, members, and flags."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Tenants' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="openNew">New tenant</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Workspaces" :value="store.tenants.length" icon="bi-building" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Active"
          :value="store.tenants.filter((item) => item.status === 'active').length"
          icon="bi-check-circle"
          tone="success"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="On trial"
          :value="store.tenants.filter((item) => item.status === 'trial').length"
          icon="bi-hourglass-split"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Inactive"
          :value="store.tenants.filter((item) => item.status === 'inactive').length"
          icon="bi-slash-circle"
          tone="danger"
        />
      </div>
    </div>

    <FilterBar
      :on-reset="() => { query = ''; status = 'all'; plan = 'all'; }"
    >
      <template #search>
        <Search v-model="query" placeholder="Search tenants or owners" />
      </template>
      <Select v-model="status" label="Status" :options="STATUS_OPTIONS" />
      <Select v-model="plan" label="Plan" :options="PLAN_FILTERS" />
    </FilterBar>

    <div class="hbr-panel">
      <div class="hbr-panel-body">
        <DataTable :columns="columns" :rows="rows" empty-title="No tenants" @row-click="(row) => router.push(`${BASE_PATH}/tenants/${row.id}`)">
          <template #name="{ row }">
            <div>
              <strong>{{ row.name }}</strong>
              <div class="hbr-subtle">{{ row.slug }} · {{ row.region }}</div>
            </div>
          </template>
          <template #status="{ value }">
            <StatusBadge :status="value" />
          </template>
          <template #owner="{ value }">{{ value }}</template>
          <template #seatsUsed="{ row }">
            {{ formatNumber(row.seatsUsed) }} / {{ formatNumber(row.seatsLimit) }}
          </template>
          <template #actions="{ row }">
            <div class="hbr-row-actions" @click.stop>
              <Button size="sm" variant="tertiary" icon="edit" icon-only accessible-label="Edit" @click="openEdit(row)" />
              <Button size="sm" variant="danger" icon="trash" icon-only accessible-label="Delete" @click="(event) => removeTenant(event, row)" />
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <Modal :open="showDialog" :heading="isEditing ? 'Edit tenant' : 'Create tenant'" @update:open="showDialog = $event">
      <div class="hbr-form-stack">
        <Input v-model="form.name" label="Workspace name" placeholder="Harbor Legal" required />
        <Select v-model="form.plan" label="Plan" :options="PLAN_OPTIONS" />
        <Select v-model="form.status" label="Status" :options="STATUS_OPTIONS.filter((item) => item.value !== 'all')" />
        <Input v-model="form.members" label="Members" type="number" />
      </div>
      <template #footer>
        <Button variant="secondary" @click="closeDialog">Cancel</Button>
        <Button @click="saveTenant">{{ isEditing ? 'Update' : 'Create' }}</Button>
      </template>
    </Modal>
  </div>
</template>
