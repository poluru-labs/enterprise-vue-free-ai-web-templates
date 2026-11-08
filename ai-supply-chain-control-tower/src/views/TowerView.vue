<script setup lang="ts">
import { computed } from 'vue'
import { DataTable, Meter, Stat, Status, Timeline } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { ordersByState, siteName, supplierName, tower } from '@/data/tower'

const late = computed(() => ordersByState('Late'))
const openCount = computed(() => ordersByState('Open').length)

const columns = [
  { key: 'number', label: 'Number' },
  { key: 'title', label: 'Order' },
  { key: 'site', label: 'Site' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'due', label: 'Due' },
  { key: 'state', label: 'Status' },
]

const rows = computed(() =>
  late.value.map((order) => ({
    number: order.number,
    title: order.title,
    site: siteName(order.siteId),
    supplier: supplierName(order.supplierId),
    due: order.due,
    state: order.state,
  })),
)

const delays = computed(() =>
  late.value.map((order) => ({
    id: order.id,
    title: `${order.number} ${order.title}`,
    description: order.delay,
    time: order.due,
  })),
)
</script>

<template>
  <PageHead title="Tower" lede="Fill rate, late orders, and open POs." :crumbs="[BREADCRUMB_ROOT, { label: 'Tower' }]" />
  <section class="sw-sheet">
    <div class="sw-stats">
      <Stat label="Fill rate" :value="`${tower.fillRate}%`" hint="On-time receipts" />
      <Stat label="Late orders" :value="String(late.length)" hint="Past the due date" />
      <Stat label="Open POs" :value="String(openCount)" hint="Still on the sheet" />
    </div>
    <div class="sw-meters">
      <Meter v-for="site in tower.sites" :key="site.id" :value="site.capacity" :max="site.max" :label="site.name" show-value />
    </div>
  </section>
  <h2 class="sw-section">Delays</h2>
  <Timeline :items="delays" />
  <div class="sw-table">
    <DataTable :columns="columns" :rows="rows" compact striped />
  </div>
  <p class="sw-quiet sw-section"><Status label="Late" tone="warning" /> {{ late.length }} orders are past due.</p>
</template>
