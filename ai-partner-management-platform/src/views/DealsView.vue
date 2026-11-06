<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Alert,
  DataTable,
  DateRangePicker,
  EmptyState,
  Search,
  Stat,
  Tabs,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, findPartner } from '@/data/directory'

const query = ref('')
const scope = ref('all')
const start = ref('2026-09-01')
const end = ref('2026-12-31')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'waiting', label: 'Waiting' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.deals.filter((deal) => {
    const scopeOk =
      scope.value === 'all' ||
      (scope.value === 'open' && deal.status === 'Open') ||
      (scope.value === 'waiting' && deal.status === 'Waiting')
    const inRange = deal.filed >= start.value && deal.filed <= end.value
    const firm = findPartner(deal.partnerId)?.firm ?? ''
    const text = `${deal.number} ${deal.name} ${firm}`.toLowerCase()
    return scopeOk && inRange && (q.length === 0 || text.includes(q))
  })
})

const waiting = computed(() => filtered.value.filter((deal) => deal.status === 'Waiting').length)

const rows = computed(() =>
  filtered.value.map((deal) => ({
    number: deal.number,
    firm: findPartner(deal.partnerId)?.firm ?? '',
    name: deal.name,
    status: deal.status,
    filed: deal.filed,
  })),
)

const columns = [
  { key: 'number', label: 'Deal', sortable: true },
  { key: 'firm', label: 'Firm', sortable: true },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'filed', label: 'Filed', sortable: true },
]
</script>

<template>
  <PageHead
    title="Deals"
    lede="What partners have registered."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Deals' }]"
  />
  <div class="ay-deal-tools">
    <Search v-model="query" placeholder="Find a deal" />
    <DateRangePicker v-model:start="start" v-model:end="end" label="Filed" />
  </div>
  <Stat class="ay-stat" label="On this list" :value="String(rows.length)" hint="After the date filter" />
  <Tabs v-model="scope" :items="tabs" />
  <Alert
    v-if="waiting"
    class="ay-block"
    variant="warning"
    title="Waiting"
    :message="`${waiting} deal${waiting === 1 ? '' : 's'} still waiting on a desk.`"
  />
  <EmptyState
    v-if="rows.length === 0"
    title="No deals match"
    description="Widen the dates, or show every status."
    icon="search"
  />
  <div v-else class="ay-table">
    <DataTable :columns="columns" :rows="rows" compact striped />
  </div>
</template>
