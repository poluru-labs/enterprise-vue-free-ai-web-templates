<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  Autocomplete,
  Avatar,
  Button,
  DateRangePicker,
  EmptyState,
  Kbd,
  Pagination,
  Popover,
  Search,
  Skeleton,
  Status,
  Toolbar,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, PEOPLE } from '@/constants/navigation'
import { desk, roleTitle, type Stage } from '@/data/desk'

const PAGE_SIZE = 4
const router = useRouter()
const query = ref('')
const start = ref('2026-10-01')
const end = ref('2026-11-30')
const page = ref(1)
const loading = ref(false)
const helpOpen = ref(false)
const jump = ref('')

const people = PEOPLE.map((person) => ({ value: person, label: person }))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.candidates.filter((candidate) => {
    const inRange = candidate.applied >= start.value && candidate.applied <= end.value
    const text = `${candidate.name} ${roleTitle(candidate.roleId)} ${candidate.stage}`.toLowerCase()
    return inRange && (q.length === 0 || text.includes(q))
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => {
  const startAt = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(startAt, startAt + PAGE_SIZE)
})

watch([query, start, end], () => {
  page.value = 1
})

function tone(stage: Stage) {
  if (stage === 'Offer') return 'success' as const
  if (stage === 'Interview') return 'info' as const
  if (stage === 'Screen') return 'warning' as const
  return 'neutral' as const
}

function refresh() {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 400)
}

function onJump(value: string) {
  if (!PEOPLE.some((person) => person === value)) return
  const candidate = desk.candidates.find((item) => item.name === value)
  if (!candidate) return
  router.push(`${BASE_PATH}/candidates/${candidate.id}`)
}
</script>

<template>
  <PageHead
    title="Candidates"
    lede="Everyone on an open role."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Candidates' }]"
  />
  <Toolbar class="hw-filters">
    <template #start>
      <Search v-model="query" placeholder="Find a candidate" />
      <DateRangePicker v-model:start="start" v-model:end="end" label="Applied" />
    </template>
    <template #end>
      <span class="hw-quiet">{{ filtered.length }} people</span>
      <Kbd :keys="['/']" />
      <Popover v-model:open="helpOpen" heading="Stages" placement="bottom">
        <template #trigger>
          <Button type="button" variant="secondary" size="sm">About stages</Button>
        </template>
        <p>Applied, Screen, Interview, and Offer.</p>
      </Popover>
      <Tooltip content="Reload the list">
        <Button type="button" variant="secondary" size="sm" @click="refresh">Refresh</Button>
      </Tooltip>
    </template>
  </Toolbar>
  <Autocomplete v-model="jump" class="hw-jump" label="Jump to a name" :options="people" @update:model-value="onJump" />
  <Skeleton v-if="loading" variant="rectangular" width="100%" height="160px" />
  <EmptyState
    v-else-if="filtered.length === 0"
    title="No candidates match"
    description="Try another name or a wider date range."
    icon="search"
  />
  <div v-else class="hw-list">
    <button
      v-for="candidate in visible"
      :key="candidate.id"
      type="button"
      class="hw-person"
      @click="router.push(`${BASE_PATH}/candidates/${candidate.id}`)"
    >
      <Avatar :name="candidate.name" size="sm" />
      <span>
        <strong>{{ candidate.name }}</strong>
        <span class="hw-quiet">{{ roleTitle(candidate.roleId) }}</span>
      </span>
      <Status :label="candidate.stage" :tone="tone(candidate.stage)" />
    </button>
    <Pagination v-if="pageCount > 1" v-model:page="page" :page-count="pageCount" class="hw-pages" />
  </div>
</template>
