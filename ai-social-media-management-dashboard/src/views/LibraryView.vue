<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button, DescriptionList, Drawer, EmptyState, Pagination, Search, Status, Tabs, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { approveFile, desk, type ShelfFile } from '@/data/desk'

const PAGE_SIZE = 4
const query = ref('')
const series = ref('all')
const page = ref(1)
const openId = ref('')
const drawerOpen = ref(false)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.files.filter((file) => {
    const seriesOk = series.value === 'all' || file.series === series.value
    const text = `${file.name} ${file.series} ${file.owner}`.toLowerCase()
    return seriesOk && (q.length === 0 || text.includes(q))
  })
})
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})
const file = computed(() => desk.files.find((item) => item.id === openId.value))

watch([query, series], () => {
  page.value = 1
})

function tone(state: ShelfFile['state']) {
  return state === 'Approved' ? ('success' as const) : ('warning' as const)
}

function openFile(id: string) {
  openId.value = id
  drawerOpen.value = true
}

function approve() {
  const current = file.value
  if (!current) return
  approveFile(current.id)
  showToast({ title: 'Approved', description: `${current.name} is on the shelf.`, variant: 'success' })
}
</script>

<template>
  <PageHead title="Library" lede="Approved images and files." :crumbs="[BREADCRUMB_ROOT, { label: 'Library' }]" />
  <Search v-model="query" class="po-filters" label="Find a file" placeholder="Find a file" />
  <Tabs v-model="series" class="po-filters" :items="[{ id: 'all', label: 'All' }, { id: 'Bakery', label: 'Bakery' }, { id: 'Park', label: 'Park' }]" />
  <EmptyState v-if="filtered.length === 0" title="Shelf is clear" description="No file matches that search." icon="search" />
  <div v-else class="po-shelf">
    <button v-for="item in visible" :key="item.id" type="button" class="po-file" @click="openFile(item.id)">
      <strong>{{ item.name }}</strong>
      <span>{{ item.series }} · {{ item.owner }}</span>
      <Status :label="item.state" :tone="tone(item.state)" />
    </button>
  </div>
  <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="po-pages" />
  <Drawer v-model:open="drawerOpen" :heading="file?.name ?? 'File'" size="sm">
    <DescriptionList
      v-if="file"
      :items="[
        { term: 'Series', description: file.series },
        { term: 'Owner', description: file.owner },
        { term: 'State', description: file.state },
      ]"
    />
    <Button v-if="file && file.state === 'Waiting'" type="button" class="po-filters" @click="approve">Approve</Button>
  </Drawer>
</template>
