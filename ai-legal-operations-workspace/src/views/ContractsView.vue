<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Alert, DataTable, DateRangePicker, EmptyState, Pagination } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ledger } from '@/data/ledger'

const start = ref('2026-11-01')
const end = ref('2026-12-31')
const page = ref(1)
const pageSize = 3

const filtered = computed(() =>
  ledger.renewals.filter((renewal) => renewal.renews >= start.value && renewal.renews <= end.value),
)

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const rows = computed(() => {
  const slice = filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize)
  return slice.map((renewal) => ({
    id: renewal.id,
    number: renewal.number,
    title: renewal.title,
    party: renewal.party,
    renews: renewal.renews,
    owner: renewal.owner,
  }))
})

const next = computed(() => filtered.value[0])

watch([start, end], () => {
  page.value = 1
})
</script>

<template>
  <PageHead
    title="Contracts"
    lede="Renewals inside the dates you set."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Contracts' }]"
  />
  <div class="bw-range">
    <DateRangePicker v-model:start="start" v-model:end="end" />
  </div>
  <Alert v-if="next" class="bw-block" :title="`${next.number} renews ${next.renews}.`">
    {{ next.title }} · {{ next.party }}
  </Alert>
  <EmptyState
    v-if="filtered.length === 0"
    title="No renewals in these dates"
    description="Widen the range to see the rest of the list."
    icon="search"
  />
  <div v-if="rows.length" class="bw-table">
    <DataTable
      :columns="[
        { key: 'number', label: 'Matter' },
        { key: 'title', label: 'Title' },
        { key: 'party', label: 'Party' },
        { key: 'renews', label: 'Renews' },
        { key: 'owner', label: 'Owner' },
      ]"
      :rows="rows"
      compact
    />
  </div>
  <Pagination v-if="filtered.length > pageSize" v-model:page="page" :page-count="pageCount" />
</template>
