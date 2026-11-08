<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Alert,
  Button,
  Combobox,
  DataTable,
  DatePicker,
  DateRangePicker,
  EmptyState,
  FileUpload,
  Kbd,
  Modal,
  NumberInput,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  Search,
  SegmentedControl,
  Skeleton,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, INVOICE_STATUSES, PEOPLE } from '@/constants/navigation'
import { accountName, book, findInvoice, inRange, money, recordPayment } from '@/data/book'

const PAGE_SIZE = 4
const query = ref('')
const standing = ref('all')
const start = ref('2026-07-01')
const end = ref('2026-11-30')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const payOpen = ref(false)
const payId = ref('')
const payDay = ref('2026-11-07')
const payAmount = ref(0)
const method = ref('wire')
const recorder = ref('Varun Poluru')

const segments = [
  { value: 'all', label: 'All' },
  ...INVOICE_STATUSES.map((status) => ({ value: status, label: status })),
]
const people = PEOPLE.map((name) => ({ value: name, label: name }))

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
const payable = computed(() => visible.value.filter((invoice) => invoice.status === 'Sent' || invoice.status === 'Overdue'))
const overdueCount = computed(() => filtered.value.filter((invoice) => invoice.status === 'Overdue').length)
const paying = computed(() => findInvoice(payId.value))
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

function openPay(id: string) {
  const invoice = findInvoice(id)
  if (!invoice) return
  payId.value = id
  payAmount.value = invoice.amount
  payOpen.value = true
}

function confirmPay() {
  const invoice = findInvoice(payId.value)
  if (!invoice) return
  recordPayment(invoice.id, payDay.value)
  payOpen.value = false
  showToast({
    title: 'Payment recorded',
    description: `${invoice.number} is paid.`,
    variant: 'success',
  })
}

function onRemit() {
  showToast({ title: 'Remittance filed', description: 'The file is on the invoice.', variant: 'success' })
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
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
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Statuses" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About status</Button>
        </template>
        <p>Draft, Sent, Paid, and Overdue are the only statuses.</p>
      </Popover>
      <Tooltip content="Reload the sheet">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <SegmentedControl v-model="standing" class="ll-filters" :segments="segments" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState
    v-else-if="filtered.length === 0"
    title="No invoices"
    description="Nothing on the books matches that search."
    icon="search"
  />
  <template v-else>
    <div class="ll-opens">
      <Button
        v-for="invoice in payable"
        :key="invoice.id"
        type="button"
        size="sm"
        variant="secondary"
        @click="openPay(invoice.id)"
      >
        Record {{ invoice.number }}
      </Button>
    </div>
    <div class="ll-table">
      <DataTable :columns="columns" :rows="rows" compact />
    </div>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="ll-pages" />
  </template>
  <Modal v-model:open="payOpen" :heading="paying ? `Record ${paying.number}` : 'Record payment'">
    <div class="ll-modal">
      <p v-if="paying" class="ll-quiet">{{ accountName(paying.accountId) }} · {{ paying.status }}</p>
      <NumberInput v-model="payAmount" label="Amount" :min="0" :step="100" />
      <DatePicker v-model="payDay" label="Paid on" />
      <Combobox v-model="recorder" label="Recorded by" :options="people" />
      <RadioGroup v-model="method" label="Method" orientation="horizontal">
        <Radio value="wire" label="Wire" />
        <Radio value="check" label="Check" />
      </RadioGroup>
      <FileUpload label="Remittance" accept=".pdf,.png" @files-change="onRemit" />
    </div>
    <template #footer>
      <Button type="button" @click="confirmPay">Record payment</Button>
    </template>
  </Modal>
</template>
