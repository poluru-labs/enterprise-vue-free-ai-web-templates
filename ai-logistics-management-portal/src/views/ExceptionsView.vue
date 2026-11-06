<script setup lang="ts">
import { computed } from 'vue'
import { Alert, DataTable, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

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
    })),
)

const first = computed(() => rows.value[0])
</script>

<template>
  <PageHead title="Exceptions" lede="Held loads and short counts." :crumbs="[BREADCRUMB_ROOT, { label: 'Exceptions' }]" />
  <Alert v-if="first" class="wy-block" :title="`${first.number} is ${first.issue.toLowerCase()}.`">
    {{ first.lane }} · {{ first.pieces }}
  </Alert>
  <div v-if="rows.length" class="wy-table">
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
  <Status v-if="rows.length === 0" label="Clear" tone="success" />
</template>
