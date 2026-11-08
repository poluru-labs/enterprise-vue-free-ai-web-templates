<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Tabs } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk, findCandidate, roleTitle } from '@/data/desk'

const router = useRouter()
const when = ref('Today')
const tabs = [
  { id: 'Today', label: 'Today' },
  { id: 'This week', label: 'This week' },
]

const visible = computed(() => desk.interviews.filter((item) => item.when === when.value))

function nameOf(id: string) {
  return findCandidate(id)?.name ?? 'Candidate'
}

function roleOf(id: string) {
  const candidate = findCandidate(id)
  return candidate ? roleTitle(candidate.roleId) : ''
}
</script>

<template>
  <PageHead
    title="Interviews"
    lede="Today and the rest of the week."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Interviews' }]"
  />
  <Tabs v-model="when" :items="tabs" class="hw-tabs" />
  <div class="hw-list">
    <button
      v-for="item in visible"
      :key="item.id"
      type="button"
      class="hw-person"
      @click="router.push(`${BASE_PATH}/candidates/${item.candidateId}`)"
    >
      <strong>{{ item.time }}</strong>
      <span>
        <strong>{{ nameOf(item.candidateId) }}</strong>
        <span class="hw-quiet">{{ roleOf(item.candidateId) }} · {{ item.day }}</span>
      </span>
    </button>
  </div>
</template>
