<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { EmptyState, Search, SegmentedControl, Status, Tag, Autocomplete } from '@poluru-labs/enterprise-design-system-vue'
import CatalogTabs from '@/components/CatalogTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, KINDS } from '@/constants/navigation'
import { shelf, type StudyStatus } from '@/data/shelf'

const router = useRouter()
const query = ref('')
const kind = ref('all')
const jump = ref('')

const segments = [
  { value: 'all', label: 'All' },
  ...KINDS.map((item) => ({ value: item, label: item })),
]
const titles = computed(() => shelf.studies.map((study) => ({ value: study.title, label: study.title })))

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return shelf.studies.filter((study) => {
    if (!shelf.holdPaused && study.status === 'Paused') return false
    const kindOk = kind.value === 'all' || study.kind === kind.value
    const text = `${study.mark} ${study.title} ${study.lead}`.toLowerCase()
    return kindOk && (q.length === 0 || text.includes(q))
  })
})

function tone(status: StudyStatus) {
  if (status === 'Open') return 'success' as const
  if (status === 'Paused') return 'warning' as const
  return 'neutral' as const
}

function openStudy(id: string) {
  router.push(`${BASE_PATH}/studies/${id}`)
}

function onJump(value: string) {
  const match = shelf.studies.find((study) => study.title === value)
  if (match) openStudy(match.id)
}
</script>

<template>
  <PageHead title="Studies" lede="Open work on the shelf." :crumbs="[BREADCRUMB_ROOT, { label: 'Studies' }]" />
  <CatalogTabs current="studies" />
  <div class="sh-filters">
    <Search v-model="query" label="Find a study" placeholder="Find a study" />
    <SegmentedControl v-model="kind" :segments="segments" />
  </div>
  <Autocomplete v-model="jump" class="sh-jump" label="Jump to a study" :options="titles" @update:model-value="onJump" />
  <EmptyState
    v-if="visible.length === 0"
    title="No studies"
    description="Nothing on the shelf matches that search."
    icon="search"
  />
  <div v-else class="sh-shelf">
    <button v-for="study in visible" :key="study.id" type="button" class="sh-entry" @click="openStudy(study.id)">
      <span class="sh-mark">{{ study.mark }}</span>
      <span>
        <strong>{{ study.title }}</strong>
        <span class="sh-quiet">{{ study.kind }} · {{ study.lead }}</span>
      </span>
      <span class="sh-entry-end">
        <Tag :label="study.kind" />
        <Status :label="study.status" :tone="tone(study.status)" />
      </span>
    </button>
  </div>
</template>
