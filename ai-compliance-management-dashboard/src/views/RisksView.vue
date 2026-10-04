<script setup>
import { computed, ref } from 'vue';
import { CircularProgress, Meter, Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, DOMAIN_OPTIONS, RISK_STATUS_OPTIONS } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { riskBand } from '../utils/status.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const ALL = [{ value: 'all', label: 'All' }];
const store = useCompliance();
const query = ref('');
const domain = ref('all');
const status = ref('all');

const columns = [
  { key: 'title', label: 'Risk' },
  { key: 'domain', label: 'Domain' },
  { key: 'owner', label: 'Owner' },
  { key: 'inherent', label: 'Inherent' },
  { key: 'residual', label: 'Residual' },
  { key: 'band', label: 'Band' },
  { key: 'status', label: 'Status' },
];

const rows = computed(() => {
  let list = store.state.risks.map((item) => ({ ...item, band: riskBand(item.residual) }));
  if (domain.value !== 'all') list = list.filter((item) => item.domain === domain.value);
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  return searchRecords(list, query.value, ['title', 'owner', 'domain', 'notes']);
});

const highCount = computed(() => rows.value.filter((item) => item.band === 'high' || item.band === 'critical').length);

function reset() {
  query.value = '';
  domain.value = 'all';
  status.value = 'all';
}
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Risks"
      description="Inherent vs residual scores. Owners all end in Poluru."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Risks' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Register" :value="store.risks.length" icon="bi-exclamation-triangle" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Open" :value="store.openRisks.length" icon="bi-lightning" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="High / critical" :value="highCount" icon="bi-exclamation-octagon" tone="danger" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="info" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search risk or owner" />
      </template>
      <Select v-model="domain" label="Domain" :options="[...ALL, ...DOMAIN_OPTIONS]" />
      <Select v-model="status" label="Status" :options="[...ALL, ...RISK_STATUS_OPTIONS]" />
    </FilterBar>

    <div class="row g-3">
      <div class="col-12 col-xl-8">
        <section class="aeg-panel">
          <div class="aeg-panel-body">
            <DataTable :columns="columns" :rows="rows">
              <template #status="{ value }">
                <StatusBadge :status="value" />
              </template>
              <template #band="{ value }">
                <StatusBadge :status="value" />
              </template>
            </DataTable>
          </div>
        </section>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Residual heat" subtitle="Share of the open register">
          <div class="aeg-stack">
            <CircularProgress :value="Math.round((store.openRisks.length / store.risks.length) * 100)" show-value label="Open" />
            <Meter :value="highCount" :max="store.risks.length" label="High or critical" />
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
