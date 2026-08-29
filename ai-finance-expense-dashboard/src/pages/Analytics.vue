<script setup>
import { computed } from 'vue';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import { useFinanceStore } from '../store';

const store = useFinanceStore();

const expensesByCategory = computed(() => {
  const grouped = {};
  store.expenses.forEach(e => {
    if (!grouped[e.category]) {
      grouped[e.category] = 0;
    }
    grouped[e.category] += e.amount;
  });
  return Object.entries(grouped).map(([category, amount]) => ({ category, amount }));
});

const expensesByEmployee = computed(() => {
  const grouped = {};
  store.expenses.forEach(e => {
    if (!grouped[e.employee]) {
      grouped[e.employee] = 0;
    }
    grouped[e.employee] += e.amount;
  });
  return Object.entries(grouped)
    .map(([employee, amount]) => ({ employee, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);
});

const invoicesByStatus = computed(() => {
  return [
    { status: 'Paid', count: store.paidInvoices.length, color: '#28a745' },
    { status: 'Pending', count: store.pendingInvoices.length, color: '#ffc107' },
    { status: 'Overdue', count: store.overdueInvoices.length, color: '#dc3545' },
  ];
});

const monthlySpendTrend = computed(() => store.dashboardStats.monthlyTrend);

const maxAmount = computed(() => Math.max(...monthlySpendTrend.value.map(m => m.amount)));
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <span class="eyebrow">Data Intelligence</span>
        <h1>Financial Analytics</h1>
        <p>Spend analysis, trends, and financial insights.</p>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="metrics-grid">
      <Card class="metric-box">
        <div class="metric-content">
          <span class="metric-label">Total Expenses</span>
          <span class="metric-value">${{ store.totalExpenses.toLocaleString() }}</span>
          <span class="metric-trend">↑ 6.4% from last month</span>
        </div>
        <i class="bi bi-cash-coin metric-icon"></i>
      </Card>
      <Card class="metric-box">
        <div class="metric-content">
          <span class="metric-label">Avg Expense</span>
          <span class="metric-value">${{ Math.round(store.totalExpenses / store.expenses.length).toLocaleString() }}</span>
          <span class="metric-trend">Per transaction</span>
        </div>
        <i class="bi bi-graph-up metric-icon"></i>
      </Card>
      <Card class="metric-box">
        <div class="metric-content">
          <span class="metric-label">Invoice Value</span>
          <span class="metric-value">${{ store.totalInvoiceAmount.toLocaleString() }}</span>
          <span class="metric-trend">Accounts payable</span>
        </div>
        <i class="bi bi-file-text metric-icon"></i>
      </Card>
      <Card class="metric-box">
        <div class="metric-content">
          <span class="metric-label">Approval Rate</span>
          <span class="metric-value">{{ Math.round((store.approvedExpenses.length / store.expenses.length) * 100) }}%</span>
          <span class="metric-trend">{{ store.approvedExpenses.length }} approved</span>
        </div>
        <i class="bi bi-check-circle metric-icon"></i>
      </Card>
    </div>

    <!-- Charts and Analysis -->
    <div class="analytics-grid">
      <!-- Expenses by Category -->
      <Card class="chart-card">
        <h3 class="chart-title">Expenses by Category</h3>
        <div class="bar-chart">
          <div v-for="item in expensesByCategory" :key="item.category" class="bar-item">
            <div class="bar-label">
              <span class="label-text">{{ item.category }}</span>
              <span class="label-amount">${{ item.amount.toLocaleString() }}</span>
            </div>
            <div class="bar-container">
              <div
                class="bar"
                :style="{ width: (item.amount / Math.max(...expensesByCategory.map(i => i.amount))) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Invoice Status Distribution -->
      <Card class="chart-card">
        <h3 class="chart-title">Invoice Status</h3>
        <div class="status-distribution">
          <div v-for="item in invoicesByStatus" :key="item.status" class="status-item">
            <div class="status-marker" :style="{ backgroundColor: item.color }"></div>
            <div class="status-info">
              <span class="status-name">{{ item.status }}</span>
              <span class="status-count">{{ item.count }} invoices</span>
            </div>
            <div class="status-percentage">
              {{ Math.round((item.count / store.invoices.length) * 100) }}%
            </div>
          </div>
        </div>
      </Card>

      <!-- Monthly Trend -->
      <Card class="chart-card full-width">
        <h3 class="chart-title">Monthly Spend Trend</h3>
        <div class="trend-chart">
          <div class="trend-bars">
            <div v-for="item in monthlySpendTrend" :key="item.month" class="trend-bar">
              <div
                class="bar-fill"
                :style="{ height: (item.amount / maxAmount) * 100 + '%' }"
              ></div>
              <span class="bar-label">{{ item.month }}</span>
            </div>
          </div>
          <div class="trend-legend">
            <div class="legend-item">
              <span class="legend-value">${{ Math.min(...monthlySpendTrend.map(m => m.amount)).toLocaleString() }}</span>
              <span class="legend-label">Min</span>
            </div>
            <div class="legend-item">
              <span class="legend-value">${{ Math.max(...monthlySpendTrend.map(m => m.amount)).toLocaleString() }}</span>
              <span class="legend-label">Max</span>
            </div>
            <div class="legend-item">
              <span class="legend-value">${{ Math.round(monthlySpendTrend.reduce((a, b) => a + b.amount, 0) / monthlySpendTrend.length).toLocaleString() }}</span>
              <span class="legend-label">Avg</span>
            </div>
          </div>
        </div>
      </Card>

      <!-- Top Spenders -->
      <Card class="chart-card">
        <h3 class="chart-title">Top Employees by Spend</h3>
        <div class="employee-list">
          <div v-for="(item, index) in expensesByEmployee" :key="item.employee" class="employee-item">
            <div class="rank-badge">{{ index + 1 }}</div>
            <div class="employee-info">
              <span class="employee-name">{{ item.employee }}</span>
              <span class="employee-amount">${{ item.amount.toLocaleString() }}</span>
            </div>
            <div class="employee-bar">
              <div
                class="bar"
                :style="{ width: (item.amount / Math.max(...expensesByEmployee.map(i => i.amount))) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Budget vs Actual -->
      <Card class="chart-card">
        <h3 class="chart-title">Budget Utilization Summary</h3>
        <div class="budget-summary">
          <div class="summary-stat">
            <span class="summary-label">Total Budget</span>
            <span class="summary-value large">${{ store.budgets.reduce((a, b) => a + b.allocated, 0).toLocaleString() }}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-label">Total Spent</span>
            <span class="summary-value accent-warning">${{ store.budgets.reduce((a, b) => a + b.spent, 0).toLocaleString() }}</span>
          </div>
          <div class="summary-stat">
            <span class="summary-label">Overall %</span>
            <span class="summary-value">{{ Math.round((store.budgets.reduce((a, b) => a + b.spent, 0) / store.budgets.reduce((a, b) => a + b.allocated, 0)) * 100) }}%</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.eyebrow {
  display: block;
  font-size: 0.875rem;
  color: #657087;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.page-header h1 {
  margin: 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #172033;
}

.page-header p {
  margin: 0;
  color: #657087;
  font-size: 0.95rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.metric-content {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.8rem;
  color: #657087;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #172033;
  margin-bottom: 0.5rem;
}

.metric-trend {
  font-size: 0.75rem;
  color: #28a745;
  font-weight: 500;
}

.metric-icon {
  font-size: 2.5rem;
  color: #FFCE45;
  opacity: 0.8;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.chart-card {
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-title {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #172033;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bar-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.label-text {
  font-weight: 600;
  color: #172033;
}

.label-amount {
  color: #657087;
  font-weight: 500;
}

.bar-container {
  height: 24px;
  background: #e4e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #FFCE45, #FFB700);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.status-distribution {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.status-name {
  font-weight: 600;
  color: #172033;
  font-size: 0.9rem;
}

.status-count {
  font-size: 0.8rem;
  color: #657087;
}

.status-percentage {
  font-weight: 700;
  color: #172033;
  font-size: 0.95rem;
  min-width: 40px;
  text-align: right;
}

.trend-chart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.trend-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 1rem;
  height: 200px;
  padding: 1rem 0;
}

.trend-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #FFCE45, #FFB700);
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 0.8rem;
  color: #657087;
  font-weight: 600;
}

.trend-legend {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  border-top: 1px solid #e4e8f0;
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.legend-value {
  font-weight: 700;
  color: #172033;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.legend-label {
  font-size: 0.75rem;
  color: #657087;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.employee-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.employee-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rank-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #FFCE45;
  color: #172033;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.employee-info {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.employee-name {
  font-weight: 600;
  color: #172033;
  font-size: 0.9rem;
}

.employee-amount {
  font-size: 0.8rem;
  color: #657087;
}

.employee-bar {
  flex: 1;
  height: 6px;
  background: #e4e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.employee-bar .bar {
  height: 100%;
  background: linear-gradient(90deg, #FFCE45, #FFB700);
}

.budget-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f7fb;
  border-radius: 0.5rem;
}

.summary-label {
  font-size: 0.85rem;
  color: #657087;
  font-weight: 600;
}

.summary-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #172033;
}

.summary-value.large {
  font-size: 1.5rem;
}

.summary-value.accent-warning {
  color: #FFCE45;
}
</style>
