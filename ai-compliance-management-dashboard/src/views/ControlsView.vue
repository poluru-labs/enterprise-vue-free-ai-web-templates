<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import {
  BASE_PATH,
  BREADCRUMB_ROOT,
  CONTROL_STATUS_OPTIONS,
  DOMAIN_OPTIONS,
  FRAMEWORK_OPTIONS,
} from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate, formatPercent } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const ALL = [{ value: 'all', label: 'All' }];
const router = useRouter();
const store = useCompliance();
const query = ref('');
const domain = ref('all');
const framework = ref('all');
const status = ref('all');

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'title', label: 'Control' },
  { key: 'domain', label: 'Domain' },
  { key: 'framework', label: 'Framework' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'effectiveness', label: 'Score' },
  { key: 'nextReview', label: 'Next review' },
];

const rows = computed(() => {
  let list = store.state.controls;
  if (domain.value !== 'all') list = list.filter((item) => item.domain === domain.value);
  if (framework.value !== 'all') list = list.filter((item) => item.framework === framework.value);
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  return searchRecords(list, query.value, ['code', 'title', 'owner', 'domain', 'framework']);
});

function reset() {
  query.value = '';
  domain.value = 'all';
  framework.value = 'all';
  status.value = 'all';
}
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Controls"
      description="Library of access, data, operations, privacy, and vendor controls."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Controls' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="store.setControlOpen(true)">Add control</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Library" :value="store.controls.length" icon="bi-shield-check" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Effective" :value="store.effectiveControls.length" icon="bi-check2-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Gaps" :value="store.gapControls.length" icon="bi-exclamation-octagon" tone="danger" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="info" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search code, owner, or title" />
      </template>
      <Select v-model="domain" label="Domain" :options="[...ALL, ...DOMAIN_OPTIONS]" />
      <Select v-model="framework" label="Framework" :options="[...ALL, ...FRAMEWORK_OPTIONS]" />
      <Select v-model="status" label="Status" :options="[...ALL, ...CONTROL_STATUS_OPTIONS]" />
    </FilterBar>

    <section class="aeg-panel">
      <div class="aeg-panel-body">
        <DataTable :columns="columns" :rows="rows" @row-click="(row) => router.push(`${BASE_PATH}/controls/${row.id}`)">
          <template #status="{ value }">
            <StatusBadge :status="value" />
          </template>
          <template #effectiveness="{ value }">
            {{ formatPercent(value, 0) }}
          </template>
          <template #nextReview="{ value }">
            {{ formatDate(value) }}
          </template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
