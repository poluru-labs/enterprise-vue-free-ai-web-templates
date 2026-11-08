<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Autocomplete,
  Badge,
  Button,
  DateRangePicker,
  Drawer,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Stat,
  Tag,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { AREAS, BASE_PATH, BREADCRUMB_ROOT, PEOPLE } from '@/constants/navigation'
import { board, type SpecStatus } from '@/data/board'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const area = ref('all')
const start = ref('2026-09-01')
const end = ref('2026-11-30')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const jump = ref('')
const drawerOpen = ref(false)
const owner = ref('')

const segments = [
  { value: 'all', label: 'All' },
  ...AREAS.map((item) => ({ value: item, label: item })),
]
const people = PEOPLE.map((item) => ({ value: item, label: item }))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return board.specs.filter((spec) => {
    const areaOk = area.value === 'all' || spec.area === area.value
    const inRange = spec.updated >= start.value && spec.updated <= end.value
    const text = `${spec.number} ${spec.title} ${spec.owner} ${spec.problem}`.toLowerCase()
    return areaOk && inRange && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})
const inReview = computed(() => board.specs.filter((spec) => spec.status === 'In review').length)
const owned = computed(() => board.specs.filter((spec) => spec.owner === owner.value))

watch([query, area, start, end], () => {
  page.value = 1
})

function variant(status: SpecStatus) {
  if (status === 'Shipped') return 'success' as const
  if (status === 'Locked') return 'info' as const
  if (status === 'In review') return 'warning' as const
  return 'neutral' as const
}

function openSpec(id: string) {
  router.push(`${BASE_PATH}/specs/${id}`)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function onJump(value: string) {
  if (!PEOPLE.some((person) => person === value)) return
  owner.value = value
  drawerOpen.value = true
}
</script>

<template>
  <PageHead
    title="Specs"
    lede="Every spec on the workplace desk."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Specs' }]"
  >
    <template #actions>
      <Button type="button" @click="router.push(`${BASE_PATH}/specs/new`)">New spec</Button>
    </template>
  </PageHead>
  <Stat class="sb-stat" label="In review" :value="String(inReview)" hint="Waiting on an owner" />
  <Toolbar class="sb-tools">
    <template #start>
      <Search v-model="query" placeholder="Find a spec" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Updated" />
      <SegmentedControl v-model="area" :segments="segments" />
    </template>
    <template #end>
      <span class="sb-quiet">{{ filtered.length }} specs</span>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Areas" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About areas</Button>
        </template>
        <p>Notifications, Audit, and Access are the only product areas.</p>
      </Popover>
      <Tooltip content="Reload the list">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <Autocomplete
    v-model="jump"
    class="sb-jump"
    label="Jump to an owner"
    :options="people"
    @update:model-value="onJump"
  />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="180px" />
  <EmptyState
    v-else-if="filtered.length === 0"
    title="No specs match"
    description="Try another area or a shorter date range."
    icon="search"
  />
  <div v-else class="sb-index">
    <button v-for="spec in visible" :key="spec.id" type="button" class="sb-row" @click="openSpec(spec.id)">
      <span>{{ spec.number }}</span>
      <span>
        <strong>{{ spec.title }}</strong>
        <span class="sb-quiet">{{ spec.owner }}</span>
      </span>
      <Tag :label="spec.horizon" />
      <Badge :label="spec.status" :variant="variant(spec.status)" soft />
    </button>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="sb-pages" />
  </div>
  <Drawer v-model:open="drawerOpen" :heading="owner || 'Owner'" size="md">
    <button v-for="spec in owned" :key="spec.id" type="button" class="sb-row" @click="openSpec(spec.id)">
      <span>{{ spec.number }}</span>
      <span>
        <strong>{{ spec.title }}</strong>
        <span class="sb-quiet">{{ spec.area }}</span>
      </span>
    </button>
  </Drawer>
</template>
