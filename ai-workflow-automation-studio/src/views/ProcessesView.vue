<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Accordion, Alert, Badge, Button, EmptyState, List, Search, Stat, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { studio } from '@/data/studio'

const router = useRouter()
const query = ref('')
const picked = ref('time-off')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return studio.processes.filter((process) => {
    const text = `${process.name} ${process.summary} ${process.owner}`.toLowerCase()
    return q.length === 0 || text.includes(q)
  })
})

const catalog = computed(() =>
  filtered.value.map((process) => ({
    id: process.id,
    title: process.name,
    content: process.steps.map((step, index) => `${index + 1}. ${step.label}`).join(' · '),
  })),
)

const current = computed(() => filtered.value.find((process) => process.id === picked.value))

const inProgress = computed(() => studio.runs.filter((run) => run.state === 'In progress').length)
const finished = computed(() => studio.runs.filter((run) => run.state === 'Finished').length)

watch(filtered, (list) => {
  if (!list.some((process) => process.id === picked.value)) picked.value = list[0]?.id ?? ''
})

function onCatalogClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const button = target.closest('button')
  if (!button) return
  const name = button.textContent?.trim() ?? ''
  const process = filtered.value.find((item) => item.name === name)
  if (process) picked.value = process.id
}
</script>

<template>
  <PageHead
    title="Processes"
    lede="Time off, vendor setup, and laptop request."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Processes' }]"
  />
  <div class="fw-counts">
    <Stat label="Processes" :value="String(studio.processes.length)" hint="On the shelf" />
    <Stat label="In progress" :value="String(inProgress)" hint="Still with an owner" />
    <Stat label="Finished" :value="String(finished)" hint="Filed" />
  </div>
  <Alert
    v-if="inProgress > 0"
    class="fw-gap"
    variant="info"
    title="Open runs"
    :message="`${inProgress} runs are still with an owner.`"
  />
  <Search v-model="query" class="fw-gap" label="Find a process" placeholder="Find a process" />
  <EmptyState v-if="filtered.length === 0" class="fw-gap" title="No process" description="Nothing matches that search." icon="search" />
  <div v-else class="fw-library">
    <div @click="onCatalogClick">
      <Accordion :items="catalog" />
    </div>
    <section v-if="current" class="fw-folio">
      <p class="fw-kicker">
        <Tag :label="current.owner" />
        <Badge :label="`${current.steps.length} steps`" variant="brand" soft />
      </p>
      <h2>{{ current.name }}</h2>
      <p class="fw-quiet">{{ current.summary }}</p>
      <List
        :items="current.steps.map((step, index) => ({ id: step.id, label: `${index + 1}. ${step.label}`, description: step.description }))"
      />
      <Button type="button" @click="router.push(`${BASE_PATH}/processes/${current.id}`)">Open {{ current.name }}</Button>
    </section>
  </div>
</template>
