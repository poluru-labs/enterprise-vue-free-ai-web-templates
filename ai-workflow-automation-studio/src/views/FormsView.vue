<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Card, DescriptionList, Tabs, Tag, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findProcess, studio } from '@/data/studio'

const tab = ref('time-off')
const picked = ref('time-off:dates')

const tabs = studio.processes.map((process) => ({ id: process.id, label: process.name }))

const kindLabel: Record<string, string> = {
  text: 'Text',
  range: 'Dates',
  date: 'Date',
  number: 'Number',
  select: 'Choice',
  textarea: 'Note',
  file: 'File',
  choice: 'Yes or no',
}

const fields = computed(() => {
  const rows: { id: string; processId: string; process: string; step: string; label: string; kind: string }[] = []
  for (const process of studio.processes) {
    for (const step of process.steps) {
      for (const field of step.fields) {
        rows.push({
          id: `${process.id}:${field.id}`,
          processId: process.id,
          process: process.name,
          step: step.label,
          label: field.label,
          kind: kindLabel[field.kind] ?? field.kind,
        })
      }
    }
  }
  return rows
})

const tree = computed(() => {
  const process = findProcess(tab.value)
  if (!process) return []
  return process.steps.map((step) => ({
    id: step.id,
    label: step.label,
    children: step.fields.map((field) => ({ id: `${process.id}:${field.id}`, label: field.label })),
  }))
})

const field = computed(() => fields.value.find((item) => item.id === picked.value))

watch(tab, (id) => {
  const first = fields.value.find((item) => item.processId === id)
  picked.value = first?.id ?? ''
})

function onSelect(id: string) {
  if (fields.value.some((item) => item.id === id)) picked.value = id
}
</script>

<template>
  <PageHead title="Forms" lede="Fields used by the processes." :crumbs="[BREADCRUMB_ROOT, { label: 'Forms' }]" />
  <Tabs v-model="tab" class="fw-gap" :items="tabs" />
  <div class="fw-split">
    <TreeView :nodes="tree" @select="onSelect" />
    <Card v-if="field" :title="field.label" :description="field.step">
      <p class="fw-kicker">
        <Tag :label="field.kind" />
      </p>
      <DescriptionList
        :items="[
          { term: 'Process', description: field.process },
          { term: 'Step', description: field.step },
          { term: 'Kind', description: field.kind },
        ]"
      />
    </Card>
  </div>
</template>
