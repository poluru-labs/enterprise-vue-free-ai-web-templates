<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Button,
  DataTable,
  DescriptionList,
  EmptyState,
  Status,
  Stepper,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BASE_PATH, BREADCRUMB_ROOT, STAGES } from '@/constants/navigation'
import { findOrder, findSupplier, money, orderTotal, type Stage } from '@/data/ledger'

const route = useRoute()
const router = useRouter()

const order = computed(() => findOrder(String(route.params.id ?? '')))
const supplier = computed(() => (order.value ? findSupplier(order.value.supplierId) : undefined))

const steps = STAGES.map((item) => ({
  id: item.id,
  label: item.label,
  description: item.description,
}))

const stageIndex = computed(() => {
  if (!order.value) return 0
  const index = STAGES.findIndex((item) => item.label === order.value?.stage)
  return index < 0 ? 0 : index
})

const lineRows = computed(() => {
  if (!order.value) return []
  return order.value.lines.map((line) => ({
    sku: line.sku,
    name: line.name,
    qty: line.qty,
    price: money(line.price),
    received: line.received,
    amount: money(line.qty * line.price),
  }))
})

const lineColumns = [
  { key: 'sku', label: 'SKU' },
  { key: 'name', label: 'Item' },
  { key: 'qty', label: 'Qty' },
  { key: 'price', label: 'Price' },
  { key: 'received', label: 'Received' },
  { key: 'amount', label: 'Amount' },
]

function tone(stage: Stage) {
  if (stage === 'Received') return 'success' as const
  if (stage === 'Review') return 'warning' as const
  if (stage === 'Draft') return 'neutral' as const
  return 'info' as const
}
</script>

<template>
  <EmptyState
    v-if="!order"
    title="Order not found"
    description="That PO is not on the book."
    icon="search"
  />
  <template v-else>
    <PageHead
      :title="order.number"
      :lede="order.title"
      :crumbs="[BREADCRUMB_ROOT, { label: 'Orders', to: `${BASE_PATH}/orders` }, { label: order.number }]"
    >
      <template #actions>
        <Button type="button" variant="secondary" @click="router.push(`${BASE_PATH}/orders`)">Back to orders</Button>
      </template>
    </PageHead>
    <div class="pw-detail">
      <div class="pw-pipeline pw-pipeline-solo">
        <Stepper :steps="steps" :active-index="stageIndex" />
      </div>
      <div class="pw-identity">
        <Status :label="order.stage" :tone="tone(order.stage)" />
        <Tag :label="order.category" />
        <strong>{{ money(orderTotal(order)) }}</strong>
      </div>
      <DescriptionList
        :items="[
          { term: 'Supplier', description: supplier?.name ?? 'Supplier' },
          { term: 'Contact', description: supplier?.contact ?? '' },
          { term: 'Buyer', description: order.buyer },
          { term: 'Approver', description: order.approver },
          { term: 'Site', description: order.site },
          { term: 'Filed', description: order.filed },
        ]"
      />
      <h2 class="pw-subhead">Lines</h2>
      <div class="pw-table pw-lines">
        <DataTable :columns="lineColumns" :rows="lineRows" compact />
      </div>
      <h2 class="pw-subhead">Notes</h2>
      <Timeline :items="order.events" />
    </div>
  </template>
</template>
