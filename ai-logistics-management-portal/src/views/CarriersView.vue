<script setup lang="ts">
import { computed, ref } from 'vue'
import { Avatar, DescriptionList, Drawer, Rating } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

const open = ref(false)
const selectedId = ref('cr-5')
const selected = computed(() => yard.carriers.find((carrier) => carrier.id === selectedId.value) ?? yard.carriers[0])

function show(id: string) {
  selectedId.value = id
  open.value = true
}
</script>

<template>
  <PageHead title="Carriers" lede="Who is on which lane." :crumbs="[BREADCRUMB_ROOT, { label: 'Carriers' }]" />
  <div class="wy-board">
    <button v-for="carrier in yard.carriers" :key="carrier.id" type="button" class="wy-carrier" @click="show(carrier.id)">
      <Avatar :name="carrier.name" size="sm" />
      <span>
        <strong>{{ carrier.name }}</strong>
        <span>{{ carrier.lane }}</span>
      </span>
      <Rating :model-value="carrier.score" label="Score" read-only />
    </button>
  </div>
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
