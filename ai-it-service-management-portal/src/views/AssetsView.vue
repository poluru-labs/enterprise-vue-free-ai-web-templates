<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Card, DataTable, DateRangePicker, Pagination, Search } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const query = ref('')
const start = ref('2026-01-01')
const end = ref('2026-12-31')
const page = ref(1)
const pageSize = 3

const filtered = computed(() =>
  desk.assets.filter((asset) => {
    const matchesQuery = `${asset.name} ${asset.holder}`.toLowerCase().includes(query.value.trim().toLowerCase())
    return matchesQuery && asset.assigned >= start.value && asset.assigned <= end.value
  }),
)

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const spare = computed(() => desk.assets.filter((asset) => asset.state === 'Ready').length)

const rows = computed(() => {
  const startAt = (page.value - 1) * pageSize
  return filtered.value.slice(startAt, startAt + pageSize).map((asset) => ({
    name: asset.name,
    kind: asset.kind,
    holder: asset.holder,
    state: asset.state,
  }))
})

watch([query, start, end], () => {
  page.value = 1
})
</script>

<template>
  <PageHead
    title="Assets"
    lede="Laptops and seats assigned on the desk."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Assets' }]"
  />

  <div class="dk-asset-top">
    <Card title="Ready spares" :description="`${spare} laptop waiting on the shelf.`" />
    <DateRangePicker v-model:start="start" v-model:end="end" label="Assigned" />
  </div>
  <Search v-model="query" class="dk-toolbar" placeholder="Search an asset or person" clearable />

  <div class="dk-table-wrap">
    <DataTable
      compact
      striped
      :columns="[
        { key: 'name', label: 'Asset', sortable: true },
        { key: 'kind', label: 'Kind' },
        { key: 'holder', label: 'Holder' },
        { key: 'state', label: 'State' },
      ]"
      :rows="rows"
    />
  </div>
  <div class="dk-pager">
    <Pagination v-model:page="page" :page-count="pageCount" />
  </div>
</template>
