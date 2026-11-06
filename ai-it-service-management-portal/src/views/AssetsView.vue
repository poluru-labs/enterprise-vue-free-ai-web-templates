<script setup lang="ts">
import { computed } from 'vue'
import { DataTable } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/desk'

const rows = computed(() =>
  desk.assets.map((asset) => ({
    name: asset.name,
    kind: asset.kind,
    holder: asset.holder,
    state: asset.state,
  })),
)
</script>

<template>
  <PageHead
    title="Assets"
    lede="Laptops and seats assigned on the desk."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Assets' }]"
  />

  <div class="dk-table-wrap">
    <DataTable
      compact
      striped
      :columns="[
        { key: 'name', label: 'Asset', sortable: true },
        { key: 'kind', label: 'Kind' },
        { key: 'holder', label: 'Holder' },
        { key: 'state', label: 'State' },
      ]"
      :rows="rows"
    />
  </div>
</template>
