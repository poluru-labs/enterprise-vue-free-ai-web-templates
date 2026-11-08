<script setup lang="ts">
import { computed, ref } from 'vue'
import { CircularProgress, DateRangePicker, Meter, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
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
        <span>{{ rep.name }}</span>
        <span class="ll-num">{{ money(rep.quota) }}</span>
      </div>
      <Meter :value="repBooked(rep.id)" :max="rep.quota" :label="`${attainment(rep.id, rep.quota)}%`" show-value />
      <p class="ll-num ll-quiet">{{ money(repBooked(rep.id)) }} booked · {{ rep.region }}</p>
    </article>
  </div>
</template>
