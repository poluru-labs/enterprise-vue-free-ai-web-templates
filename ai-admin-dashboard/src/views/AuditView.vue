<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatDateTime } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';

const TONE_OPTIONS = [
  { label: 'All events', value: 'all' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' },
];

const columns = [
  { key: 'time', label: 'When' },
  { key: 'actor', label: 'Actor' },
  { key: 'action', label: 'Action' },
  { key: 'target', label: 'Target' },
  { key: 'ip', label: 'IP' },
];

const router = useRouter();
const store = useWorkspace();
const query = ref('');
const tone = ref('all');

const rows = computed(() => {
  const filtered = store.state.audit.filter((item) => tone.value === 'all' || item.tone === tone.value);
  return searchRecords(filtered, query.value, ['actor', 'action', 'target', 'id']);
});
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Audit log"
      description="Security events from 24–28 Aug 2026. Restores, invites, and flag changes."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Audit' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Events" :value="store.audit.length" icon="bi-shield-lock" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Suspends"
          :value="store.audit.filter((item) => String(item.action).includes('Suspended') || String(item.action).includes('Deleted')).length"
          icon="bi-slash-circle"
          tone="danger"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Restores"
          :value="store.audit.filter((item) => String(item.action).includes('Restored') || String(item.action).includes('Invited')).length"
          icon="bi-arrow-counterclockwise"
          tone="success"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Actors" value="7" hint="Poluru family" icon="bi-people" tone="info" />
      </div>
    </div>

    <FilterBar :on-reset="() => { query = ''; tone = 'all'; }">
      <template #search>
        <Search v-model="query" placeholder="Search actors or targets" />
      </template>
      <Select v-model="tone" label="Tone" :options="TONE_OPTIONS" />
    </FilterBar>

    <div class="hbr-panel">
      <div class="hbr-panel-body">
        <DataTable
          :columns="columns"
          :rows="rows"
          empty-title="No events"
          @row-click="(row) => row.href && router.push(row.href)"
        >
          <template #time="{ value }">{{ formatDateTime(value) }}</template>
          <template #ip="{ value }"><span class="hbr-mono">{{ value }}</span></template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
