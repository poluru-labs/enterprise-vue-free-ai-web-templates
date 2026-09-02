<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDate, formatPercent } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'name', label: 'Customer' },
  { key: 'plan', label: 'Plan' },
  { key: 'owner', label: 'Contact' },
  { key: 'openTickets', label: 'Open' },
  { key: 'csat', label: 'CSAT' },
  { key: 'sla', label: 'SLA' },
  { key: 'joined', label: 'Joined' },
];

const router = useRouter();
const store = useHelpdesk();
const query = ref('');

const rows = computed(() =>
  searchRecords(store.state.customers, query.value, ['name', 'owner', 'email', 'plan', 'region']),
);

function openCustomer(row) {
  const ticket = store.ticketsForCustomer(row.id)[0];
  if (ticket) {
    router.push(`${BASE_PATH}/tickets/${ticket.id}`);
    return;
  }
  router.push(`${BASE_PATH}/search?q=${encodeURIComponent(row.name)}`);
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Customers"
      description="Accounts writing Lumen in August 2026."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Customers' }]"
    />

    <FilterBar>
      <template #search>
        <Search v-model="query" placeholder="Search customers" />
      </template>
    </FilterBar>

    <section class="lumen-panel">
      <div class="lumen-panel-body">
        <DataTable :columns="columns" :rows="rows" empty-title="No customers" @row-click="openCustomer">
          <template #csat="{ value }">{{ formatPercent(value) }}</template>
          <template #sla="{ value }"><StatusBadge :status="value" /></template>
          <template #joined="{ value }">{{ formatDate(value) }}</template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
