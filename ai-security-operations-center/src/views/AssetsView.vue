<script setup lang="ts">
import { computed, ref } from 'vue'
import { DescriptionList, EmptyState, List, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findAsset, watch as desk } from '@/data/watch'

const selected = ref('reader')

const tree = computed(() => {
  const sites = [...new Set(desk.assets.map((asset) => asset.site))]
  return sites.map((site) => {
    const networks = [...new Set(desk.assets.filter((asset) => asset.site === site).map((asset) => asset.network))]
    return {
      id: site,
      label: site,
      children: networks.map((network) => ({
        id: `${site}-${network}`,
        label: network,
        children: desk.assets
          .filter((asset) => asset.site === site && asset.network === network)
          .map((asset) => ({ id: asset.id, label: asset.name })),
      })),
    }
  })
})

const asset = computed(() => findAsset(selected.value))
const related = computed(() =>
  desk.incidents
    .filter((incident) => incident.assetId === selected.value)
    .map((incident) => ({
      id: incident.id,
      label: incident.number,
      description: `${incident.title} · ${incident.state}`,
    })),
)

function onSelect(id: string) {
  if (findAsset(id)) selected.value = id
}
</script>

<template>
  <PageHead title="Assets" lede="Sites, networks, and machines." :crumbs="[BREADCRUMB_ROOT, { label: 'Assets' }]" />
  <div class="wl-assets">
    <TreeView :nodes="tree" @select="onSelect" />
    <div v-if="asset" class="wl-record">
      <h2>{{ asset.name }}</h2>
      <DescriptionList
        :items="[
          { term: 'Site', description: asset.site },
          { term: 'Network', description: asset.network },
          { term: 'Machine', description: asset.name },
        ]"
      />
      <h2>On the queue</h2>
      <List v-if="related.length > 0" :items="related" />
      <EmptyState v-else title="No incidents" description="Nothing on the queue names this machine." icon="search" />
    </div>
  </div>
</template>
