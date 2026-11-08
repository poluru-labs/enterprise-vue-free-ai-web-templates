<script setup lang="ts">
import { computed, ref } from 'vue'
import { DataTable, DescriptionList, Rating, TreeView } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { findSupplier, siteName, tower } from '@/data/tower'

const selected = ref('mill')

const tree = computed(() =>
  tower.sites.map((site) => ({
    id: site.id,
    label: site.name,
    children: tower.suppliers.filter((supplier) => supplier.siteId === site.id).map((supplier) => ({ id: supplier.id, label: supplier.name })),
  })),
)

const supplier = computed(() => findSupplier(selected.value))

const columns = [
  { key: 'name', label: 'Supplier' },
  { key: 'goods', label: 'Goods' },
  { key: 'site', label: 'Site' },
  { key: 'owner', label: 'Owner' },
  { key: 'score', label: 'Score' },
]

const rows = computed(() =>
  tower.suppliers.map((item) => ({
    name: item.name,
    goods: item.goods,
    site: siteName(item.siteId),
    owner: item.owner,
    score: item.score,
  })),
)

function onSelect(id: string) {
  if (findSupplier(id)) selected.value = id
}
</script>

<template>
  <PageHead title="Suppliers" lede="Sites, suppliers, and scores." :crumbs="[BREADCRUMB_ROOT, { label: 'Suppliers' }]" />
  <div class="sw-split">
    <TreeView :nodes="tree" @select="onSelect" />
    <div v-if="supplier" class="sw-record">
      <h2>{{ supplier.name }}</h2>
      <Rating :model-value="supplier.score" label="Score" read-only />
      <DescriptionList
        :items="[
          { term: 'Goods', description: supplier.goods },
          { term: 'Site', description: siteName(supplier.siteId) },
          { term: 'Owner', description: supplier.owner },
          { term: 'Score', description: String(supplier.score) },
        ]"
      />
    </div>
  </div>
  <div class="sw-table">
    <DataTable :columns="columns" :rows="rows" compact />
  </div>
</template>
