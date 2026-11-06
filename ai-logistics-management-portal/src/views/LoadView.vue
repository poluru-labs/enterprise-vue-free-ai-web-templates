<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, DescriptionList, Status, Stepper, Timeline } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { findLoad, type LoadStatus } from '@/data/yard'

const route = useRoute()
const router = useRouter()
const load = computed(() => findLoad(String(route.params.id ?? '')))

function tone(status: LoadStatus) {
  if (status === 'Delivered') return 'success' as const
  if (status === 'Held') return 'warning' as const
  if (status === 'On dock') return 'info' as const
  return 'neutral' as const
}
</script>

<template>
  <PageHead
    v-if="load"
    :title="load.number"
    :lede="`${load.from} to ${load.to}`"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Loads', to: '/waybill/loads' }, { label: load.number }]"
  />
  <article v-if="load" class="wy-detail">
    <Stepper :steps="[...STAGES]" :active-index="load.stage" />
    <Status :label="load.status" :tone="tone(load.status)" />
    <DescriptionList
      :items="[
        { term: 'Lane', description: `${load.from} → ${load.to}` },
        { term: 'Carrier', description: load.carrier },
        { term: 'Pieces', description: `${load.pieces} of ${load.expected}` },
      ]"
    />
    <h2>Scans</h2>
    <Timeline :items="load.scans" />
    <Button type="button" variant="secondary" @click="router.push('/waybill/loads')">Back to loads</Button>
  </article>
  <p v-else class="wy-quiet">That load is not on the board.</p>
</template>
