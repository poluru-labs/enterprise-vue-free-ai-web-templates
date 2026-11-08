<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Alert,
  Autocomplete,
  Button,
  DataTable,
  DateRangePicker,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { siteName, supplierName, tower } from '@/data/tower'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const scope = ref('all')
const start = ref('2026-10-01')
const end = ref('2026-11-30')
const page = ref(1)
const jump = ref('')
const helpOpen = ref(false)
const loading = ref(false)
const numbers = computed(() => tower.orders.map((order) => ({ value: order.number, label: `${order.number} ${order.title}` })))

const segments = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'late', label: 'Late' },
  { value: 'received', label: 'Received' },
]

const columns = [
  { key: 'number', label: 'Number' },
  { key: 'title', label: 'Order' },
  { key: 'site', label: 'Site' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'due', label: 'Due' },
  { key: 'state', label: 'Status' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return tower.orders.filter((order) => {
    const scopeOk = scope.value === 'all' || order.state.toLowerCase() === scope.value
    const dated = order.due >= start.value && order.due <= end.value
    const text = `${order.number} ${order.title} ${siteName(order.siteId)} ${supplierName(order.supplierId)} ${order.owner}`.toLowerCase()
    return scopeOk && dated && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})
const rows = computed(() =>
  visible.value.map((order) => ({
    number: order.number,
    title: order.title,
    site: siteName(order.siteId),
    supplier: supplierName(order.supplierId),
    due: order.due,
    state: order.state,
  })),
)

watch([query, scope, start, end], () => {
  page.value = 1
})

function openOrder(token: string) {
  const order = tower.orders.find((item) => item.number === token || item.title === token)
  if (order) router.push(`${BASE_PATH}/orders/${order.id}`)
}

function onTableClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const cell = target.closest('td')
  if (!cell) return
  openOrder(cell.textContent?.trim() ?? '')
}

function onJump(value: string) {
  const order = tower.orders.find((item) => item.number === value)
  if (order) router.push(`${BASE_PATH}/orders/${order.id}`)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <PageHead title="Orders" lede="Purchase and transfer orders." :crumbs="[BREADCRUMB_ROOT, { label: 'Orders' }]" />
  <Alert v-if="tower.orders.some((order) => order.state === 'Late')" class="sw-tools" variant="warning" title="Late" message="Late orders stay on the delay list." />
  <Toolbar class="sw-tools">
    <template #start>
      <Search v-model="query" label="Find an order" placeholder="Find an order" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Due" />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Due dates" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">Due dates</Button>
        </template>
        <p>An order is late when the due date has passed.</p>
      </Popover>
      <Tooltip content="Reload the sheet">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <SegmentedControl v-model="scope" class="sw-tools" :segments="segments" />
  <Autocomplete v-model="jump" class="sw-tools" label="Jump to a number" :options="numbers" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState v-else-if="filtered.length === 0" title="No orders" description="Nothing matches that search." icon="search" />
  <template v-else>
    <div class="sw-opens">
      <Button v-for="order in visible" :key="order.id" type="button" size="sm" variant="secondary" @click="openOrder(order.number)">
        {{ order.number }}
      </Button>
    </div>
    <div class="sw-table" @click="onTableClick">
      <DataTable :columns="columns" :rows="rows" compact striped />
    </div>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="sw-pages" />
  </template>
</template>
