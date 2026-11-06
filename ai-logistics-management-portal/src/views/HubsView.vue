<script setup lang="ts">
import { ref } from 'vue'
import { DateRangePicker, List, Meter } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'

const start = ref('2026-11-01')
const end = ref('2026-11-30')
</script>

<template>
  <PageHead title="Hubs" lede="Doors and how full each site is." :crumbs="[BREADCRUMB_ROOT, { label: 'Hubs' }]" />
  <div class="wy-form">
    <DateRangePicker v-model:start="start" v-model:end="end" />
  </div>
  <div class="wy-hubs">
    <article v-for="hub in yard.hubs" :key="hub.id" class="wy-hub">
      <div>
        <h2>{{ hub.city }}</h2>
        <p>{{ hub.lead }} · {{ hub.doors }} doors</p>
      </div>
      <Meter :value="hub.used" :max="hub.capacity" :label="`${hub.used} of ${hub.capacity}`" show-value />
    </article>
  </div>
  <h2 class="wy-subhead">Leads</h2>
  <List
    :items="
      yard.hubs.map((hub) => ({
        id: hub.id,
        label: hub.city,
        description: `${hub.lead} · ${hub.doors} doors`,
      }))
    "
  />
</template>
