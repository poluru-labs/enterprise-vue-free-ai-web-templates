<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Button,
  DescriptionList,
  EmptyState,
  Rating,
  Status,
  Textarea,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findCandidate, roleTitle, type Stage } from '@/data/desk'

const route = useRoute()
const router = useRouter()
const candidate = computed(() => findCandidate(String(route.params.id ?? '')))

function tone(stage: Stage) {
  if (stage === 'Offer') return 'success' as const
  if (stage === 'Interview') return 'info' as const
  if (stage === 'Screen') return 'warning' as const
  return 'neutral' as const
}
</script>

<template>
  <EmptyState v-if="!candidate" title="Candidate not found" description="That name is not on the desk." icon="search" />
  <template v-else>
    <PageHead
      :title="candidate.name"
      :lede="roleTitle(candidate.roleId)"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Candidates', to: `${BASE_PATH}/candidates` }, { label: candidate.name }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/candidates`)">Back</Button>
      </template>
    </PageHead>
    <div class="hw-profile-page">
      <div class="hw-who">
        <Avatar :name="candidate.name" size="lg" />
        <Status :label="candidate.stage" :tone="tone(candidate.stage)" />
      </div>
      <DescriptionList
        :items="[
          { term: 'Role', description: roleTitle(candidate.roleId) },
          { term: 'Stage', description: candidate.stage },
        ]"
      />
      <Rating :model-value="candidate.rating" label="Interview feedback" read-only />
      <Textarea v-model="candidate.note" label="Notes" />
      <h2>Timeline</h2>
      <Timeline :items="candidate.events" />
    </div>
  </template>
</template>
