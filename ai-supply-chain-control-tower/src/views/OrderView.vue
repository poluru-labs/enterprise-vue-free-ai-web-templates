<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, ButtonGroup, DescriptionList, EmptyState, FileUpload, List, Modal, Status, Stepper, Timeline, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, ORDER_STEPS } from '@/constants/navigation'
import { findOrder, receiveOrder, siteName, supplierName, type OrderState } from '@/data/tower'

const route = useRoute()
const router = useRouter()
const confirmOpen = ref(false)
const order = computed(() => findOrder(String(route.params.id ?? '')))

const lines = computed(() =>
  (order.value?.lines ?? []).map((line) => ({
    id: line.id,
    label: line.item,
    description: `${line.qty} ${line.unit}`,
  })),
)

const log = computed(() => {
  const current = order.value
  if (!current) return []
  const items = [{ id: 'placed', title: 'Placed', description: `${current.number} is on the sheet.`, time: current.due }]
  if (current.delay) items.push({ id: 'delay', title: 'Delay', description: current.delay, time: current.due })
  if (current.state === 'Received') items.push({ id: 'dock', title: 'Received', description: 'Signed on the dock.', time: current.due })
  return items
})

function tone(state: OrderState) {
  if (state === 'Late') return 'warning' as const
  if (state === 'Received') return 'success' as const
  if (state === 'Draft') return 'neutral' as const
  return 'info' as const
}

function markReceived() {
  const current = order.value
  if (!current) return
  receiveOrder(current.id)
  confirmOpen.value = false
  showToast({ title: 'Received', description: `${current.number} is on the dock.`, variant: 'success' })
}

function onFile() {
  showToast({ title: 'Receipt filed', description: 'The file is on the order.', variant: 'success' })
}
</script>

<template>
  <PageHead
    v-if="order"
    :title="order.title"
    :lede="order.number"
    :crumbs="[BREADCRUMB_ROOT, { label: 'Orders', to: `${BASE_PATH}/orders` }, { label: order.number }]"
  >
    <template #actions>
      <Status :label="order.state" :tone="tone(order.state)" />
      <ButtonGroup>
        <Button v-if="order.state === 'Open' || order.state === 'Late'" type="button" @click="confirmOpen = true">Mark received</Button>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/orders`)">Back to orders</Button>
      </ButtonGroup>
    </template>
  </PageHead>
  <div v-if="order" class="sw-record">
    <DescriptionList
      :items="[
        { term: 'Site', description: siteName(order.siteId) },
        { term: 'Supplier', description: supplierName(order.supplierId) },
        { term: 'Carrier', description: order.carrier },
        { term: 'Owner', description: order.owner },
        { term: 'Due', description: order.due },
      ]"
    />
    <div class="sw-step">
      <Stepper :steps="[...ORDER_STEPS]" :active-index="order.step" />
    </div>
    <h2>Lines</h2>
    <List v-if="lines.length > 0" :items="lines" />
    <EmptyState v-else title="No lines" description="Nothing is on this order." icon="search" />
    <FileUpload v-if="order.state !== 'Draft'" label="Dock receipt" accept=".pdf,.jpg" @files-change="onFile" />
    <h2>Receipts</h2>
    <Timeline :items="log" />
  </div>
  <PageHead v-else title="Order" lede="That order is not on the sheet." :crumbs="[BREADCRUMB_ROOT, { label: 'Orders', to: `${BASE_PATH}/orders` }, { label: 'Missing' }]" />
  <Modal v-model:open="confirmOpen" heading="Mark received">
    <p>File {{ order?.number }} as received on the dock.</p>
    <template #footer>
      <Button type="button" @click="markReceived">Mark received</Button>
    </template>
  </Modal>
</template>
