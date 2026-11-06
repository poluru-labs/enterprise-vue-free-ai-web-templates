<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Badge,
  Button,
  Search,
  SegmentedControl,
  Status,
  Stepper,
  Tag,
  Timeline,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { yard, type LoadStatus } from '@/data/yard'

const router = useRouter()
const query = ref('')
const scope = ref('active')
const selectedId = ref('wb-3381')

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return yard.loads.filter((load) => {
    if (scope.value === 'active' && load.status === 'Delivered') return false
    if (scope.value === 'held' && load.status !== 'Held') return false
    if (!term) return true
    return (
      load.number.toLowerCase().includes(term) ||
      load.from.toLowerCase().includes(term) ||
      load.to.toLowerCase().includes(term) ||
      load.carrier.toLowerCase().includes(term)
    )
  })
})

const selected = computed(() => {
  const current = visible.value.find((load) => load.id === selectedId.value)
  return current ?? visible.value[0] ?? null
})

function tone(status: LoadStatus) {
  if (status === 'Delivered') return 'success' as const
  if (status === 'Held') return 'warning' as const
  if (status === 'On dock') return 'info' as const
  return 'neutral' as const
}

function openLoad(id: string) {
  router.push(`/waybill/loads/${id}`)
}
</script>

<template>
  <PageHead title="Loads" lede="What is on the lanes today." :crumbs="[BREADCRUMB_ROOT, { label: 'Loads' }]" />
  <section v-if="selected" class="wy-stage">
    <p class="wy-stage-label">{{ selected.number }} · {{ selected.from }} → {{ selected.to }}</p>
    <Stepper :steps="[...STAGES]" :active-index="selected.stage" />
  </section>
  <Toolbar class="wy-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Find a load" />
      <SegmentedControl
        v-model="scope"
        :segments="[
          { value: 'active', label: 'Active' },
          { value: 'held', label: 'Held' },
          { value: 'all', label: 'All' },
        ]"
      />
    </template>
  </Toolbar>
  <div v-if="visible.length" class="wy-board">
    <button
      v-for="load in visible"
      :key="load.id"
      type="button"
      class="wy-row"
      :class="{ 'is-selected': load.id === selected?.id }"
      @click="selectedId = load.id"
    >
      <span class="wy-number">{{ load.number }}</span>
      <span>{{ load.from }} → {{ load.to }}</span>
      <Status :label="load.status" :tone="tone(load.status)" />
      <Tag :label="load.carrier" />
      <Badge :label="`${load.pieces} pcs`" variant="neutral" soft />
    </button>
  </div>
  <p v-else class="wy-quiet">No loads match.</p>
  <section v-if="selected" class="wy-scans">
    <div class="wy-scans-head">
      <h2>Scans</h2>
      <Button type="button" variant="secondary" @click="openLoad(selected.id)">Open load</Button>
    </div>
    <Timeline :items="selected.scans" />
  </section>
</template>
