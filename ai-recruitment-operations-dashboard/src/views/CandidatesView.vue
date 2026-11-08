<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Avatar, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, roleTitle, type Stage } from '@/data/desk'

const router = useRouter()

function tone(stage: Stage) {
  if (stage === 'Offer') return 'success' as const
  if (stage === 'Interview') return 'info' as const
  if (stage === 'Screen') return 'warning' as const
  return 'neutral' as const
}
</script>

<template>
  <PageHead
    title="Candidates"
    lede="Everyone on an open role."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Candidates' }]"
  />
  <div class="hw-list">
    <button
      v-for="candidate in desk.candidates"
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
  </div>
</template>
