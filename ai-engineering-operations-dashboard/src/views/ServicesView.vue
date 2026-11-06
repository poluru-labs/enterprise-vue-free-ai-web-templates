<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  DataTable,
  Link,
  Pagination,
  Search,
  SegmentedControl,
  Select,
  Status,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, type ServiceStatus } from '@/data/desk'
import { serviceTone } from '@/utils/status'

const router = useRouter()
const query = ref('')
const status = ref('all')
const region = ref('all')
const page = ref(1)
const pageSize = 4

const regionOptions = [
  { value: 'all', label: 'All regions' },
  { value: 'us-east', label: 'us-east' },
  { value: 'us-west', label: 'us-west' },
  { value: 'eu-central', label: 'eu-central' },
]

const filtered = computed(() =>
  desk.services.filter((item) => {
    const haystack = `${item.name} ${item.owner}`.toLowerCase()
    const matchesQuery = haystack.includes(query.value.trim().toLowerCase())
    const matchesStatus = status.value === 'all' || item.status === status.value
    const matchesRegion = region.value === 'all' || item.region === region.value
    return matchesQuery && matchesStatus && matchesRegion
  }),
)

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const rows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize).map((item) => ({
    service: item.name,
    owner: item.owner,
    status: item.status,
    uptime: `${item.uptime.toFixed(1)}%`,
    region: item.region,
  }))
})
const pageItems = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

watch([query, status, region], () => {
  page.value = 1
})

function tone(value: string) {
  return serviceTone(value as ServiceStatus)
}
</script>

<template>
  <PageHead title="Services" :crumbs="[BREADCRUMB_ROOT, { label: 'Services' }]" />

  <Toolbar class="nl-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Search service or owner" clearable />
      <Select v-model="region" label="Region" :options="regionOptions" />
    </template>
    <template #end>
      <SegmentedControl
        v-model="status"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'Healthy', label: 'Healthy' },
          { value: 'Degraded', label: 'Degraded' },
          { value: 'Paused', label: 'Paused' },
        ]"
      />
    </template>
  </Toolbar>

  <p v-if="!filtered.length" class="nl-muted">No services match.</p>

  <section v-else class="nl-panel">
    <DataTable
      compact
      striped
      :columns="[
        { key: 'service', label: 'Service', sortable: true },
        { key: 'owner', label: 'Owner', sortable: true },
        { key: 'status', label: 'Status' },
        { key: 'uptime', label: 'Uptime' },
        { key: 'region', label: 'Region' },
      ]"
      :rows="rows"
    />
    <div class="nl-status-row">
      <Status v-for="item in pageItems" :key="item.id" :label="`${item.status}`" :tone="tone(item.status)" dot />
      <Tag v-for="item in pageItems" :key="`${item.id}-region`" :label="item.region" />
    </div>
    <div class="nl-link-row">
      <span v-for="item in pageItems" :key="`${item.id}-link`" @click.capture="router.push(`${BASE_PATH}/services/${item.id}`); $event.preventDefault()">
        <Link :href="`${BASE_PATH}/services/${item.id}`">{{ item.name }}</Link>
      </span>
    </div>
    <div class="nl-pager">
      <Pagination v-model:page="page" :page-count="pageCount" />
    </div>
  </section>
</template>
