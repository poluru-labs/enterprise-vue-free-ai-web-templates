<script setup>
import { computed } from 'vue';
import { Card } from '@poluru-labs/enterprise-design-system-vue';
import { useFinanceStore } from '../store';

const store = useFinanceStore();

const budgetStats = computed(() => {
  return store.budgets.map(b => ({
    ...b,
    percentUsed: Math.round((b.spent / b.allocated) * 100),
    percentRemaining: Math.round((b.remaining / b.allocated) * 100),
  }));
});

const totalAllocated = computed(() => store.budgets.reduce((sum, b) => sum + b.allocated, 0));
const totalSpent = computed(() => store.budgets.reduce((sum, b) => sum + b.spent, 0));
const totalRemaining = computed(() => store.budgets.reduce((sum, b) => sum + b.remaining, 0));
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <span class="eyebrow">Financial Planning</span>
        <h1>Budget Management</h1>
        <p>Monitor budget allocation, spending, and forecast.</p>
      </div>
    </div>

    <!-- Total Budget Overview -->
    <div class="total-budget-card">
      <Card class="budget-overview">
        <div class="overview-grid">
          <div class="overview-item">
            <span class="overview-label">Total Allocated</span>
            <span class="overview-value">${{ totalAllocated.toLocaleString() }}</span>
          </div>
          <div class="overview-item">
            <span class="overview-label">Total Spent</span>
            <span class="overview-value accent-warning">${{ totalSpent.toLocaleString() }}</span>
          </div>
          <div class="overview-item">
            <span class="overview-label">Total Remaining</span>
            <span class="overview-value accent-success">${{ totalRemaining.toLocaleString() }}</span>
          </div>
          <div class="overview-item">
            <span class="overview-label">Overall Usage</span>
            <span class="overview-value">{{ Math.round((totalSpent / totalAllocated) * 100) }}%</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Budget Cards Grid -->
    <div class="budget-grid">
      <Card v-for="budget in budgetStats" :key="budget.id" class="budget-card">
        <div class="card-header">
          <h3>{{ budget.category }}</h3>
          <span class="status-badge" :class="`status-${budget.status.toLowerCase()}`">
            {{ budget.status }}
          </span>
        </div>

        <!-- Budget Details -->
        <div class="budget-details">
          <div class="detail-row">
            <span class="detail-label">Allocated</span>
            <span class="detail-value">${{ budget.allocated.toLocaleString() }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Spent</span>
            <span class="detail-value">${{ budget.spent.toLocaleString() }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Remaining</span>
            <span class="detail-value accent-remaining">${{ budget.remaining.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Progress Visualization -->
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-label">Usage</span>
            <span class="progress-percent">{{ budget.percentUsed }}%</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-bg">
              <div
                class="progress-bar-fill"
                :style="{ width: budget.percentUsed + '%' }"
                :class="budget.percentUsed > 90 ? 'danger' : budget.percentUsed > 70 ? 'warning' : 'success'"
              ></div>
            </div>
          </div>
          <div class="progress-footer">
            <span class="remaining-label">{{ budget.percentRemaining }}% Remaining</span>
          </div>
        </div>

        <!-- Alert for over budget -->
        <div v-if="budget.spent > budget.allocated" class="alert-box">
          <i class="bi bi-exclamation-triangle"></i>
          <span>Over budget by ${{ (budget.spent - budget.allocated).toLocaleString() }}</span>
        </div>
      </Card>
    </div>

    <!-- Budget by Category Chart-like View -->
    <Card class="budget-breakdown-card">
      <h3 class="section-title">Category Breakdown</h3>
      <div class="breakdown-list">
        <div v-for="budget in budgetStats" :key="budget.id" class="breakdown-item">
          <div class="breakdown-header">
            <span class="category-name">{{ budget.category }}</span>
            <span class="breakdown-amount">${{ budget.spent.toLocaleString() }} / ${{ budget.allocated.toLocaleString() }}</span>
          </div>
          <div class="breakdown-bar">
            <div class="breakdown-progress" :style="{ width: budget.percentUsed + '%' }" :class="budget.percentUsed > 90 ? 'danger' : budget.percentUsed > 70 ? 'warning' : 'normal'"></div>
          </div>
          <div class="breakdown-footer">
            <span class="percent-text">{{ budget.percentUsed }}% used</span>
            <span class="remaining-text">${{ budget.remaining.toLocaleString() }} remaining</span>
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

.total-budget-card {
  margin-bottom: 2rem;
}

.budget-overview {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 206, 69, 0.05) 0%, rgba(255, 206, 69, 0.02) 100%);
  border: 1px solid rgba(255, 206, 69, 0.2);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.overview-item {
  display: flex;
  flex-direction: column;
}

.overview-label {
  font-size: 0.8rem;
  color: #657087;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.overview-value {
  font-size: 2rem;
  font-weight: 700;
  color: #172033;
}

.overview-value.accent-warning {
  color: #FFCE45;
}

.overview-value.accent-success {
  color: #28a745;
}

.budget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.budget-card {
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f5f7fb;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #172033;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-excellent {
  background: #d4edda;
  color: #155724;
}

.status-on\ track {
  background: #d1ecf1;
  color: #0c5460;
}

.status-at\ risk {
  background: #fff3cd;
  color: #856404;
}

.budget-details {
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e4e8f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 0.85rem;
  color: #657087;
  font-weight: 500;
}

.detail-value {
  font-weight: 700;
  color: #172033;
  font-size: 0.95rem;
}

.detail-value.accent-remaining {
  color: #28a745;
}

.progress-section {
  margin-bottom: 1rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-label {
  font-size: 0.8rem;
  color: #657087;
  font-weight: 600;
}

.progress-percent {
  font-weight: 700;
  color: #172033;
  font-size: 0.95rem;
}

.progress-bar-container {
  margin-bottom: 0.5rem;
}

.progress-bar-bg {
  height: 10px;
  background: #e4e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFCE45, #FFB700);
  transition: width 0.3s ease;
  border-radius: 999px;
}

.progress-bar-fill.warning {
  background: linear-gradient(90deg, #ffc107, #ffb300);
}

.progress-bar-fill.danger {
  background: linear-gradient(90deg, #dc3545, #c82333);
}

.progress-footer {
  display: flex;
  justify-content: flex-end;
}

.remaining-label {
  font-size: 0.75rem;
  color: #657087;
  font-weight: 500;
}

.alert-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #ffe0e0;
  border-left: 3px solid #dc3545;
  border-radius: 0.25rem;
  color: #721c24;
  font-size: 0.85rem;
  font-weight: 600;
}

.alert-box i {
  font-size: 1rem;
}

.budget-breakdown-card {
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.section-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: #172033;
  font-weight: 700;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.breakdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  font-weight: 600;
  color: #172033;
}

.breakdown-amount {
  font-size: 0.9rem;
  color: #657087;
  font-weight: 500;
}

.breakdown-bar {
  height: 12px;
  background: #e4e8f0;
  border-radius: 999px;
  overflow: hidden;
}

.breakdown-progress {
  height: 100%;
  background: linear-gradient(90deg, #FFCE45, #FFB700);
  transition: width 0.3s ease;
}

.breakdown-progress.normal {
  background: linear-gradient(90deg, #28a745, #20c997);
}

.breakdown-progress.warning {
  background: linear-gradient(90deg, #ffc107, #ffb300);
}

.breakdown-progress.danger {
  background: linear-gradient(90deg, #dc3545, #c82333);
}

.breakdown-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.percent-text {
  color: #657087;
  font-weight: 500;
}

.remaining-text {
  color: #28a745;
  font-weight: 600;
}
</style>
