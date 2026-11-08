<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, DescriptionList, Divider, EmptyState, Search, SegmentedControl, Status } from '@poluru-labs/enterprise-design-system-vue'
import CatalogTabs from '@/components/CatalogTabs.vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { shelf, studyTitle, type GrantStanding } from '@/data/shelf'

const router = useRouter()
const query = ref('')
const standing = ref('all')

const segments = [
  { value: 'all', label: 'All' },
  { value: 'Open', label: 'Open' },
  { value: 'Closed', label: 'Closed' },
]

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return shelf.grants.filter((grant) => {
    const standingOk = standing.value === 'all' || grant.status === standing.value
    const text = `${grant.mark} ${studyTitle(grant.studyId)} ${grant.owner}`.toLowerCase()
    return standingOk && (q.length === 0 || text.includes(q))
  })
})

function tone(status: GrantStanding) {
  return status === 'Open' ? ('success' as const) : ('neutral' as const)
}
</script>

<template>
  <PageHead title="Grants" lede="Amounts, deadlines, and owners." :crumbs="[BREADCRUMB_ROOT, { label: 'Grants' }]" />
  <CatalogTabs current="grants" />
  <div class="sh-filters">
    <Search v-model="query" label="Find a grant" placeholder="Find a grant" />
    <SegmentedControl v-model="standing" :segments="segments" />
  </div>
  <EmptyState
    v-if="visible.length === 0"
    title="No grants"
    description="Nothing on the shelf matches that search."
    icon="search"
  />
  <div v-else class="sh-grants">
    <article v-for="(grant, index) in visible" :key="grant.id" class="sh-grant">
      <Divider v-if="index > 0" />
      <div class="sh-grant-head">
        <h2>{{ grant.mark }}</h2>
        <Status :label="grant.status" :tone="tone(grant.status)" />
      </div>
      <DescriptionList
        :items="[
          { term: 'Study', description: studyTitle(grant.studyId) },
          { term: 'Amount', description: grant.amount },
          { term: 'Deadline', description: grant.deadline },
          { term: 'Owner', description: grant.owner },
        ]"
      />
      <Button type="button" variant="secondary" size="sm" @click="router.push(`${BASE_PATH}/studies/${grant.studyId}`)">
        Open study
      </Button>
    </article>
  </div>
</template>
