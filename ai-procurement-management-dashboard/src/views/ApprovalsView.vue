<script setup lang="ts">
import { computed, ref } from 'vue'
import { Alert, Button, EmptyState, Modal, showToast } from '@poluru-labs/enterprise-design-system-vue'
import PageHead from '@/components/layout/PageHead.vue'
import { BREADCRUMB_ROOT } from '@/constants/navigation'
import { book, findOrder, money, orderTotal, supplierName } from '@/data/ledger'

const waiting = computed(() => book.orders.filter((order) => order.stage === 'Review'))
const pendingId = ref('')
const pending = computed(() => findOrder(pendingId.value))

function confirmApprove() {
  if (!pending.value) return
  const id = pending.value.id
  pendingId.value = ''
  approve(id)
}

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
      <Button type="button" @click="pendingId = order.id">Approve</Button>
    </article>
  </div>
  <Modal :open="Boolean(pending)" heading="Approve this order" @update:open="pendingId = $event ? pendingId : ''">
    <p v-if="pending">{{ pending.number }} · {{ pending.title }}. {{ pending.approver }} clears it.</p>
    <template #footer>
      <Button type="button" variant="secondary" @click="pendingId = ''">Cancel</Button>
      <Button type="button" @click="confirmApprove">Approve</Button>
    </template>
  </Modal>
</template>
