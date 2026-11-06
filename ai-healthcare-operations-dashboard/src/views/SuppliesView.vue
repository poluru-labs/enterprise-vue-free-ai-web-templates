<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DataTable,
  DateRangePicker,
  EmptyState,
  Pagination,
  Search,
  Status,
  Tabs,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'

const query = ref('')
const tab = ref('all')
const start = ref('2026-11-01')
const end = ref('2026-11-06')
const page = ref(1)
const pageSize = 3

const filtered = computed(() =>
  desk.supplies.filter((item) => {
    const matchesQuery = `${item.item} ${item.unit}`.toLowerCase().includes(query.value.trim().toLowerCase())
    const matchesTab = tab.value === 'all' || item.unit === tab.value
    const matchesDate = item.counted >= start.value && item.counted <= end.value
    return matchesQuery && matchesTab && matchesDate
  }),
)

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

const rows = computed(() => {
  const startAt = (page.value - 1) * pageSize
  return filtered.value.slice(startAt, startAt + pageSize).map((item) => ({
    item: item.item,
    unit: item.unit,
    onHand: item.onHand,
    par: item.par,
    level: item.onHand * 2 < item.par ? 'Low' : 'Steady',
  }))
})

watch([query, tab, start, end], () => {
  page.value = 1
})
</script>

<template>
  <PageHead
    title="Supplies"
    lede="Carts that are under par."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Supplies' }]"
  />

  <div class="wl-range">
    <DateRangePicker v-model:start="start" v-model:end="end" label="Counted" />
  </div>

  <Toolbar class="wl-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Search an item or unit" clearable />
    </template>
  </Toolbar>

  <Tabs
    v-model="tab"
    class="wl-tabs"
    :items="[
      { id: 'all', label: 'All' },
      { id: 'Cedar', label: 'Cedar' },
      { id: 'Maple', label: 'Maple' },
      { id: 'Harbor', label: 'Harbor' },
    ]"
  />

  <EmptyState
    v-if="!filtered.length"
    title="Nothing in this count"
    description="Widen the dates, or clear the search."
    icon="search"
  />

  <template v-else>
    <div class="wl-table">
      <DataTable
        compact
        striped
        :columns="[
          { key: 'item', label: 'Item', sortable: true },
          { key: 'unit', label: 'Unit' },
          { key: 'onHand', label: 'On hand' },
          { key: 'par', label: 'Par' },
          { key: 'level', label: 'Level' },
        ]"
        :rows="rows"
      />
    </div>
    <div class="wl-pills">
      <Status
        v-for="row in rows.filter((item) => item.level === 'Low')"
        :key="row.item"
        :label="`${row.item} low`"
        tone="warning"
      />
    </div>
    <div class="wl-pager">
      <Pagination v-model:page="page" :page-count="pageCount" />
    </div>
  </template>
</template>
