<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { crm, dealColumns, openDealModal, ownerOptions, stageOptions } from '../stores/crm.js';
import { exportToCsv } from '../utils/csv.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const query = ref('');
const stage = ref('all');
const owner = ref('all');

const filtered = computed(() => {
  return searchRecords(crm.deals, query.value, ['name', 'account', 'owner']).filter((deal) => {
    const stageOk = stage.value === 'all' || deal.stage === stage.value;
    const ownerOk = owner.value === 'all' || deal.owner.toLowerCase().includes(owner.value);
    return stageOk && ownerOk;
  });
});

function reset() {
  query.value = '';
  stage.value = 'all';
  owner.value = 'all';
}

function downloadCsv() {
  exportToCsv('deals.csv', dealColumns, filtered.value);
}
</script>

<template>
  <div class="bloom-page">
    <PageHeader
      title="Deals"
      description="Filter by owner or stage. Export the working set, or open a row for notes and probability."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Deals' }]"
    >
      <template #actions>
        <Button variant="secondary" icon="download" :disabled="!filtered.length" @click="downloadCsv">Export CSV</Button>
        <Button icon="plus" @click="openDealModal()">New deal</Button>
      </template>
    </PageHeader>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search deals" />
      </template>
      <Select v-model="stage" placeholder="" :options="[{ value: 'all', label: 'All stages' }, ...stageOptions]" />
      <Select v-model="owner" placeholder="" :options="[{ value: 'all', label: 'All owners' }, ...ownerOptions]" />
    </FilterBar>

    <DataTable
      :columns="dealColumns"
      :rows="filtered"
      empty-title="No matching deals"
      empty-description="Clear filters or create a new opportunity."
      @row-click="(row) => router.push(`${BASE_PATH}/deals/${row.id}`)"
    >
      <template #stage="{ value }">
        <StatusBadge :status="value" />
      </template>
    </DataTable>
  </div>
</template>
