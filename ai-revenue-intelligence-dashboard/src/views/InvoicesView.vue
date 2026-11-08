<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Alert,
  DataTable,
  DateRangePicker,
  Pagination,
  Search,
  SegmentedControl,
  Status,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, INVOICE_STATUSES } from '@/constants/navigation'
import { accountName, book, inRange, money, type InvoiceStatus } from '@/data/book'

const PAGE_SIZE = 4
const query = ref('')
const standing = ref('all')
const start = ref('2026-07-01')
const end = ref('2026-11-30')
const page = ref(1)

const segments = [
  { value: 'all', label: 'All' },
  ...INVOICE_STATUSES.map((status) => ({ value: status, label: status })),
]

const columns = [
  { key: 'number', label: 'Invoice' },
  { key: 'account', label: 'Account' },
  { key: 'issued', label: 'Issued' },
  { key: 'standing', label: 'Status' },
  { key: 'amount', label: 'Amount' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.invoices.filter((invoice) => {
    const standingOk = standing.value === 'all' || invoice.status === standing.value
    const dated = inRange(invoice.issued, start.value, end.value)
    const text = `${invoice.number} ${accountName(invoice.accountId)}`.toLowerCase()
    return standingOk && dated && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})
const overdueCount = computed(() => filtered.value.filter((invoice) => invoice.status === 'Overdue').length)

const rows = computed(() =>
  visible.value.map((invoice) => ({
    number: invoice.number,
    account: accountName(invoice.accountId),
    issued: invoice.issued,
    standing: invoice.status,
    amount: money(invoice.amount),
  })),
)

watch([query, standing, start, end], () => {
  page.value = 1
})

function tone(status: InvoiceStatus) {
  if (status === 'Paid') return 'success' as const
  if (status === 'Overdue') return 'danger' as const
  if (status === 'Sent') return 'info' as const
  return 'neutral' as const
}
</script>

<template>
  <PageHead title="Invoices" lede="Draft, sent, paid, and overdue." :crumbs="[BREADCRUMB_ROOT, { label: 'Invoices' }]" />
  <Alert v-if="overdueCount > 0" variant="warning" title="Overdue" :message="`${overdueCount} past due.`" />
  <Toolbar class="ll-tools">
    <template #start>
      <Search v-model="query" label="Find an invoice" placeholder="Find an invoice" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Issued" />
    </template>
  </Toolbar>
  <SegmentedControl v-model="standing" class="ll-filters" :segments="segments" />
  <div class="ll-opens">
    <Status v-for="invoice in visible" :key="invoice.id" :label="invoice.number" :tone="tone(invoice.status)" />
  </div>
  <div class="ll-table">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
  <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="ll-pages" />
</template>
