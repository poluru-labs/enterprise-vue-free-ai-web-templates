<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, DataTable, DateRangePicker, Meter, Stat, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, inRange, isBooked, isOpen, money, repName, sumAmounts } from '@/data/book'

const router = useRouter()
const start = ref('2026-07-01')
const end = ref('2026-11-30')

const ranged = computed(() => book.invoices.filter((invoice) => inRange(invoice.issued, start.value, end.value)))
const booked = computed(() => sumAmounts(ranged.value.filter((invoice) => isBooked(invoice.status))))
const collected = computed(() => sumAmounts(ranged.value.filter((invoice) => invoice.status === 'Paid')))
const overdue = computed(() => sumAmounts(ranged.value.filter((invoice) => invoice.status === 'Overdue')))
const open = computed(() => sumAmounts(ranged.value.filter((invoice) => isOpen(invoice.status))))

const columns = [
  { key: 'account', label: 'Account' },
  { key: 'owner', label: 'Owner' },
  { key: 'renewal', label: 'Renewal' },
  { key: 'balance', label: 'Balance' },
]

const rows = computed(() => {
  const ids = new Set(ranged.value.map((invoice) => invoice.accountId))
  return book.accounts
    .filter((account) => ids.has(account.id))
    .map((account) => ({
      account: account.name,
      owner: repName(account.ownerId),
      renewal: account.renewal,
      balance: money(periodBalance(account.id)),
    }))
})

function periodBalance(accountId: string) {
  return sumAmounts(ranged.value.filter((invoice) => invoice.accountId === accountId && invoice.status !== 'Paid'))
}

function repBooked(repId: string) {
  const ids = new Set(book.accounts.filter((account) => account.ownerId === repId).map((account) => account.id))
  return sumAmounts(ranged.value.filter((invoice) => ids.has(invoice.accountId) && isBooked(invoice.status)))
}

function attainment(repId: string, quota: number) {
  if (quota === 0) return 0
  return Math.round((repBooked(repId) / quota) * 100)
}

function openAccount(name: string) {
  const account = book.accounts.find((item) => item.name === name)
  if (account) router.push(`${BASE_PATH}/accounts/${account.id}`)
}

function onTableClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const cell = target.closest('td')
  if (!cell) return
  openAccount(cell.textContent?.trim() ?? '')
}
</script>

<template>
  <PageHead title="Overview" lede="Booked, collected, and overdue for the period." :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]" />
  <Toolbar class="ll-tools">
    <template #start>
      <DateRangePicker v-model:start="start" v-model:end="end" label="Issued" />
    </template>
    <template #end>
      <span class="ll-num">{{ money(booked) }} booked</span>
    </template>
  </Toolbar>
  <div class="ll-stats">
    <Stat label="Booked" :value="money(booked)" hint="Sent, paid, and overdue" />
    <Stat label="Collected" :value="money(collected)" hint="Paid in the period" />
    <Stat label="Overdue" :value="money(overdue)" hint="Past the due date" />
    <Stat label="Open" :value="money(open)" hint="Draft and sent" />
  </div>
  <h2 class="ll-section">Quota</h2>
  <div class="ll-quotas">
    <div v-for="rep in book.reps" :key="rep.id" class="ll-quota">
      <div class="ll-quota-head">
        <span>{{ rep.name }}</span>
        <span class="ll-num">{{ attainment(rep.id, rep.quota) }}%</span>
      </div>
      <Meter :value="repBooked(rep.id)" :max="rep.quota" :label="money(rep.quota)" show-value />
    </div>
  </div>
  <h2 class="ll-section">Accounts</h2>
  <div class="ll-opens">
    <Button v-for="row in rows" :key="row.account" type="button" size="sm" variant="secondary" @click="openAccount(row.account)">
      {{ row.account }}
    </Button>
  </div>
  <div class="ll-table" @click="onTableClick">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
</template>
