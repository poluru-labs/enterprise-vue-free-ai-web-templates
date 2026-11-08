<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Alert, Button, Modal, Status, Timeline, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findUnit, propertyName } from '@/data/portfolio'

const router = useRouter()
const pendingId = ref('')
const openOrders = computed(() => book.orders.filter((order) => order.status === 'Open'))
const pending = computed(() => book.orders.find((order) => order.id === pendingId.value))

function unitLabel(unitId: string) {
  return findUnit(unitId)?.label ?? ''
}

function closeOrder() {
  const order = pending.value
  if (!order) return
  order.status = 'Closed'
  order.events.unshift({
    id: `${order.id}-closed`,
    title: 'Closed',
    description: 'Anil Poluru closed the order.',
    time: 'Today',
  })
  pendingId.value = ''
  showToast({ title: 'Closed', description: `${order.number} is closed.`, variant: 'success' })
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
  <Alert
    v-if="openOrders.length"
    :title="`${openOrders.length} open`"
    description="Close an order when the work is done."
  />
  <div class="lw-orders">
    <article v-for="order in openOrders" :key="order.id" class="lw-order">
      <div>
        <strong>{{ order.number }} · {{ order.title }}</strong>
        <p class="lw-quiet">{{ propertyName(order.propertyId) }} {{ unitLabel(order.unitId) }} · {{ order.owner }}</p>
        <Timeline :items="order.events" />
      </div>
      <div class="lw-order-side">
        <Status :label="order.status" tone="warning" />
        <Button type="button" variant="secondary" size="sm" @click="pendingId = order.id">Close</Button>
      </div>
    </article>
  </div>
  <Modal :open="Boolean(pending)" heading="Close this order" @update:open="pendingId = $event ? pendingId : ''">
    <p v-if="pending">{{ pending.number }} moves to Closed.</p>
    <template #footer>
      <Button type="button" variant="secondary" @click="pendingId = ''">Cancel</Button>
      <Button type="button" @click="closeOrder">Close order</Button>
    </template>
  </Modal>
</template>
