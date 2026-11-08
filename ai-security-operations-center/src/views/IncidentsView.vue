<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Alert,
  Autocomplete,
  Badge,
  Button,
  DataTable,
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
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, SEVERITIES } from '@/constants/navigation'
import { assetName, watch as desk } from '@/data/watch'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const scope = ref('open')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const jump = ref('')
const numbers = computed(() => desk.incidents.map((incident) => ({ value: incident.number, label: `${incident.number} ${incident.title}` })))

const segments = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'all', label: 'All' },
]

const columns = [
  { key: 'number', label: 'Number' },
  { key: 'title', label: 'Incident' },
  { key: 'severity', label: 'Severity' },
  { key: 'owner', label: 'Owner' },
  { key: 'opened', label: 'Opened' },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.incidents.filter((incident) => {
    const scopeOk = scope.value === 'all' || incident.state.toLowerCase() === scope.value
    const text = `${incident.number} ${incident.title} ${incident.owner} ${assetName(incident.assetId)}`.toLowerCase()
    return scopeOk && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})

const openOnes = computed(() => desk.incidents.filter((incident) => incident.state === 'Open'))
const alertMessage = computed(() => openOnes.value.map((incident) => `${incident.number} ${incident.title}`).join('. '))

const rows = computed(() =>
  visible.value.map((incident) => ({
    number: incident.number,
    title: incident.title,
    severity: incident.severity,
    owner: incident.owner,
    opened: incident.opened,
  })),
)

watch([query, scope], () => {
  page.value = 1
})

function openIncident(number: string) {
  const incident = desk.incidents.find((item) => item.number === number || item.title === number)
  if (incident) router.push(`${BASE_PATH}/incidents/${incident.id}`)
}

function onTableClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const cell = target.closest('td')
  if (!cell) return
  openIncident(cell.textContent?.trim() ?? '')
}

function onJump(value: string) {
  const incident = desk.incidents.find((item) => item.number === value)
  if (incident) router.push(`${BASE_PATH}/incidents/${incident.id}`)
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}
</script>

<template>
  <PageHead title="Incidents" lede="Open queue, by severity." :crumbs="[BREADCRUMB_ROOT, { label: 'Incidents' }]" />
  <Alert v-if="openOnes.length > 0 && filtered.length > 0" variant="warning" title="Open" :message="alertMessage" />
  <Toolbar class="wl-tools">
    <template #start>
      <Search v-model="query" label="Find an incident" placeholder="Find an incident" />
      <SegmentedControl v-model="scope" :segments="segments" />
    </template>
    <template #end>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Severity" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About severity</Button>
        </template>
        <p>Info, Low, and High are the only labels.</p>
      </Popover>
      <Tooltip content="Reload the queue">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <Autocomplete v-model="jump" class="wl-jump" label="Jump to a number" :options="numbers" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState
    v-else-if="filtered.length === 0"
    title="Queue is clear"
    description="No incidents match that search."
    icon="search"
  />
  <template v-else>
    <div class="wl-opens">
      <Badge v-for="level in SEVERITIES" :key="level" :label="level" :variant="level === 'High' ? 'danger' : level === 'Low' ? 'warning' : 'info'" soft />
      <Button v-for="incident in visible" :key="incident.id" type="button" size="sm" variant="secondary" @click="openIncident(incident.number)">
        {{ incident.number }}
      </Button>
    </div>
    <div class="wl-table" @click="onTableClick">
      <DataTable :columns="columns" :rows="rows" compact />
    </div>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="wl-pages" />
  </template>
</template>
