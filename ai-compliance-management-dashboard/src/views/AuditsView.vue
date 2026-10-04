<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Button,
  DateRangePicker,
  FileUpload,
  ProgressBar,
  Search,
  SegmentedControl,
  Select,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue';
import { AUDIT_STATUS_OPTIONS, BASE_PATH, BREADCRUMB_ROOT, FRAMEWORK_OPTIONS } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const ALL = [{ value: 'all', label: 'All' }];
const router = useRouter();
const store = useCompliance();
const query = ref('');
const status = ref('all');
const framework = ref('all');
const view = ref('all');
const rangeStart = ref('2026-08-01');
const rangeEnd = ref('2026-11-30');

const columns = [
  { key: 'name', label: 'Audit' },
  { key: 'type', label: 'Type' },
  { key: 'framework', label: 'Framework' },
  { key: 'lead', label: 'Lead' },
  { key: 'status', label: 'Status' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'end', label: 'Close' },
];

const rows = computed(() => {
  let list = store.state.audits;
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  if (framework.value !== 'all') list = list.filter((item) => item.framework === framework.value);
  if (view.value === 'live') list = list.filter((item) => item.status !== 'closed');
  return searchRecords(list, query.value, ['name', 'lead', 'firm', 'framework']);
});

const timeline = computed(() =>
  store.dueAudits.map((item) => ({
    title: item.name,
    description: `${item.lead} · ${item.firm}`,
    time: formatDate(item.end),
  })),
);

function reset() {
  query.value = '';
  status.value = 'all';
  framework.value = 'all';
  view.value = 'all';
}
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Audits"
      description="Internal walkthroughs, vendor reviews, and external fieldwork."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Audits' }]"
    >
      <template #actions>
        <Button variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/overview`)">Program</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Audits" :value="store.audits.length" icon="bi-clipboard-check" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Live" :value="store.liveAudits.length" icon="bi-hourglass-split" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Findings" :value="store.audits.reduce((sum, item) => sum + item.findings, 0)" icon="bi-flag" tone="danger" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="info" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search audit, lead, or firm" />
      </template>
      <Select v-model="status" label="Status" :options="[...ALL, ...AUDIT_STATUS_OPTIONS]" />
      <Select v-model="framework" label="Framework" :options="[...ALL, ...FRAMEWORK_OPTIONS]" />
      <DateRangePicker v-model:start="rangeStart" v-model:end="rangeEnd" label="Window" />
      <SegmentedControl
        v-model="view"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'live', label: 'Live' },
        ]"
      />
    </FilterBar>

    <div class="row g-3">
      <div class="col-12 col-xl-8">
        <section class="aeg-panel">
          <div class="aeg-panel-body">
            <DataTable :columns="columns" :rows="rows" @row-click="(row) => router.push(`${BASE_PATH}/audits/${row.id}`)">
              <template #status="{ value }">
                <StatusBadge :status="value" />
              </template>
              <template #coverage="{ value }">
                <ProgressBar :value="value" show-value />
              </template>
              <template #end="{ value }">
                {{ formatDate(value) }}
              </template>
            </DataTable>
          </div>
        </section>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Close dates" subtitle="Ordered by next close">
          <Timeline :items="timeline" />
        </ChartSection>
        <div class="mt-3">
          <ChartSection title="Evidence drop" subtitle="Attach a pack for Kavya Poluru">
            <FileUpload label="Upload evidence" hint="PDF, CSV, or zip" />
          </ChartSection>
        </div>
      </div>
    </div>
  </div>
</template>
