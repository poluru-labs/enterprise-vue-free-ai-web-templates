<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, DataTable, EmptyState, SegmentedControl, Stepper } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { candidatesFor, desk, findRole } from '@/data/desk'

const route = useRoute()
const router = useRouter()
const stage = ref('all')

const role = computed(() => findRole(String(route.params.id ?? '')))
const steps = STAGES.map((item) => ({ id: item.id, label: item.label, description: item.description }))
const segments = [{ value: 'all', label: 'All' }, ...STAGES.map((item) => ({ value: item.label, label: item.label }))]

const people = computed(() => {
  if (!role.value) return []
  return candidatesFor(role.value.id).filter((candidate) => stage.value === 'all' || candidate.stage === stage.value)
})

const focusIndex = computed(() => {
  const index = STAGES.findIndex((item) => item.label === role.value?.focus)
  return index < 0 ? 0 : index
})

const columns = [
  { key: 'name', label: 'Candidate', sortable: true },
  { key: 'stage', label: 'Stage' },
  { key: 'rating', label: 'Rating' },
]

const rows = computed(() =>
  people.value.map((candidate) => ({
    name: candidate.name,
    stage: candidate.stage,
    rating: candidate.rating || '—',
  })),
)

function openCandidate(id: string) {
  router.push(`${BASE_PATH}/candidates/${id}`)
}

function onSheetClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const cell = target.closest('td')
  const text = cell?.textContent?.trim() ?? ''
  const candidate = desk.candidates.find((item) => item.name === text)
  if (!candidate) return
  openCandidate(candidate.id)
}
</script>

<template>
  <EmptyState v-if="!role" title="Role not found" description="That job is not on the desk." icon="search" />
  <template v-else>
    <PageHead
      :title="role.title"
      :lede="role.location"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Roles', to: `${BASE_PATH}/roles` }, { label: role.title }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/roles`)">Back to roles</Button>
      </template>
    </PageHead>
    <div class="hw-detail">
      <div class="hw-step">
        <Stepper :steps="steps" :active-index="focusIndex" />
      </div>
      <SegmentedControl v-model="stage" :segments="segments" />
      <div class="hw-opens">
        <Button v-for="candidate in people" :key="candidate.id" type="button" size="sm" variant="secondary" @click="openCandidate(candidate.id)">
          {{ candidate.name }}
        </Button>
      </div>
      <EmptyState
        v-if="people.length === 0"
        title="No candidates"
        description="Nobody is in this stage."
        icon="search"
      />
      <div v-else class="hw-table" @click="onSheetClick">
        <DataTable :columns="columns" :rows="rows" compact striped />
      </div>
    </div>
  </template>
</template>
