<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Button,
  DataTable,
  DateRangePicker,
  EmptyState,
  Kbd,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Stepper,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { book, money, orderTotal, supplierName, type Stage } from '@/data/ledger'

const router = useRouter()
const query = ref('')
const stage = ref('all')
const start = ref('2026-10-01')
const end = ref('2026-11-30')
const loading = ref(false)
const helpOpen = ref(false)

const segments = [
  { value: 'all', label: 'All' },
  ...STAGES.map((item) => ({ value: item.label, label: item.label })),
]

const steps = STAGES.map((item) => ({
  id: item.id,
  label: item.label,
  description: item.description,
}))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.orders.filter((order) => {
    const stageOk = stage.value === 'all' || order.stage === stage.value
    const inRange = order.filed >= start.value && order.filed <= end.value
    const text = `${order.number} ${order.title} ${supplierName(order.supplierId)} ${order.site}`.toLowerCase()
    return stageOk && inRange && (q.length === 0 || text.includes(q))
  })
})

const activeIndex = computed(() => STAGES.findIndex((item) => item.label === stage.value))

const rows = computed(() =>
  filtered.value.map((order) => ({
    number: order.number,
    title: order.title,
    supplier: supplierName(order.supplierId),
    stage: order.stage,
    site: order.site,
    total: money(orderTotal(order)),
    filed: order.filed,
  })),
)

const columns = [
  { key: 'number', label: 'PO', sortable: true },
  { key: 'title', label: 'Title' },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'stage', label: 'Stage' },
  { key: 'site', label: 'Site' },
  { key: 'total', label: 'Total' },
  { key: 'filed', label: 'Filed', sortable: true },
]

function openOrder(id: string) {
  router.push(`${BASE_PATH}/orders/${id}`)
}

function onSheetClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const cell = target.closest('td')
  const text = cell?.textContent?.trim() ?? ''
  const order = book.orders.find((item) => item.number === text)
  if (!order) return
  openOrder(order.id)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function isStage(value: string): value is Stage {
  return STAGES.some((item) => item.label === value)
}
</script>

<template>
  <PageHead
    title="Orders"
    lede="Draft through received, on one sheet."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Orders' }]"
  />
  <Toolbar class="pw-tools">
    <template #start>
      <Search v-model="query" placeholder="Find an order" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Filed" />
      <SegmentedControl v-model="stage" :segments="segments" />
    </template>
    <template #end>
      <span class="pw-count">{{ filtered.length }} orders</span>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Stages" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About stages</Button>
        </template>
        <p>Draft, Review, Approved, Ordered, Received. Review waits on a named approver.</p>
      </Popover>
      <Tooltip content="Reload the sheet">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>

  <div v-if="loading" class="pw-ledger">
    <Skeleton variant="rectangular" width="100%" height="220px" />
  </div>
  <EmptyState
    v-else-if="filtered.length === 0"
    title="No orders match"
    description="Widen the dates, or show every stage."
    icon="search"
  />
  <div v-else class="pw-ledger">
    <div class="pw-pipeline">
      <Stepper :steps="steps" :active-index="isStage(stage) ? activeIndex : 0" />
    </div>
    <div class="pw-opens">
      <Button
        v-for="order in filtered"
        :key="order.id"
        type="button"
        size="sm"
        variant="secondary"
        @click="openOrder(order.id)"
      >
        {{ order.number }}
      </Button>
    </div>
    <div class="pw-table" @click="onSheetClick">
      <DataTable :columns="columns" :rows="rows" compact striped />
    </div>
  </div>
</template>
