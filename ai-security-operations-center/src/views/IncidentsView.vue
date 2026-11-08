<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Alert, Button, DataTable, Pagination, Search, SegmentedControl, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, SEVERITIES } from '@/constants/navigation'
import { assetName, watch as desk, type Severity } from '@/data/watch'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const scope = ref('open')
const page = ref(1)

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

function tone(severity: Severity) {
  if (severity === 'High') return 'danger' as const
  if (severity === 'Low') return 'warning' as const
  return 'info' as const
}

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
</script>

<template>
  <PageHead title="Incidents" lede="Open queue, by severity." :crumbs="[BREADCRUMB_ROOT, { label: 'Incidents' }]" />
  <Alert v-if="openOnes.length > 0" variant="warning" title="Open" :message="alertMessage" />
  <div class="wl-filters">
    <Search v-model="query" label="Find an incident" placeholder="Find an incident" />
    <SegmentedControl v-model="scope" :segments="segments" />
  </div>
  <div class="wl-opens">
    <Status v-for="level in SEVERITIES" :key="level" :label="level" :tone="tone(level)" />
    <Button v-for="incident in visible" :key="incident.id" type="button" size="sm" variant="secondary" @click="openIncident(incident.number)">
      {{ incident.number }}
    </Button>
  </div>
  <div class="wl-table" @click="onTableClick">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
  <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="wl-pages" />
</template>
