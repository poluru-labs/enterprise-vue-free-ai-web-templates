<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  DescriptionList,
  Drawer,
  EmptyState,
  FileUpload,
  List,
  ProgressBar,
  Status,
  Stepper,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, RENEWAL_STEPS } from '@/constants/navigation'
import { accountBalance, book, findAccount, money, repName } from '@/data/book'

const route = useRoute()
const router = useRouter()
const contactOpen = ref(false)
const note = ref('')
const account = computed(() => findAccount(String(route.params.id ?? '')))
const steps = RENEWAL_STEPS.map((step) => ({ id: step.id, label: step.label, description: step.description }))

const invoices = computed(() => book.invoices.filter((invoice) => invoice.accountId === account.value?.id))
const columns = [
  { key: 'number', label: 'Invoice' },
  { key: 'issued', label: 'Issued' },
  { key: 'standing', label: 'Status' },
  { key: 'amount', label: 'Amount' },
]
const rows = computed(() =>
  invoices.value.map((invoice) => ({
    number: invoice.number,
    issued: invoice.issued,
    standing: invoice.status,
    amount: money(invoice.amount),
  })),
)
const contacts = computed(() =>
  account.value ? [{ id: account.value.id, label: account.value.contact, description: 'Billing' }] : [],
)
const progress = computed(() => {
  const current = account.value
  if (!current) return 0
  return Math.round(((current.renewalStep + 1) / RENEWAL_STEPS.length) * 100)
})
const stepLabel = computed(() => RENEWAL_STEPS[account.value?.renewalStep ?? 0]?.label ?? 'Review')
const hasOverdue = computed(() => invoices.value.some((invoice) => invoice.status === 'Overdue'))

function fileNote() {
  const current = account.value
  const text = note.value.trim()
  if (!current || text.length === 0) return
  current.notes.unshift({
    id: `note-${Date.now()}`,
    title: 'Note',
    description: text,
    time: '2026-11-07',
  })
  note.value = ''
  showToast({ title: 'Note filed', description: 'The note is on the account.', variant: 'success' })
}

function onStatement() {
  showToast({ title: 'Statement filed', description: 'The file is on the account.', variant: 'success' })
}
</script>

<template>
  <PageHead
    v-if="account"
    :title="account.name"
    :lede="repName(account.ownerId)"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Accounts', to: `${BASE_PATH}/accounts` }, { label: account.name }]"
  />
  <p v-else>That account is not on the books.</p>
  <div v-if="account" class="ll-record">
    <Alert v-if="hasOverdue" variant="warning" title="Overdue" message="An invoice on this account is past due." />
    <div class="ll-quota-head">
      <Status :label="stepLabel" tone="info" />
      <Badge label="USD" variant="brand" soft />
    </div>
    <DescriptionList
      :items="[
        { term: 'Owner', description: repName(account.ownerId) },
        { term: 'Contact', description: account.contact },
        { term: 'Renewal', description: account.renewal },
        { term: 'Balance', description: money(accountBalance(account.id)) },
      ]"
    />
    <div class="ll-step">
      <Stepper :steps="steps" :active-index="account.renewalStep" />
    </div>
    <ProgressBar label="Renewal" :value="progress" show-value />
    <h2 class="ll-section">Invoices</h2>
    <EmptyState v-if="rows.length === 0" title="No invoices" description="Nothing is billed on this account." icon="search" />
    <div v-else class="ll-table">
      <DataTable :columns="columns" :rows="rows" compact />
    </div>
    <h2 class="ll-section">Contacts</h2>
    <Button type="button" variant="secondary" size="sm" @click="contactOpen = true">{{ account.contact }}</Button>
    <List :items="contacts" />
    <h2 class="ll-section">Notes</h2>
    <Timeline :items="account.notes" />
    <Textarea v-model="note" label="Account note" />
    <FileUpload label="Statement" accept=".pdf,.png" @files-change="onStatement" />
    <ButtonGroup>
      <Button type="button" @click="fileNote">File note</Button>
      <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/accounts`)">Back to accounts</Button>
    </ButtonGroup>
    <Drawer v-model:open="contactOpen" :heading="account.contact" size="sm">
      <DescriptionList
        :items="[
          { term: 'Account', description: account.name },
          { term: 'Role', description: 'Billing' },
        ]"
      />
    </Drawer>
  </div>
</template>
