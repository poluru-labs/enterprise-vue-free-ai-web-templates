<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Alert, Button, Card } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, EXPENSE_CATEGORIES, EXPENSE_STATUSES } from '../constants/navigation.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';

const store = useFinanceStore();
const route = useRoute();

const searchQuery = ref('');
const filterStatus = ref('');
const filterCategory = ref('');

watch(
  () => route.query.compose,
  (value) => {
    if (value === '1') store.openComposer();
  },
  { immediate: true },
);

const filtered = computed(() => {
  let rows = searchRecords(store.expenses, searchQuery.value, ['description', 'vendor', 'employee']);
  if (filterStatus.value) rows = rows.filter((item) => item.status === filterStatus.value);
  if (filterCategory.value) rows = rows.filter((item) => item.category === filterCategory.value);
  return rows;
});

function approve(id) {
  store.approveExpense(id);
}

function remove(id) {
  store.deleteExpense(id);
}
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Cards and reimbursements"
      title="Expenses"
      description="Approve, reject, or open a line. Submit a new expense into Hana Poluru’s queue."
    >
      <template #actions>
        <Button icon="plus" @click="store.openComposer()">Submit expense</Button>
      </template>
    </PageHeader>

    <Alert
      v-if="store.pendingExpenses.length"
      class="mint-alert"
      variant="warning"
      :title="`${store.pendingExpenses.length} awaiting approval`"
      message="IFRS workshop, SOC 2 pack, and payroll implementation hours are still open."
    />

    <Card class="mint-filters">
      <div class="mint-filters-grid">
        <label>
          Search
          <input v-model="searchQuery" type="search" placeholder="Description, vendor, or Poluru" />
        </label>
        <label>
          Status
          <select v-model="filterStatus">
            <option value="">All statuses</option>
            <option v-for="status in EXPENSE_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </label>
        <label>
          Category
          <select v-model="filterCategory">
            <option value="">All categories</option>
            <option v-for="category in EXPENSE_CATEGORIES" :key="category" :value="category">{{ category }}</option>
          </select>
        </label>
      </div>
    </Card>

    <div class="mint-table-wrap">
      <table class="mint-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Vendor</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in filtered" :key="expense.id">
            <td>
              <RouterLink class="mint-text-link" :to="`${BASE_PATH}/expenses/${expense.id}`">
                {{ expense.description }}
              </RouterLink>
            </td>
            <td>{{ expense.category }}</td>
            <td class="mint-num">{{ formatCurrency(expense.amount) }}</td>
            <td>{{ expense.vendor }}</td>
            <td>{{ expense.employee }}</td>
            <td>{{ formatDate(expense.date) }}</td>
            <td><StatusBadge :status="expense.status" /></td>
            <td class="mint-row-actions">
              <Button
                v-if="expense.status === 'Pending'"
                size="sm"
                variant="secondary"
                icon="check"
                accessible-label="Approve"
                @click="approve(expense.id)"
              />
              <Button size="sm" variant="tertiary" icon="trash" accessible-label="Delete" @click="remove(expense.id)" />
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!filtered.length" class="mint-empty">No expenses match those filters.</p>
    </div>
  </div>
</template>
