<script setup lang="ts">
import { computed } from 'vue'
import { Alert, Button, EmptyState, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findOrder, money, orderTotal, supplierName } from '@/data/ledger'

const waiting = computed(() => book.orders.filter((order) => order.stage === 'Review'))

function approve(id: string) {
  const order = findOrder(id)
  if (!order || order.stage !== 'Review') return
  order.stage = 'Approved'
  order.events.unshift({
    id: `ap-${order.id}`,
    title: 'Approved',
    description: `${order.approver} cleared ${order.number}.`,
    time: 'Today',
  })
  showToast({
    title: 'Approved',
    description: `${order.number} cleared by ${order.approver}.`,
    variant: 'success',
  })
}
</script>

<template>
  <PageHead
    title="Approvals"
    lede="Orders waiting on a named approver."
    :crumbs="[BREADCRUMB_ROOT, { label: 'Approvals' }]"
  />
  <Alert
    v-if="waiting.length"
    class="pw-block"
    variant="warning"
    title="In review"
    :message="`${waiting.length} order${waiting.length === 1 ? '' : 's'} waiting on a desk.`"
  />
  <EmptyState
    v-if="waiting.length === 0"
    title="Nothing to approve"
    description="Review is clear."
    icon="check"
  />
  <div v-else class="pw-stack">
    <article v-for="order in waiting" :key="order.id" class="pw-approval">
      <div>
        <strong>{{ order.number }} · {{ order.title }}</strong>
        <p>{{ supplierName(order.supplierId) }} · {{ order.approver }} · {{ money(orderTotal(order)) }}</p>
      </div>
      <Button type="button" @click="approve(order.id)">Approve</Button>
    </article>
  </div>
</template>
