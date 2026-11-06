<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  CircularProgress,
  DataTable,
  DateRangePicker,
  Divider,
  EmptyState,
  Meter,
  Pagination,
  ProgressBar,
  Stat,
  Tabs,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, money, type Category } from '@/data/claims'

const start = ref('2026-10-01')
const end = ref('2026-11-30')
const tab = ref('all')
const page = ref(1)
const pageSize = 4

watch([tab, start, end], () => {
  page.value = 1
})

const inRange = computed(() =>
  desk.claims.filter((claim) => claim.submitted >= start.value && claim.submitted <= end.value),
)

const shown = computed(() =>
  inRange.value.filter((claim) => tab.value === 'all' || claim.category === tab.value),
)

const total = computed(() => shown.value.reduce((sum, claim) => sum + claim.amount, 0))
const approved = computed(() => shown.value.filter((claim) => claim.status === 'Approved'))
const approvedShare = computed(() =>
  shown.value.length ? Math.round((approved.value.length / shown.value.length) * 100) : 0,
)

const categories: Category[] = ['Travel', 'Software', 'Meals']

function categoryTotal(category: Category) {
  return inRange.value.filter((claim) => claim.category === category).reduce((sum, claim) => sum + claim.amount, 0)
}

const pageCount = computed(() => Math.max(1, Math.ceil(shown.value.length / pageSize)))
const rows = computed(() => {
  const startAt = (page.value - 1) * pageSize
  return shown.value.slice(startAt, startAt + pageSize).map((claim) => ({
    number: claim.number,
    owner: claim.owner,
    category: claim.category,
    status: claim.status,
    amount: money(claim.amount),
  }))
})

const rangeMax = computed(() => Math.max(total.value, 1))
</script>

<template>
  <PageHead
    title="Reports"
    lede="Travel, software, and meals in the selected dates."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Reports' }]"
  />

  <div class="cl-report-range">
    <DateRangePicker v-model:start="start" v-model:end="end" label="Submitted" />
  </div>

  <div class="cl-report-stats">
    <Stat label="In range" :value="money(total)" :hint="`${shown.length} claims`" />
    <Stat label="Approved" :value="String(approved.length)" hint="Closed yes" trend="flat" trend-value="This window" />
    <div class="cl-dial">
      <CircularProgress :value="approvedShare" show-value label="Approved" />
    </div>
  </div>

  <Divider />

  <div class="cl-meters">
    <Meter
      v-for="category in categories"
      :key="category"
      :value="categoryTotal(category)"
      :max="rangeMax"
      :label="category"
      show-value
    />
    <ProgressBar label="Approved share" :value="approvedShare" show-value />
  </div>

  <Tabs
    v-model="tab"
    class="cl-tabs"
    :items="[
      { id: 'all', label: 'All' },
      { id: 'Travel', label: 'Travel' },
      { id: 'Software', label: 'Software' },
      { id: 'Meals', label: 'Meals' },
    ]"
  />

  <EmptyState
    v-if="!shown.length"
    title="Nothing in these dates"
    description="Widen the range to see travel, software, and meals."
    icon="search"
  />

  <template v-else>
  <DataTable
    compact
    striped
    :columns="[
      { key: 'number', label: 'Claim', sortable: true },
      { key: 'owner', label: 'Owner' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
      { key: 'amount', label: 'Amount' },
    ]"
    :rows="rows"
  />
  <div class="cl-pager">
    <Pagination v-model:page="page" :page-count="pageCount" />
  </div>
  </template>
</template>
