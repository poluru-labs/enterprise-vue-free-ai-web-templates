<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, QUEUE_OPTIONS, STATUS_OPTIONS } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDateTime } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'id', label: 'Ticket' },
  { key: 'subject', label: 'Subject' },
  { key: 'customer', label: 'Customer' },
  { key: 'queue', label: 'Queue' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'created', label: 'Created' },
];

const router = useRouter();
const store = useHelpdesk();
const query = ref('');
const status = ref('all');
const queue = ref('all');

const rows = computed(() => {
  const filtered = store.state.tickets.filter((ticket) => {
    const statusOk = status.value === 'all' || ticket.status === status.value;
    const queueOk = queue.value === 'all' || ticket.queue === queue.value;
    return statusOk && queueOk;
  });
  return searchRecords(filtered, query.value, ['id', 'subject', 'customer', 'assignee', 'queue']);
});

function reset() {
  query.value = '';
  status.value = 'all';
  queue.value = 'all';
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Tickets"
      description="Full register for August 2026. Click a row to open the conversation."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Tickets' }]"
    />

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search tickets" />
      </template>
      <Select v-model="status" label="Status" :options="STATUS_OPTIONS" size="sm" />
      <Select v-model="queue" label="Queue" :options="QUEUE_OPTIONS" size="sm" />
    </FilterBar>

    <section class="lumen-panel">
      <div class="lumen-panel-body">
        <DataTable
          :columns="columns"
          :rows="rows"
          empty-title="No tickets"
          @row-click="(row) => router.push(`${BASE_PATH}/tickets/${row.id}`)"
        >
          <template #id="{ value }"><span class="lumen-mono">{{ value }}</span></template>
          <template #status="{ value }"><StatusBadge :status="value" /></template>
          <template #priority="{ value }"><StatusBadge :status="value" /></template>
          <template #assignee="{ value }">{{ value || 'Unassigned' }}</template>
          <template #created="{ value }">{{ formatDateTime(value) }}</template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
