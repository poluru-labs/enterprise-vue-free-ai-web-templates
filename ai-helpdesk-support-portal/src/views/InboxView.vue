<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import {
  BASE_PATH,
  BREADCRUMB_ROOT,
  PRIORITY_OPTIONS,
  QUEUE_OPTIONS,
  STATUS_OPTIONS,
} from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDateTime, formatDuration } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'id', label: 'Ticket' },
  { key: 'subject', label: 'Subject' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'sla', label: 'SLA' },
  { key: 'updated', label: 'Updated' },
];

const ASSIGNEE_OPTIONS = [
  { value: 'all', label: 'All agents' },
  { value: 'unassigned', label: 'Unassigned' },
  { value: 'Meera Poluru', label: 'Meera Poluru' },
  { value: 'Ananya Poluru', label: 'Ananya Poluru' },
  { value: 'Madhav Poluru', label: 'Madhav Poluru' },
  { value: 'Priya Poluru', label: 'Priya Poluru' },
  { value: 'Rohan Poluru', label: 'Rohan Poluru' },
];

const SLA_OPTIONS = [
  { value: 'all', label: 'All SLA' },
  { value: 'breached', label: 'Breached' },
  { value: 'at_risk', label: 'At risk' },
  { value: 'on_track', label: 'On track' },
];

const router = useRouter();
const route = useRoute();
const store = useHelpdesk();
const query = ref('');
const status = ref('all');
const priority = ref('all');
const queue = ref('all');
const assignee = ref('all');
const sla = ref('all');

watch(
  () => route.query,
  (value) => {
    if (value.status) status.value = String(value.status);
    if (value.priority) priority.value = String(value.priority);
    if (value.queue) queue.value = String(value.queue);
    if (value.assignee) assignee.value = String(value.assignee);
    if (value.sla) sla.value = String(value.sla);
    if (value.q) query.value = String(value.q);
    if (value.assign === 'next') {
      const ticket = store.assignNext();
      if (ticket) {
        showToast({
          title: 'Assigned to Meera Poluru',
          description: `${ticket.id} · ${ticket.subject}`,
          variant: 'success',
        });
        router.replace(`${BASE_PATH}/tickets/${ticket.id}`);
      }
    }
  },
  { immediate: true },
);

const rows = computed(() => {
  const filtered = store.state.tickets.filter((ticket) => {
    const statusOk = status.value === 'all' || ticket.status === status.value;
    const priorityOk = priority.value === 'all' || ticket.priority === priority.value;
    const queueOk = queue.value === 'all' || ticket.queue === queue.value;
    const slaOk = sla.value === 'all' || ticket.sla === sla.value;
    const assigneeOk =
      assignee.value === 'all' ||
      (assignee.value === 'unassigned' && (ticket.unassigned || !ticket.assignee)) ||
      ticket.assignee === assignee.value;
    return statusOk && priorityOk && queueOk && slaOk && assigneeOk;
  });
  return searchRecords(filtered, query.value, ['id', 'subject', 'customer', 'email', 'queue', 'tags']);
});

function reset() {
  query.value = '';
  status.value = 'all';
  priority.value = 'all';
  queue.value = 'all';
  assignee.value = 'all';
  sla.value = 'all';
  router.replace({ path: `${BASE_PATH}/inbox` });
}

function assignNext() {
  const ticket = store.assignNext();
  if (!ticket) {
    showToast({ title: 'Queue is clear', variant: 'info' });
    return;
  }
  showToast({
    title: 'Assigned to Meera Poluru',
    description: `${ticket.id} · ${ticket.subject}`,
    variant: 'success',
  });
  router.push(`${BASE_PATH}/tickets/${ticket.id}`);
}
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Inbox"
      description="Live conversation queue. Filter by status, priority, queue, assignee, or SLA."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Inbox' }]"
    >
      <template #actions>
        <Button size="sm" icon="user" @click="assignNext">Assign next</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="In view" :value="rows.length" hint="After filters" icon="bi-inbox" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Unassigned" :value="store.unassigned.length" hint="Oldest first" icon="bi-person-dash" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Waiting" :value="store.waitingTickets.length" hint="Customer idle" icon="bi-hourglass-split" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Breached" :value="store.breachedTickets.length" hint="First response" icon="bi-exclamation-octagon" tone="danger" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search subject, customer, ticket id" />
      </template>
      <Select v-model="status" label="Status" :options="STATUS_OPTIONS" size="sm" />
      <Select v-model="priority" label="Priority" :options="PRIORITY_OPTIONS" size="sm" />
      <Select v-model="queue" label="Queue" :options="QUEUE_OPTIONS" size="sm" />
      <Select v-model="assignee" label="Assignee" :options="ASSIGNEE_OPTIONS" size="sm" />
      <Select v-model="sla" label="SLA" :options="SLA_OPTIONS" size="sm" />
    </FilterBar>

    <section class="lumen-panel">
      <div class="lumen-panel-body">
        <DataTable
          :columns="columns"
          :rows="rows"
          empty-title="No tickets in this filter"
          @row-click="(row) => router.push(`${BASE_PATH}/tickets/${row.id}`)"
        >
          <template #id="{ value }">
            <span class="lumen-mono">{{ value }}</span>
          </template>
          <template #status="{ value }"><StatusBadge :status="value" /></template>
          <template #priority="{ value }"><StatusBadge :status="value" /></template>
          <template #assignee="{ value }">{{ value || 'Unassigned' }}</template>
          <template #sla="{ value, row }">
            <StatusBadge :status="value" />
            <span class="lumen-subtle"> {{ formatDuration(row.slaMinutes) }} left</span>
          </template>
          <template #updated="{ value }">{{ formatDateTime(value) }}</template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
