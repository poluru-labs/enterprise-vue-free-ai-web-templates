<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Alert, Button, Card, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { INVOICE_STATUSES } from '../constants/navigation.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';

const store = useFinanceStore();
const route = useRoute();
const searchQuery = ref('');
const filterStatus = ref('');

watch(
  () => route.query.status,
  (value) => {
    if (typeof value === 'string') filterStatus.value = value;
  },
  { immediate: true },
);

const filtered = computed(() => {
  let rows = searchRecords(store.invoices, searchQuery.value, ['invoiceNumber', 'vendor', 'owner']);
  if (filterStatus.value) rows = rows.filter((item) => item.status === filterStatus.value);
  return rows;
});

function markPaid(invoice) {
  store.payInvoice(invoice.id);
  showToast({
    title: 'Marked paid',
    description: `${invoice.invoiceNumber} · ${invoice.vendor} is off the AP aging.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Accounts payable"
      title="Invoices"
      description="Mark vendor bills paid. Overdue rows stay highlighted until cash leaves."
    />

    <Alert
      v-if="store.overdueInvoices.length"
      class="mint-alert"
      variant="warning"
      :title="`${store.overdueInvoices.length} overdue`"
      message="SecurityPoluru and LedgerPoluru are past cutoff for August close."
    />

    <section class="mint-kpi-grid mint-kpi-grid-4">
      <StatCard label="Total invoices" :value="String(store.invoices.length)" hint="August AP book" />
      <StatCard label="Paid" :value="String(store.paidInvoices.length)" hint="Cleared" trend="up" trend-value="On time" />
      <StatCard label="Open" :value="String(store.pendingInvoices.length)" :hint="formatCurrency(store.openInvoiceAmount)" />
      <StatCard
        label="Overdue"
        :value="String(store.overdueInvoices.length)"
        hint="Needs Hana this week"
        trend="up"
        trend-value="+1"
      />
    </section>

    <Card class="mint-filters">
      <div class="mint-filters-grid">
        <label>
          Search
          <input v-model="searchQuery" type="search" placeholder="Invoice, vendor, or owner" />
        </label>
        <label>
          Status
          <select v-model="filterStatus">
            <option value="">All statuses</option>
            <option v-for="status in INVOICE_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </label>
      </div>
    </Card>

    <div class="mint-table-wrap">
      <table class="mint-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Issued</th>
            <th>Due</th>
            <th>Owner</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in filtered" :key="invoice.id" :class="{ 'is-overdue': invoice.status === 'Overdue' }">
            <td class="mint-mono">{{ invoice.invoiceNumber }}</td>
            <td>{{ invoice.vendor }}</td>
            <td class="mint-num">{{ formatCurrency(invoice.amount) }}</td>
            <td>{{ formatDate(invoice.issueDate) }}</td>
            <td>{{ formatDate(invoice.dueDate) }}</td>
            <td>{{ invoice.owner }}</td>
            <td><StatusBadge :status="invoice.status" /></td>
            <td class="mint-row-actions">
              <Button
                v-if="invoice.status !== 'Paid'"
                size="sm"
                icon="check"
                @click="markPaid(invoice)"
              >
                Mark paid
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!filtered.length" class="mint-empty">No invoices match those filters.</p>
    </div>
  </div>
</template>
