<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Accordion,
  Avatar,
  Button,
  DescriptionList,
  EmptyState,
  Status,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { findSpec, type SpecStatus } from '@/data/board'

const route = useRoute()
const router = useRouter()

const spec = computed(() => findSpec(String(route.params.id ?? '')))

function tone(status: SpecStatus) {
  if (status === 'Shipped') return 'success' as const
  if (status === 'Locked') return 'info' as const
  if (status === 'In review') return 'warning' as const
  return 'neutral' as const
}
</script>

<template>
  <EmptyState
    v-if="!spec"
    title="Spec not found"
    description="That number is not on the board."
    icon="search"
  />
  <template v-else>
    <PageHead
      :title="spec.title"
      :lede="spec.number"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Roadmap', to: `${BASE_PATH}/roadmap` }, { label: spec.number }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/roadmap`)">Back to roadmap</Button>
      </template>
    </PageHead>
    <div class="sb-detail">
      <div class="sb-owner">
        <Avatar :name="spec.owner" size="lg" />
        <div>
          <strong>{{ spec.owner }}</strong>
          <p>{{ spec.area }} · {{ spec.horizon }}</p>
        </div>
        <Status :label="spec.status" :tone="tone(spec.status)" />
      </div>
      <h2>Problem</h2>
      <p class="sb-problem-copy">{{ spec.problem }}</p>
      <h2>Scope</h2>
      <Accordion :items="spec.scope" />
      <DescriptionList
        :items="[
          { term: 'Owner', description: spec.owner },
          { term: 'Area', description: spec.area },
          { term: 'Horizon', description: spec.horizon },
          { term: 'Updated', description: spec.updated },
        ]"
      />
      <h2>Notes</h2>
      <Timeline :items="spec.events" />
    </div>
  </template>
</template>
