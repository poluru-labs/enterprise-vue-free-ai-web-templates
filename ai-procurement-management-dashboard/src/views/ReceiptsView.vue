<script setup lang="ts">
import { computed } from 'vue'
import { Button, EmptyState, Meter, Timeline } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findOrder, supplierName } from '@/data/ledger'

const arriving = computed(() => book.orders.filter((order) => order.stage === 'Ordered' || order.stage === 'Received'))

function orderedQty(id: string) {
  const order = findOrder(id)
  if (!order) return 0
  return order.lines.reduce((sum, line) => sum + line.qty, 0)
}

function receivedQty(id: string) {
  const order = findOrder(id)
  if (!order) return 0
  return order.lines.reduce((sum, line) => sum + line.received, 0)
}

function logCarton(id: string) {
  const order = findOrder(id)
  if (!order) return
  const line = order.lines.find((item) => item.received < item.qty)
  if (!line) return
  line.received += 1
  const done = order.lines.every((item) => item.received >= item.qty)
  if (done) order.stage = 'Received'
  order.events.unshift({
    id: `rc-${order.id}-${line.received}`,
    title: done ? 'Received' : 'Carton in',
    description: done ? `${order.number} is complete.` : `${line.name} · ${line.received} of ${line.qty}.`,
    time: 'Today',
  })
}
</script>

<template>
  <PageHead
    title="Receipts"
    lede="What has arrived against the order."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Receipts' }]"
  />
  <EmptyState
    v-if="arriving.length === 0"
    title="Nothing on the dock"
    description="Ordered purchases show up here."
    icon="search"
  />
  <div v-else class="pw-stack">
    <article v-for="order in arriving" :key="order.id" class="pw-receipt">
      <div>
        <strong>{{ order.number }} · {{ order.title }}</strong>
        <p class="pw-quiet">{{ supplierName(order.supplierId) }} · {{ order.site }}</p>
        <Meter
          :value="receivedQty(order.id)"
          :max="orderedQty(order.id)"
          :label="`${receivedQty(order.id)} of ${orderedQty(order.id)}`"
          show-value
        />
        <Timeline :items="order.events" />
      </div>
      <Button type="button" :disabled="receivedQty(order.id) >= orderedQty(order.id)" @click="logCarton(order.id)">
        Log a carton
      </Button>
    </article>
  </div>
</template>
