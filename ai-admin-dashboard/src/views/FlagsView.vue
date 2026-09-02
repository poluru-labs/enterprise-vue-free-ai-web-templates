<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Button, Input, Modal, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, FLAG_STATUS_OPTIONS } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatDate, formatPercent } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const STATUS_FILTERS = [{ label: 'All statuses', value: 'all' }, ...FLAG_STATUS_OPTIONS];

const route = useRoute();
const store = useWorkspace();
const query = ref('');
const status = ref('all');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const form = ref({ name: '', description: '', status: 'development', rolloutPercent: 0 });

const columns = [
  { key: 'name', label: 'Flag' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'rolloutPercent', label: 'Rollout' },
  { key: 'created', label: 'Created' },
  { key: 'actions', label: 'Actions' },
];

const rows = computed(() => {
  const filtered = store.state.featureFlags.filter((flag) => status.value === 'all' || flag.status === status.value);
  return searchRecords(filtered, query.value, ['name', 'description', 'owner']);
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
  form.value = { name: '', description: '', status: 'development', rolloutPercent: 0 };
  showDialog.value = true;
}

function openEdit(flag) {
  isEditing.value = true;
  editingId.value = flag.id;
  form.value = {
    name: flag.name,
    description: flag.description,
    status: flag.status,
    rolloutPercent: flag.rolloutPercent,
  };
  showDialog.value = true;
}

function saveFlag() {
  if (!form.value.name.trim() || !form.value.description.trim()) {
    showToast({ title: 'Name and description required', variant: 'warning' });
    return;
  }
  if (isEditing.value) {
    store.updateFeatureFlag(editingId.value, form.value);
    showToast({ title: 'Flag updated', variant: 'success' });
  } else {
    store.addFeatureFlag(form.value);
    showToast({ title: 'Flag created', variant: 'success' });
  }
  showDialog.value = false;
}

function removeFlag(flag) {
  store.deleteFeatureFlag(flag.id);
  showToast({ title: 'Flag deleted', description: flag.name, variant: 'warning' });
}
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Feature flags"
      description="Three rollouts are live. Lakshmi owns dark-mode and api-v2."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Flags' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="openNew">New flag</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Flags" :value="store.featureFlags.length" icon="bi-flag" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Stable" :value="store.stableFlags" icon="bi-check-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="In rollout" :value="store.rolloutFlags.length" icon="bi-lightning" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Development"
          :value="store.featureFlags.filter((item) => item.status === 'development').length"
          icon="bi-code-slash"
          tone="info"
        />
      </div>
    </div>

    <FilterBar :on-reset="() => { query = ''; status = 'all'; }">
      <template #search>
        <Search v-model="query" placeholder="Search flags" />
      </template>
      <Select v-model="status" label="Status" :options="STATUS_FILTERS" />
    </FilterBar>

    <div class="hbr-panel">
      <div class="hbr-panel-body">
        <DataTable :columns="columns" :rows="rows" empty-title="No flags">
          <template #name="{ row }">
            <div>
              <strong>{{ row.name }}</strong>
              <div class="hbr-subtle">{{ row.owner }}</div>
            </div>
          </template>
          <template #status="{ value }">
            <StatusBadge :status="value" />
          </template>
          <template #rolloutPercent="{ value }">
            <div class="hbr-rollout-cell">
              <div class="hbr-hbar-track">
                <div class="hbr-hbar-fill" :style="{ width: `${value}%` }" />
              </div>
              <span>{{ formatPercent(value, 0) }}</span>
            </div>
          </template>
          <template #created="{ value }">{{ formatDate(value) }}</template>
          <template #actions="{ row }">
            <div class="hbr-row-actions">
              <Button size="sm" variant="tertiary" icon="edit" icon-only accessible-label="Edit" @click="openEdit(row)" />
              <Button size="sm" variant="danger" icon="trash" icon-only accessible-label="Delete" @click="removeFlag(row)" />
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <Modal :open="showDialog" :heading="isEditing ? 'Edit flag' : 'Create flag'" @update:open="showDialog = $event">
      <div class="hbr-form-stack">
        <Input v-model="form.name" label="Flag name" placeholder="dark-mode" />
        <Input v-model="form.description" label="Description" placeholder="What does this flag enable?" />
        <Select v-model="form.status" label="Status" :options="FLAG_STATUS_OPTIONS" />
        <div>
          <label class="hbr-subtle">Rollout {{ form.rolloutPercent }}%</label>
          <input v-model.number="form.rolloutPercent" type="range" min="0" max="100" class="w-100" />
        </div>
      </div>
      <template #footer>
        <Button variant="secondary" @click="showDialog = false">Cancel</Button>
        <Button @click="saveFlag">{{ isEditing ? 'Update' : 'Create' }}</Button>
      </template>
    </Modal>
  </div>
</template>
