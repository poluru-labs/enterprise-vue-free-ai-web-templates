<script setup lang="ts">
import { computed } from 'vue'
import { DescriptionList, Meter, Tag } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { tower } from '@/data/tower'

const rows = computed(() =>
  tower.sites.map((site) => ({
    ...site,
    orders: tower.orders.filter((order) => order.siteId === site.id && order.state !== 'Draft').length,
  })),
)
</script>

<template>
  <PageHead title="Sites" lede="Three warehouses and how full they are." :crumbs="[BREADCRUMB_ROOT, { label: 'Sites' }]" />
  <div class="sw-sites">
    <article v-for="site in rows" :key="site.id" class="sw-site">
      <div>
        <h2>{{ site.name }}</h2>
        <Tag :label="site.city" />
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
</template>
