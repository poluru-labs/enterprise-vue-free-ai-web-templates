<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, DescriptionList, Divider, List, Meter, Rating } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { studio } from '@/data/studio'

const scores: Record<string, number> = {
  'Ritika Poluru': 4,
  'Sanjay Poluru': 5,
  'Vidya Poluru': 4,
}

const owners = computed(() => {
  const names = studio.processes.map((process) => process.owner)
  return [...new Set(names)].map((name) => {
    const processes = studio.processes.filter((process) => process.owner === name)
    const runs = studio.runs.filter((run) => processes.some((process) => process.id === run.processId))
    const open = runs.filter((run) => run.state === 'In progress')
    return {
      name,
      processes,
      open,
      total: runs.length,
      score: scores[name] ?? 3,
    }
  })
})
</script>

<template>
  <PageHead title="Owners" lede="Who approves each process." :crumbs="[BREADCRUMB_ROOT, { label: 'Owners' }]" />
  <template v-for="(owner, index) in owners" :key="owner.name">
    <article class="fw-owner">
      <Avatar :name="owner.name" />
      <div>
        <h2>{{ owner.name }}</h2>
        <Rating :model-value="owner.score" :max="5" read-only :label="`${owner.name} score`" />
        <DescriptionList
          :items="owner.processes.map((process) => ({ term: process.name, description: `${process.steps.length} steps` }))"
        />
        <List
          v-if="owner.open.length"
          :items="owner.open.map((run) => ({ id: run.id, label: run.number, description: run.requester }))"
        />
        <p v-else class="fw-quiet">No open runs.</p>
      </div>
      <Meter :value="owner.open.length" :max="Math.max(owner.total, 1)" label="Open runs" show-value />
    </article>
    <Divider v-if="index < owners.length - 1" />
  </template>
</template>
