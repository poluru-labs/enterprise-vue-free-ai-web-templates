<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Card, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH } from '../constants/navigation.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatDate } from '../utils/format.js';

const route = useRoute();
const router = useRouter();
const store = useFinanceStore();

const expense = computed(() => store.expenseById(route.params.id));

function approve() {
  store.approveExpense(expense.value.id);
  showToast({ title: 'Approved', description: `${expense.value.description} is posted.`, variant: 'success' });
}

function reject() {
  store.rejectExpense(expense.value.id);
  showToast({ title: 'Rejected', description: `${expense.value.description} was sent back.`, variant: 'warning' });
}

function remove() {
  store.deleteExpense(expense.value.id);
  showToast({ title: 'Removed', description: 'The expense is off the ledger.', variant: 'info' });
  router.push(`${BASE_PATH}/expenses`);
}
</script>

<template>
  <div v-if="expense" class="mint-page">
    <PageHeader
      eyebrow="Expense"
      :title="expense.description"
      :description="`${expense.vendor} · ${expense.employee} · ${formatDate(expense.date)}`"
    >
      <template #actions>
        <Button variant="secondary" @click="$router.push(`${BASE_PATH}/expenses`)">Back to list</Button>
        <Button v-if="expense.status === 'Pending'" icon="check" @click="approve">Approve</Button>
      </template>
    </PageHeader>

    <div class="mint-split">
      <Card class="mint-panel" title="Line details">
        <dl class="mint-kv mint-kv-stack">
          <div>
            <dt>Amount</dt>
            <dd>{{ formatCurrency(expense.amount) }}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{{ expense.category }}</dd>
          </div>
          <div>
            <dt>Cost center</dt>
            <dd>{{ expense.costCenter }}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd><StatusBadge :status="expense.status" /></dd>
          </div>
          <div>
            <dt>Notes</dt>
            <dd>{{ expense.notes || '—' }}</dd>
          </div>
        </dl>
        <div class="mint-page-actions" style="margin-top: 1rem">
          <Button v-if="expense.status === 'Pending'" variant="secondary" @click="reject">Reject</Button>
          <Button variant="danger" icon="trash" @click="remove">Delete</Button>
        </div>
      </Card>
      <Card class="mint-panel" title="Close impact">
        <p class="mint-muted">
          This line posts to {{ expense.category }} and counts toward August close. Hana Poluru is the finance lead on the
          approval path.
        </p>
        <ul class="mint-stack-list">
          <li>
            <div>
              <strong>Policy</strong>
              <span>Receipts required above $75</span>
            </div>
          </li>
          <li>
            <div>
              <strong>GL hint</strong>
              <span>6100 · {{ expense.category }}</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </div>
  <div v-else class="mint-page">
    <PageHeader eyebrow="Expense" title="Not found" description="That expense is not on the Mint ledger." />
    <Button @click="$router.push(`${BASE_PATH}/expenses`)">Return to expenses</Button>
  </div>
</template>
