<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Button,
  DateRangePicker,
  DescriptionList,
  Drawer,
  Pagination,
  Search,
  SegmentedControl,
  Status,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { markAccessDone, watch as desk, type AccessState } from '@/data/watch'

const PAGE_SIZE = 3
const query = ref('')
const scope = ref('waiting')
const start = ref('2026-09-01')
const end = ref('2026-12-31')
const page = ref(1)
const openId = ref('')
const drawerOpen = ref(false)

const segments = [
  { value: 'waiting', label: 'Waiting' },
  { value: 'done', label: 'Done' },
  { value: 'all', label: 'All' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.access.filter((request) => {
    const scopeOk = scope.value === 'all' || request.state.toLowerCase() === scope.value
    const dated = request.due >= start.value && request.due <= end.value
    const text = `${request.number} ${request.subject} ${request.owner}`.toLowerCase()
    return scopeOk && dated && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})
const request = computed(() => desk.access.find((item) => item.id === openId.value))

watch([query, scope, start, end], () => {
  page.value = 1
})

function tone(state: AccessState) {
  return state === 'Done' ? ('success' as const) : ('warning' as const)
}

function openRequest(id: string) {
  openId.value = id
  drawerOpen.value = true
}

function finish() {
  const current = request.value
  if (!current) return
  markAccessDone(current.id)
  showToast({ title: 'Review filed', description: `${current.number} is done.`, variant: 'success' })
}
</script>

<template>
  <PageHead title="Access" lede="Reviews waiting on an owner." :crumbs="[BREADCRUMB_ROOT, { label: 'Access' }]" />
  <Toolbar class="wl-tools">
    <template #start>
      <Search v-model="query" label="Find a review" placeholder="Find a review" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Due" />
    </template>
  </Toolbar>
  <SegmentedControl v-model="scope" class="wl-filters" :segments="segments" />
  <div class="wl-schedule">
    <button v-for="item in visible" :key="item.id" type="button" class="wl-change" @click="openRequest(item.id)">
      <span>{{ item.due }}</span>
      <span>
        <strong>{{ item.subject }}</strong>
        <span class="wl-quiet">{{ item.number }} · {{ item.owner }}</span>
      </span>
      <Status :label="item.state" :tone="tone(item.state)" />
    </button>
  </div>
  <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="wl-pages" />
  <Drawer v-model:open="drawerOpen" :heading="request?.number ?? 'Review'" size="md">
    <DescriptionList
      v-if="request"
      :items="[
        { term: 'Subject', description: request.subject },
        { term: 'Owner', description: request.owner },
        { term: 'Due', description: request.due },
        { term: 'State', description: request.state },
      ]"
    />
    <Button v-if="request && request.state === 'Waiting'" type="button" class="wl-tools" @click="finish">Mark done</Button>
  </Drawer>
</template>
