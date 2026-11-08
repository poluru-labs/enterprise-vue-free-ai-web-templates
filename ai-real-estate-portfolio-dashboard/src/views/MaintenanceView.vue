<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Status } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findUnit, propertyName } from '@/data/portfolio'

const router = useRouter()
const openOrders = computed(() => book.orders.filter((order) => order.status === 'Open'))

function unitLabel(unitId: string) {
  return findUnit(unitId)?.label ?? ''
}
</script>

<template>
  <PageHead
    title="Maintenance"
    lede="Open work orders."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Maintenance' }]"
  >
    <template #actions>
      <Button type="button" @click="router.push(`${BASE_PATH}/maintenance/new`)">New work order</Button>
    </template>
  </PageHead>
  <div class="lw-orders">
    <article v-for="order in openOrders" :key="order.id" class="lw-order">
      <div>
        <strong>{{ order.number }} · {{ order.title }}</strong>
        <p class="lw-quiet">{{ propertyName(order.propertyId) }} {{ unitLabel(order.unitId) }} · {{ order.owner }}</p>
      </div>
      <Status :label="order.status" tone="warning" />
    </article>
  </div>
</template>
