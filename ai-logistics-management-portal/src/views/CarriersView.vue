<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Autocomplete,
  Avatar,
  DescriptionList,
  Drawer,
  EmptyState,
  Pagination,
  Rating,
  Search,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

const open = ref(false)
const query = ref('')
const picked = ref('')
const selectedId = ref('cr-5')
const page = ref(1)
const pageSize = 5

watch(query, () => {
  page.value = 1
})

const pageCount = computed(() => Math.max(1, Math.ceil(visible.value.length / pageSize)))
const pageRows = computed(() => visible.value.slice((page.value - 1) * pageSize, page.value * pageSize))

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return yard.carriers.filter((carrier) => {
    if (!term) return true
    return carrier.name.toLowerCase().includes(term) || carrier.lane.toLowerCase().includes(term)
  })
})

const selected = computed(() => yard.carriers.find((carrier) => carrier.id === selectedId.value) ?? visible.value[0])

function show(id: string) {
  selectedId.value = id
  open.value = true
}

function choose(name: string) {
  const carrier = yard.carriers.find((item) => item.name === name)
  if (!carrier) return
  show(carrier.id)
}
</script>

<template>
  <PageHead title="Carriers" lede="Who is on which lane." :crumbs="[BREADCRUMB_ROOT, { label: 'Carriers' }]" />
  <div class="wy-form">
    <Search v-model="query" placeholder="Find a carrier" />
    <Autocomplete
      v-model="picked"
      label="Jump to a name"
      :options="yard.carriers.map((carrier) => ({ value: carrier.name, label: carrier.name }))"
      @update:model-value="choose"
    />
  </div>
  <EmptyState
    v-if="visible.length === 0"
    title="No carriers match"
    description="Try another name or lane."
    icon="search"
  />
  <div v-else class="wy-board">
    <button v-for="carrier in pageRows" :key="carrier.id" type="button" class="wy-carrier" @click="show(carrier.id)">
      <Avatar :name="carrier.name" size="sm" />
      <span>
        <strong>{{ carrier.name }}</strong>
        <span>{{ carrier.lane }}</span>
      </span>
      <Rating :model-value="carrier.score" label="Score" read-only />
    </button>
  </div>
  <Pagination v-if="visible.length > pageSize" v-model:page="page" :page-count="pageCount" />
  <Drawer v-model:open="open" :heading="selected?.name ?? 'Carrier'" size="md">
    <DescriptionList
      v-if="selected"
      :items="[
        { term: 'Lane', description: selected.lane },
        { term: 'Dock', description: selected.dock },
        { term: 'Phone', description: selected.phone },
      ]"
    />
  </Drawer>
</template>
