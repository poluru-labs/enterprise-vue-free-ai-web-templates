<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  ButtonGroup,
  DataTable,
  DescriptionList,
  List,
  ProgressBar,
  Status,
  Stepper,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, RENEWAL_STEPS } from '@/constants/navigation'
import { accountBalance, book, findAccount, money, repName } from '@/data/book'

const route = useRoute()
const router = useRouter()
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
    <Status :label="stepLabel" tone="info" />
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
    <p v-if="rows.length === 0" class="ll-quiet">No invoices on this account.</p>
    <div v-else class="ll-table">
      <DataTable :columns="columns" :rows="rows" compact />
    </div>
    <h2 class="ll-section">Contacts</h2>
    <List :items="contacts" />
    <h2 class="ll-section">Notes</h2>
    <Timeline :items="account.notes" />
    <ButtonGroup>
      <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/accounts`)">Back to accounts</Button>
    </ButtonGroup>
  </div>
</template>
