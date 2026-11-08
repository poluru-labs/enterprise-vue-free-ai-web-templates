<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, Avatar, CircularProgress, DateRangePicker, Divider, Meter, Tag, Toolbar, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, inRange, isBooked, money, sumAmounts } from '@/data/book'

const start = ref('2026-07-01')
const end = ref('2026-11-30')

const ranged = computed(() => book.invoices.filter((invoice) => inRange(invoice.issued, start.value, end.value)))
const quota = computed(() => book.reps.reduce((total, rep) => total + rep.quota, 0))
const booked = computed(() => sumAmounts(ranged.value.filter((invoice) => isBooked(invoice.status))))
const team = computed(() => (quota.value === 0 ? 0 : Math.round((booked.value / quota.value) * 100)))

function repBooked(repId: string) {
  const ids = new Set(book.accounts.filter((account) => account.ownerId === repId).map((account) => account.id))
  return sumAmounts(ranged.value.filter((invoice) => ids.has(invoice.accountId) && isBooked(invoice.status)))
}

function attainment(repId: string, amount: number) {
  if (amount === 0) return 0
  return Math.round((repBooked(repId) / amount) * 100)
}

const regions = [
  { id: 'austin', title: 'Austin', content: 'Charu Poluru and Dinesh Poluru.' },
  { id: 'denver', title: 'Denver', content: 'Elina Poluru and Farhan Poluru.' },
]

const tree = computed(() =>
  ['Austin', 'Denver'].map((region) => ({
    id: region,
    label: region,
    children: book.reps.filter((rep) => rep.region === region).map((rep) => ({ id: rep.id, label: rep.name })),
  })),
)
</script>

<template>
  <PageHead title="Reps" lede="Yearly quota and what is booked." :crumbs="[BREADCRUMB_ROOT, { label: 'Reps' }]" />
  <Toolbar class="ll-tools">
    <template #start>
      <DateRangePicker v-model:start="start" v-model:end="end" label="Issued" />
    </template>
    <template #end>
      <span class="ll-num">{{ money(quota) }} quota</span>
    </template>
  </Toolbar>
  <div class="ll-team">
    <CircularProgress :value="team" show-value label="Booked" />
  </div>
  <div class="ll-reps">
    <article v-for="rep in book.reps" :key="rep.id" class="ll-rep">
      <div class="ll-quota-head">
        <span class="ll-who">
          <Avatar :name="rep.name" size="sm" />
          {{ rep.name }}
        </span>
        <Tag :label="rep.region" />
        <span class="ll-num">{{ money(rep.quota) }}</span>
      </div>
      <Meter :value="repBooked(rep.id)" :max="rep.quota" :label="`${attainment(rep.id, rep.quota)}%`" show-value />
      <Divider />
      <p class="ll-num ll-quiet">{{ money(repBooked(rep.id)) }} booked</p>
    </article>
  </div>
  <h2 class="ll-section">Regions</h2>
  <TreeView :nodes="tree" />
  <Accordion class="ll-filters" :items="regions" />
</template>
