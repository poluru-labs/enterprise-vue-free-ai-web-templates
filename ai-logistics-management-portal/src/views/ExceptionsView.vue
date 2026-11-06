<script setup lang="ts">
import { computed, ref } from 'vue'
import { Accordion, Alert, DataTable, EmptyState, Tabs } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

const tab = ref('all')

const rows = computed(() =>
  yard.loads
    .filter((load) => load.status === 'Held' || load.pieces < load.expected)
    .map((load) => ({
      id: load.id,
      number: load.number,
      lane: `${load.from} → ${load.to}`,
      issue: load.pieces < load.expected ? 'Short' : 'Delayed',
      pieces: `${load.pieces} of ${load.expected}`,
      carrier: load.carrier,
    }))
    .filter((row) => {
      if (tab.value === 'short') return row.issue === 'Short'
      if (tab.value === 'delayed') return row.issue === 'Delayed'
      return true
    }),
)

const first = computed(() => rows.value[0])

const notes = computed(() =>
  rows.value.map((row) => ({
    id: row.id,
    title: `${row.number} · ${row.issue}`,
    content: `${row.lane}. ${row.carrier}. ${row.pieces}.`,
  })),
)
</script>

<template>
  <PageHead title="Exceptions" lede="Held loads and short counts." :crumbs="[BREADCRUMB_ROOT, { label: 'Exceptions' }]" />
  <Tabs
    v-model="tab"
    class="wy-block"
    :items="[
      { id: 'all', label: 'All' },
      { id: 'delayed', label: 'Delayed' },
      { id: 'short', label: 'Short' },
    ]"
  />
  <Alert v-if="first" class="wy-block" :title="`${first.number} is ${first.issue.toLowerCase()}.`">
    {{ first.lane }} · {{ first.pieces }}
  </Alert>
  <EmptyState
    v-if="rows.length === 0"
    title="No exceptions"
    description="Held and short loads show up here."
    icon="search"
  />
  <template v-else>
    <div class="wy-table">
      <DataTable
        :columns="[
          { key: 'number', label: 'Load' },
          { key: 'lane', label: 'Lane' },
          { key: 'issue', label: 'Issue' },
          { key: 'pieces', label: 'Pieces' },
          { key: 'carrier', label: 'Carrier' },
        ]"
        :rows="rows"
        compact
      />
    </div>
    <h2 class="wy-subhead">Notes</h2>
    <Accordion :items="notes" />
  </template>
</template>
