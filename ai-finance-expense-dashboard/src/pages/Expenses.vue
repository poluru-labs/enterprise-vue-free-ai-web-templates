<script setup>
import { ref, computed } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useFinanceStore } from '../store';

const store = useFinanceStore();
const searchQuery = ref('');
const filterStatus = ref('');
const filterCategory = ref('');

const filteredExpenses = computed(() => {
  let result = store.expenses;
  
  if (searchQuery.value) {
    result = result.filter(e =>
      e.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.vendor.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (filterStatus.value) {
    result = result.filter(e => e.status === filterStatus.value);
  }
  
  if (filterCategory.value) {
    result = result.filter(e => e.category === filterCategory.value);
  }
  
  return result;
});

const categories = computed(() => [...new Set(store.expenses.map(e => e.category))]);

function approveExpense(id) {
  store.approveExpense(id);
}

function deleteExpense(id) {
  if (confirm('Are you sure?')) {
    store.deleteExpense(id);
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <span class="eyebrow">Financial Records</span>
        <h1>Expense Management</h1>
        <p>Track, approve, and manage all business expenses.</p>
      </div>
      <Button icon="plus">New Expense</Button>
    </div>

    <Alert class="alert-custom mb-4" variant="info" title="Pending Review" message="You have 3 expenses awaiting approval." />

    <!-- Filters -->
    <Card class="filters-card">
      <div class="filters-grid">
        <div class="filter-item">
          <label>Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search expenses..."
            class="search-input"
          />
        </div>
        <div class="filter-item">
          <label>Status</label>
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div class="filter-item">
          <label>Category</label>
          <select v-model="filterCategory" class="filter-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Expenses Table -->
    <div class="table-card">
      <table class="expenses-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Vendor</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in filteredExpenses" :key="expense.id">
            <td>
              <span class="expense-description">{{ expense.description }}</span>
            </td>
            <td>
              <span class="badge-category">{{ expense.category }}</span>
            </td>
            <td class="amount-cell">
              <span class="amount">${{ expense.amount.toLocaleString() }}</span>
            </td>
            <td>{{ expense.vendor }}</td>
            <td>{{ expense.employee }}</td>
            <td class="date-cell">{{ expense.date }}</td>
            <td>
              <span class="status-badge" :class="`status-${expense.status.toLowerCase()}`">
                {{ expense.status }}
              </span>
            </td>
            <td class="actions-cell">
              <div class="action-buttons">
                <Button
                  v-if="expense.status === 'Pending'"
                  size="sm"
                  variant="success"
                  icon="check"
                  @click="approveExpense(expense.id)"
                />
                <Button size="sm" variant="secondary" icon="pencil" />
                <Button size="sm" variant="danger" icon="trash" @click="deleteExpense(expense.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredExpenses.length === 0" class="empty-state">
        <i class="bi bi-inbox"></i>
        <p>No expenses found matching your filters.</p>
      </div>
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

.alert-custom {
  margin-bottom: 2rem;
}

.filters-card {
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #172033;
}

.search-input,
.filter-select {
  padding: 0.625rem 0.75rem;
  border: 1px solid #e4e8f0;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 0.95rem;
  background: white;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #FFCE45;
  box-shadow: 0 0 0 3px rgba(255, 206, 69, 0.1);
}

.table-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  overflow: hidden;
}

.expenses-table {
  width: 100%;
  border-collapse: collapse;
}

.expenses-table thead {
  background: #f5f7fb;
  border-bottom: 2px solid #e4e8f0;
}

.expenses-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #172033;
}

.expenses-table td {
  padding: 1rem;
  border-bottom: 1px solid #e4e8f0;
}

.expenses-table tbody tr:hover {
  background: #f9fafb;
}

.expense-description {
  font-weight: 600;
  color: #172033;
}

.badge-category {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  background: #e8f4f8;
  color: #0c5460;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.amount-cell {
  text-align: right;
}

.amount {
  font-weight: 700;
  color: #172033;
  font-size: 1rem;
}

.date-cell {
  color: #657087;
  font-size: 0.9rem;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
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

.status-rejected {
  background: #f8d7da;
  color: #721c24;
}

.actions-cell {
  text-align: right;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  color: #657087;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
