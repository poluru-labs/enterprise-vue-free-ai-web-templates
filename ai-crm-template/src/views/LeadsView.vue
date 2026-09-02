<script setup>
import { computed, ref } from 'vue';
import { Button, Search, Tabs } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { crm, leadColumns, openLeadDrawer } from '../stores/crm.js';
import { exportToCsv } from '../utils/csv.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import StatCard from '../components/widgets/StatCard.vue';

const tab = ref('all');
const query = ref('');

const filtered = computed(() => {
  return searchRecords(crm.leads, query.value, ['name', 'company', 'owner']).filter((lead) => {
    return tab.value === 'all' || lead.status.toLowerCase() === tab.value;
  });
});

function downloadCsv() {
  exportToCsv('leads.csv', leadColumns, filtered.value);
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Leads"
      description="Hana, Aisha, and Ira Poluru are ready to convert. Scores come from partner, webinar, and outbound motion."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Leads' }]"
    >
      <template #actions>
        <Button variant="secondary" icon="download" :disabled="!filtered.length" @click="downloadCsv">Export CSV</Button>
        <Button icon="user" @click="openLeadDrawer()">Convert lead</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-12 col-sm-4">
        <StatCard label="Ready" :value="String(crm.leads.filter((item) => item.status === 'Ready').length)" hint="Convert this week" tone="success" />
      </div>
      <div class="col-12 col-sm-4">
        <StatCard label="Working" :value="String(crm.leads.filter((item) => item.status === 'Working').length)" hint="In sequence" tone="warning" />
      </div>
      <div class="col-12 col-sm-4">
        <StatCard label="New" :value="String(crm.leads.filter((item) => item.status === 'New').length)" hint="Unworked inbound" tone="info" />
      </div>
    </div>

    <FilterBar>
      <template #search>
        <Search v-model="query" placeholder="Search people" />
      </template>
      <Tabs
        v-model="tab"
        :items="[
          { id: 'all', label: 'All' },
          { id: 'new', label: 'New' },
          { id: 'working', label: 'Working' },
          { id: 'ready', label: 'Ready' },
        ]"
      />
    </FilterBar>

    <DataTable :columns="leadColumns" :rows="filtered" empty-title="No leads in this view" empty-description="Try another tab or clear search.">
      <template #status="{ value }">
        <StatusBadge :status="value" />
      </template>
    </DataTable>
  </div>
</template>
