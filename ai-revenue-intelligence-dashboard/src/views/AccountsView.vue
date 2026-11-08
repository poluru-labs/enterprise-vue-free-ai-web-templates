<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button, DataTable, DateRangePicker, Pagination, Search, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { accountBalance, book, inRange, money, repName } from '@/data/book'

const PAGE_SIZE = 5
const router = useRouter()
const query = ref('')
const start = ref('2026-08-01')
const end = ref('2027-12-31')
const page = ref(1)

const columns = [
  { key: 'account', label: 'Account' },
  { key: 'owner', label: 'Owner' },
  { key: 'renewal', label: 'Renewal' },
  { key: 'balance', label: 'Balance' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return book.accounts.filter((account) => {
    const dated = inRange(account.renewal, start.value, end.value)
    const text = `${account.name} ${repName(account.ownerId)} ${account.contact}`.toLowerCase()
    return dated && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})

const rows = computed(() =>
  visible.value.map((account) => ({
    account: account.name,
    owner: repName(account.ownerId),
    renewal: account.renewal,
    balance: money(accountBalance(account.id)),
  })),
)

watch([query, start, end], () => {
  page.value = 1
})

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
  <PageHead title="Accounts" lede="Owner and renewal date." :crumbs="[BREADCRUMB_ROOT, { label: 'Accounts' }]" />
  <Toolbar class="ll-tools">
    <template #start>
      <Search v-model="query" label="Find an account" placeholder="Find an account" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Renewal" />
    </template>
  </Toolbar>
  <div class="ll-opens">
    <Button v-for="account in visible" :key="account.id" type="button" size="sm" variant="secondary" @click="openAccount(account.name)">
      {{ account.name }}
    </Button>
  </div>
  <div class="ll-table" @click="onTableClick">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
  <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="ll-pages" />
</template>
