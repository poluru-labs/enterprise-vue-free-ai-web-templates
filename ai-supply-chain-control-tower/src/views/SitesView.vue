<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge, DescriptionList, Drawer, List, Meter, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { tower } from '@/data/tower'

const openId = ref('')
const drawerOpen = ref(false)
const rows = computed(() =>
  tower.sites.map((site) => ({
    ...site,
    orders: tower.orders.filter((order) => order.siteId === site.id && order.state !== 'Draft').length,
  })),
)
const siteOrders = computed(() =>
  tower.orders
    .filter((order) => order.siteId === openId.value)
    .map((order) => ({ id: order.id, label: order.number, description: `${order.title} · ${order.state}` })),
)
const openSite = computed(() => tower.sites.find((site) => site.id === openId.value))

function openSiteDrawer(id: string) {
  openId.value = id
  drawerOpen.value = true
}
</script>

<template>
  <PageHead title="Sites" lede="Three warehouses and how full they are." :crumbs="[BREADCRUMB_ROOT, { label: 'Sites' }]" />
  <div class="sw-sites">
    <article v-for="site in rows" :key="site.id" class="sw-site">
      <div>
        <h2>
          <button type="button" class="sw-site-name" @click="openSiteDrawer(site.id)">{{ site.name }}</button>
        </h2>
        <Tag :label="site.city" />
        <Badge :label="`${site.orders} orders`" variant="neutral" soft />
        <DescriptionList
          :items="[
            { term: 'Lead', description: site.lead },
            { term: 'Orders', description: String(site.orders) },
          ]"
        />
      </div>
      <Meter :value="site.capacity" :max="site.max" :label="`${site.name} capacity`" show-value />
    </article>
  </div>
  <Drawer v-model:open="drawerOpen" :heading="openSite?.name ?? 'Site'" size="sm">
    <List v-if="siteOrders.length > 0" :items="siteOrders" />
    <p v-else class="sw-quiet">No orders at this site.</p>
  </Drawer>
</template>
