<script setup lang="ts">
import { computed, ref } from 'vue'
import { DataTable, Search, Status, Toolbar } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { desk } from '@/data/board'

const query = ref('')

const rows = computed(() =>
  desk.supplies
    .filter((item) => `${item.item} ${item.unit}`.toLowerCase().includes(query.value.trim().toLowerCase()))
    .map((item) => ({
      item: item.item,
      unit: item.unit,
      onHand: item.onHand,
      par: item.par,
      level: item.onHand * 2 < item.par ? 'Low' : 'Steady',
    })),
)
</script>

<template>
  <PageHead
    title="Supplies"
    lede="Carts that are under par."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Supplies' }]"
  />

  <Toolbar class="wl-toolbar">
    <template #start>
      <Search v-model="query" placeholder="Search an item or unit" clearable />
    </template>
  </Toolbar>

  <div class="wl-table">
    <DataTable
      compact
      striped
      :columns="[
        { key: 'item', label: 'Item', sortable: true },
        { key: 'unit', label: 'Unit' },
        { key: 'onHand', label: 'On hand' },
        { key: 'par', label: 'Par' },
        { key: 'level', label: 'Level' },
      ]"
      :rows="rows"
    />
  </div>

  <div class="wl-pills">
    <Status
      v-for="row in rows.filter((item) => item.level === 'Low')"
      :key="row.item"
      :label="`${row.item} low`"
      tone="warning"
    />
  </div>
</template>
