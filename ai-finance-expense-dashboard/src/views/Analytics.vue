<script setup>
import { computed } from 'vue';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import BarChart from '../components/charts/BarChart.vue';
import ColumnChart from '../components/charts/ColumnChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import { useFinanceStore } from '../stores/finance.js';
import { formatCurrency, formatPercent } from '../utils/format.js';

const store = useFinanceStore();

const byCategory = computed(() => {
  const grouped = {};
  store.expenses.forEach((item) => {
    grouped[item.category] = (grouped[item.category] || 0) + item.amount;
  });
  const palette = ['#047857', '#10B981', '#34D399', '#059669', '#065F46', '#6EE7B7', '#A7F3D0', '#047857'];
  return Object.entries(grouped).map(([name, value], index) => ({
    name,
    value,
    color: palette[index % palette.length],
  }));
});

const invoiceMix = computed(() => [
  { name: 'Paid', value: store.paidInvoices.length, color: '#047857' },
  { name: 'Pending', value: store.invoices.filter((item) => item.status === 'Pending').length, color: '#10B981' },
  { name: 'Overdue', value: store.overdueInvoices.length, color: '#B45309' },
]);

const monthly = computed(() =>
  store.overview.monthlyTrend.map((item) => ({ name: item.month, value: item.amount, color: '#10B981' })),
);

const topEmployees = computed(() => {
  const grouped = {};
  store.expenses.forEach((item) => {
    grouped[item.employee] = (grouped[item.employee] || 0) + item.amount;
  });
  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value, color: '#047857' }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
});

const approvalRate = computed(() =>
  store.expenses.length
    ? Math.round((store.approvedExpenses.length / store.expenses.length) * 100)
    : 0,
);
</script>

<template>
  <div class="mint-page">
    <PageHeader
      eyebrow="Spend intelligence"
      title="Analytics"
      description="Category mix, invoice aging, and who is burning the August budget."
    />

    <section class="mint-kpi-grid mint-kpi-grid-4">
      <StatCard label="Expense volume" :value="formatCurrency(store.totalExpenses)" hint="Posted lines" trend="up" trend-value="+4.8%" />
      <StatCard
        label="Average line"
        :value="formatCurrency(Math.round(store.totalExpenses / Math.max(store.expenses.length, 1)))"
        hint="Per expense"
      />
      <StatCard label="AP book" :value="formatCurrency(store.totalInvoiceAmount)" hint="All vendor bills" />
      <StatCard label="Approval rate" :value="formatPercent(approvalRate)" :hint="`${store.approvedExpenses.length} approved`" />
    </section>

    <div class="mint-split">
      <Card class="mint-panel" title="Expenses by category">
        <BarChart :items="byCategory" />
      </Card>
      <Card class="mint-panel" title="Invoice status">
        <DonutChart :items="invoiceMix" center-label="Bills" :center-value="store.invoices.length" />
      </Card>
    </div>

    <Card class="mint-panel" title="Monthly spend">
      <ColumnChart :items="monthly" />
    </Card>

    <Card class="mint-panel" title="Top employees by spend">
      <BarChart :items="topEmployees" />
    </Card>
  </div>
</template>
