<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Autocomplete,
  Button,
  DataTable,
  DescriptionList,
  Drawer,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  SegmentedControl,
  Skeleton,
  Timeline,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findRun, processName, studio } from '@/data/studio'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const scope = ref('all')
const page = ref(1)
const open = ref(false)
const activeId = ref('')
const jump = ref('')
const helpOpen = ref(false)
const loading = ref(false)
const numbers = computed(() => studio.runs.map((run) => ({ value: run.number, label: `${run.number} ${processName(run.processId)}` })))

const segments = [
  { value: 'all', label: 'All' },
  { value: 'progress', label: 'In progress' },
  { value: 'finished', label: 'Finished' },
]

const columns = [
  { key: 'number', label: 'Number' },
  { key: 'process', label: 'Process' },
  { key: 'requester', label: 'Requester' },
  { key: 'step', label: 'Step' },
  { key: 'state', label: 'Status' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return studio.runs.filter((run) => {
    const scopeOk =
      scope.value === 'all' ||
      (scope.value === 'progress' && run.state === 'In progress') ||
      (scope.value === 'finished' && run.state === 'Finished')
    const process = processName(run.processId)
    const step = studio.processes.find((item) => item.id === run.processId)?.steps[run.stepIndex]?.label ?? ''
    const text = `${run.number} ${process} ${run.requester} ${step} ${run.state}`.toLowerCase()
    return scopeOk && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))

const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})

const rows = computed(() =>
  visible.value.map((run) => ({
    number: run.number,
    process: processName(run.processId),
    requester: run.requester,
    step: studio.processes.find((item) => item.id === run.processId)?.steps[run.stepIndex]?.label ?? '',
    state: run.state,
  })),
)

const active = computed(() => findRun(activeId.value))

const facts = computed(() => {
  const run = active.value
  if (!run) return []
  const step = studio.processes.find((item) => item.id === run.processId)?.steps[run.stepIndex]
  return [
    { term: 'Process', description: processName(run.processId) },
    { term: 'Requester', description: run.requester },
    { term: 'Step', description: step?.label ?? '' },
    { term: 'Started', description: run.started },
    { term: 'State', description: run.state },
  ]
})

watch([query, scope], () => {
  page.value = 1
})

function onJump(value: string) {
  const run = studio.runs.find((item) => item.number === value)
  if (!run) return
  activeId.value = run.id
  open.value = true
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function showRun(token: string) {
  const run = studio.runs.find((item) => item.number === token || item.requester === token)
  if (!run) return
  activeId.value = run.id
  open.value = true
}

function onTableClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const cell = target.closest('td')
  if (!cell) return
  showRun(cell.textContent?.trim() ?? '')
}
</script>

<template>
  <PageHead title="Runs" lede="In progress and finished." :crumbs="[BREADCRUMB_ROOT, { label: 'Runs' }]" />
  <Toolbar class="fw-tools">
    <template #start>
      <Search v-model="query" label="Find a run" placeholder="Find a run" />
      <SegmentedControl v-model="scope" :segments="segments" />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Run numbers" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">Run numbers</Button>
        </template>
        <p>A run number starts with FW-.</p>
      </Popover>
      <Tooltip content="Reload the list">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <Autocomplete v-model="jump" class="fw-gap" label="Jump to a number" :options="numbers" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState v-else-if="filtered.length === 0" class="fw-gap" title="No runs" description="Nothing matches that search." icon="search" />
  <template v-else>
    <div class="fw-opens">
      <Button v-for="run in visible" :key="run.id" type="button" variant="secondary" size="sm" @click="showRun(run.number)">
        {{ run.number }}
      </Button>
    </div>
    <div class="fw-table" @click="onTableClick">
      <DataTable :columns="columns" :rows="rows" compact striped />
    </div>
    <Pagination v-model:page="page" class="fw-pages" :page-count="pageCount" />
  </template>
  <Drawer v-model:open="open" :heading="active?.number ?? 'Run'" size="md">
    <p v-if="active" class="fw-quiet">{{ active.note }}</p>
    <DescriptionList :items="facts" />
    <Timeline v-if="active" :items="active.notes" />
    <template #footer>
      <Button v-if="active" type="button" @click="router.push(`${BASE_PATH}/processes/${active.processId}`)">Open process</Button>
    </template>
  </Drawer>
</template>
