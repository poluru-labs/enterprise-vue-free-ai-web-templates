<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Badge,
  Button,
  DateRangePicker,
  DescriptionList,
  Drawer,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import CatalogTabs from '@/components/CatalogTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findPaper, shelf, studyTitle, type PaperStanding } from '@/data/shelf'

const PAGE_SIZE = 4
const query = ref('')
const standing = ref('all')
const start = ref('2026-05-01')
const end = ref('2026-11-30')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const drawerOpen = ref(false)
const openId = ref('')

const segments = [
  { value: 'all', label: 'All' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Published', label: 'Published' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return shelf.papers.filter((paper) => {
    const standingOk = standing.value === 'all' || paper.standing === standing.value
    const inRange = paper.written >= start.value && paper.written <= end.value
    const text = `${paper.title} ${paper.author} ${studyTitle(paper.studyId)}`.toLowerCase()
    return standingOk && inRange && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})
const paper = computed(() => findPaper(openId.value))

watch([query, standing, start, end], () => {
  page.value = 1
})

function variant(value: PaperStanding) {
  return value === 'Published' ? ('success' as const) : ('warning' as const)
}

function openPaper(id: string) {
  openId.value = id
  drawerOpen.value = true
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <PageHead title="Papers" lede="Drafts and published notes." :crumbs="[BREADCRUMB_ROOT, { label: 'Papers' }]" />
  <CatalogTabs current="papers" />
  <Toolbar class="sh-tools">
    <template #start>
      <Search v-model="query" label="Find a paper" placeholder="Find a paper" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Written" />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Shelf notes" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About notes</Button>
        </template>
        <p>A draft stays on the shelf until it is published.</p>
      </Popover>
      <Tooltip content="Reload the shelf">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <SegmentedControl v-model="standing" class="sh-filters" :segments="segments" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState
    v-else-if="filtered.length === 0"
    title="No papers"
    description="Nothing on the shelf matches that search."
    icon="search"
  />
  <div v-else class="sh-shelf">
    <button v-for="item in visible" :key="item.id" type="button" class="sh-entry" @click="openPaper(item.id)">
      <span class="sh-mark">{{ item.written }}</span>
      <span>
        <strong>{{ item.title }}</strong>
        <span class="sh-quiet">{{ item.author }} · {{ studyTitle(item.studyId) }}</span>
      </span>
      <Badge :label="item.standing" :variant="variant(item.standing)" soft />
    </button>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="sh-pages" />
  </div>
  <Drawer v-model:open="drawerOpen" :heading="paper?.title ?? 'Paper'" size="md">
    <DescriptionList
      v-if="paper"
      :items="[
        { term: 'Standing', description: paper.standing },
        { term: 'Author', description: paper.author },
        { term: 'Study', description: studyTitle(paper.studyId) },
        { term: 'Written', description: paper.written },
      ]"
    />
  </Drawer>
</template>
