<script setup lang="ts">
import { Meter } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { yard } from '@/data/yard'
</script>

<template>
  <PageHead title="Hubs" lede="Doors and how full each site is." :crumbs="[BREADCRUMB_ROOT, { label: 'Hubs' }]" />
  <div class="wy-hubs">
    <article v-for="hub in yard.hubs" :key="hub.id" class="wy-hub">
      <div>
        <h2>{{ hub.city }}</h2>
        <p>{{ hub.lead }} · {{ hub.doors }} doors</p>
      </div>
      <Meter :value="hub.used" :max="hub.capacity" :label="`${hub.used} of ${hub.capacity}`" show-value />
    </article>
  </div>
</template>
