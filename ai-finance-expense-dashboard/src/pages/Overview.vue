<script setup>
import { computed } from 'vue';
import { Alert, Button, Card, Stat } from '@poluru-labs/enterprise-design-system-vue';
import { useFinanceStore } from '../store';

const store = useFinanceStore();

const totalSpend = computed(() => store.totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
const pendingCount = computed(() => store.pendingExpenses.length);
const approvedCount = computed(() => store.approvedExpenses.length);
const overdueInvoices = computed(() => store.overdueInvoices.length);
const budgetUtilization = computed(() => `${store.dashboardStats.budgetUtilization}%`);
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <span class="eyebrow">Finance Control</span>
        <h1>Dashboard Overview</h1>
        <p>Real-time financial metrics, spend tracking, and budget management.</p>
      </div>
      <Button icon="plus">New Expense</Button>
    </div>

    <Alert class="alert-custom mb-4" variant="info" title="Budget Status" message="Current month spend is on track. Review invoices section for overdue items." />

    <section class="metrics">
      <Card class="metric-card">
        <Stat label="Total Spend (MTD)" :value="totalSpend" hint="72% of budget" trend="up" trend-value="+6.4%" />
      </Card>
      <Card class="metric-card">
        <Stat label="Pending Approvals" :value="pendingCount.toString()" hint="Awaiting review" trend="down" trend-value="-2" />
      </Card>
      <Card class="metric-card">
        <Stat label="Open Invoices" :value="store.pendingInvoices.length.toString()" hint="$186k outstanding" trend="down" trend-value="-12" />
      </Card>
      <Card class="metric-card">
        <Stat label="Budget Used" :value="budgetUtilization" hint="Overall allocation" trend="up" trend-value="+4.2%" />
      </Card>
    </section>

    <!-- Recent Activity Section -->
    <div class="dashboard-grid mt-5">
      <Card class="card-section">
        <div class="section-header">
          <h3>Recent Expenses</h3>
          <span class="badge badge-warning">{{ store.expenses.length }} Total</span>
        </div>
        <div class="activity-list">
          <div v-for="expense in store.expenses.slice(0, 5)" :key="expense.id" class="activity-item">
            <div class="activity-icon">
              <i class="bi bi-receipt"></i>
            </div>
            <div class="activity-details">
              <p class="activity-title">{{ expense.description }}</p>
              <p class="activity-meta">{{ expense.employee }} • {{ expense.date }}</p>
            </div>
            <div class="activity-amount">
              <span class="amount">${{ expense.amount.toLocaleString() }}</span>
              <span class="status-badge" :class="`status-${expense.status.toLowerCase()}`">{{ expense.status }}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card class="card-section">
        <div class="section-header">
          <h3>Invoice Status</h3>
          <span class="badge badge-info">{{ store.invoices.length }} Total</span>
        </div>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-value">{{ store.paidInvoices.length }}</span>
            <span class="stat-label">Paid</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ store.pendingInvoices.length }}</span>
            <span class="stat-label">Pending</span>
          </div>
          <div class="stat-box alert-stat">
            <span class="stat-value">{{ store.overdueInvoices.length }}</span>
            <span class="stat-label">Overdue</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ store.totalInvoiceAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) }}</span>
            <span class="stat-label">Total Amount</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Budget Overview -->
    <Card class="card-section mt-5">
      <div class="section-header">
        <h3>Budget Allocation</h3>
      </div>
      <div class="budget-list">
        <div v-for="budget in store.budgets" :key="budget.id" class="budget-item">
          <div class="budget-info">
            <span class="budget-name">{{ budget.category }}</span>
            <span class="budget-text">{{ budget.spent }} / {{ budget.allocated }}</span>
          </div>
          <div class="progress-container">
            <div class="progress">
              <div class="progress-bar" :style="{ width: (budget.spent / budget.allocated * 100) + '%' }"></div>
            </div>
            <span class="percent-text">{{ Math.round(budget.spent / budget.allocated * 100) }}%</span>
          </div>
        </div>
      </div>
    </Card>
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

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.metric-card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.alert-custom {
  margin-bottom: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card-section {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f5f7fb;
}

.section-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #172033;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-warning {
  background: #FFCE45;
  color: #172033;
}

.badge-info {
  background: #d1ecf1;
  color: #0c5460;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f5f7fb;
  border-radius: 0.5rem;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #FFCE45;
  border-radius: 0.5rem;
  color: #172033;
  font-size: 1.25rem;
}

.activity-details {
  flex: 1;
  min-width: 0;
}

.activity-title {
  margin: 0;
  font-weight: 600;
  color: #172033;
  font-size: 0.95rem;
}

.activity-meta {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  color: #657087;
}

.activity-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.amount {
  font-weight: 700;
  color: #172033;
}

.status-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-approved {
  background: #d4edda;
  color: #155724;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-box {
  padding: 1.5rem;
  background: #f5f7fb;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid #e4e8f0;
}

.stat-box.alert-stat {
  background: #ffe0e0;
  border-color: #ffb3b3;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #172033;
  margin-bottom: 0.5rem;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: #657087;
  font-weight: 500;
}

.budget-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.budget-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.budget-info {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.budget-name {
  font-weight: 600;
  color: #172033;
  font-size: 0.95rem;
}

.budget-text {
  font-size: 0.8rem;
  color: #657087;
  margin-top: 0.25rem;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.progress {
  flex: 1;
  height: 8px;
  background: #e4e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FFCE45, #FFB700);
  transition: width 0.3s ease;
}

.percent-text {
  min-width: 40px;
  text-align: right;
  font-weight: 600;
  color: #172033;
  font-size: 0.85rem;
}

.mt-5 {
  margin-top: 3rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
