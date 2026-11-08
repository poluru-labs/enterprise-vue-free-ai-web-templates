<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, EmptyState, Search, SegmentedControl, Stepper, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { candidatesFor, desk, type Stage } from '@/data/desk'

const router = useRouter()
const query = ref('')
const scope = ref('open')
const steps = STAGES.map((stage) => ({ id: stage.id, label: stage.label, description: stage.description }))
const segments = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'all', label: 'All' },
]

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return desk.roles.filter((role) => {
    const scopeOk =
      scope.value === 'all' || (scope.value === 'open' ? role.status === 'Open' : role.status === 'Closed')
    const text = `${role.title} ${role.location}`.toLowerCase()
    return scopeOk && (q.length === 0 || text.includes(q))
  })
})

function stageIndex(focus: Stage) {
  const index = STAGES.findIndex((stage) => stage.label === focus)
  return index < 0 ? 0 : index
}
</script>

<template>
  <PageHead
    title="Roles"
    lede="Open jobs and where each one sits."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Roles' }]"
  />
  <div class="hw-filters">
    <Search v-model="query" placeholder="Find a role" />
    <SegmentedControl v-model="scope" :segments="segments" />
  </div>
  <EmptyState
    v-if="visible.length === 0"
    title="No open roles"
    description="Nothing on the desk matches that search."
    icon="search"
  />
  <div v-else class="hw-pipeline">
    <article v-for="role in visible" :key="role.id" class="hw-role">
      <div>
        <h2>{{ role.title }}</h2>
        <p>
          <Tag :label="role.location" />
          <span class="hw-quiet">{{ candidatesFor(role.id).length === 1 ? '1 candidate' : `${candidatesFor(role.id).length} candidates` }}</span>
        </p>
        <Button type="button" size="sm" variant="secondary" @click="router.push(`${BASE_PATH}/roles/${role.id}`)">
          Open
        </Button>
      </div>
      <div class="hw-step">
        <Stepper :steps="steps" :active-index="stageIndex(role.focus)" />
      </div>
    </article>
  </div>
</template>
