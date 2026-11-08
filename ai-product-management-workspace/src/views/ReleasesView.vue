<script setup lang="ts">
import { DataTable, List, Meter } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { board, type Horizon } from '@/data/board'

function inHorizon(horizon: Horizon) {
  return board.specs.filter((spec) => spec.horizon === horizon)
}

function locked(horizon: Horizon) {
  return inHorizon(horizon).filter((spec) => spec.status === 'Locked' || spec.status === 'Shipped').length
}

const columns = [
  { key: 'number', label: 'Spec', sortable: true },
  { key: 'title', label: 'Title' },
  { key: 'horizon', label: 'Horizon' },
  { key: 'status', label: 'Status' },
]

const rows = board.specs.map((spec) => ({
  number: spec.number,
  title: spec.title,
  horizon: spec.horizon,
  status: spec.status,
}))
</script>

<template>
  <PageHead
    title="Releases"
    lede="What is dated, and how much scope is locked."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Releases' }]"
  />
  <div class="sb-stack">
    <article v-for="release in board.releases" :key="release.id" class="sb-release">
      <div>
        <h2>{{ release.name }}</h2>
        <p>{{ release.date }} · {{ release.horizon }}</p>
      </div>
      <Meter
        :value="locked(release.horizon)"
        :max="Math.max(inHorizon(release.horizon).length, 1)"
        label="Scope locked"
        show-value
      />
      <List
        :items="
          inHorizon(release.horizon).map((spec) => ({
            id: spec.id,
            label: `${spec.number} ${spec.title}`,
            description: spec.status,
          }))
        "
      />
    </article>
  </div>
  <div class="sb-sheet">
    <DataTable :columns="columns" :rows="rows" compact striped />
  </div>
</template>
