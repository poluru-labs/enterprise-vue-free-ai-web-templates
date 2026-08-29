<script setup>
import { ref, computed } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useFinanceStore } from '../store';

const store = useFinanceStore();
const searchQuery = ref('');
const filterStatus = ref('');

const filteredInvoices = computed(() => {
  let result = store.invoices;
  
  if (searchQuery.value) {
    result = result.filter(i =>
      i.invoiceNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      i.vendor.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (filterStatus.value) {
    result = result.filter(i => i.status === filterStatus.value);
  }
  
  return result;
});

function payInvoice(id) {
  store.payInvoice(id);
}

function deleteInvoice(id) {
  if (confirm('Are you sure?')) {
    store.deleteInvoice(id);
  }
}

const isOverdue = (dueDate) => new Date(dueDate) < new Date();
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <span class="eyebrow">Accounts Payable</span>
        <h1>Invoice Management</h1>
        <p>Track vendor invoices, payment status, and due dates.</p>
      </div>
      <Button icon="plus">New Invoice</Button>
    </div>

    <Alert v-if="store.overdueInvoices.length > 0" class="alert-custom mb-4" variant="warning" :title="`${store.overdueInvoices.length} Overdue Invoice${store.overdueInvoices.length > 1 ? 's' : ''}`" message="Action required: Review and process overdue payments." />

    <!-- Summary Cards -->
    <div class="summary-grid">
      <Card class="summary-card">
        <div class="summary-content">
          <i class="bi bi-file-earmark-check"></i>
          <div class="summary-info">
            <span class="summary-label">Total Invoices</span>
            <span class="summary-value">{{ store.invoices.length }}</span>
          </div>
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-content paid">
          <i class="bi bi-check-circle"></i>
          <div class="summary-info">
            <span class="summary-label">Paid</span>
            <span class="summary-value">{{ store.paidInvoices.length }}</span>
          </div>
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-content pending">
          <i class="bi bi-clock"></i>
          <div class="summary-info">
            <span class="summary-label">Pending</span>
            <span class="summary-value">{{ store.pendingInvoices.length }}</span>
          </div>
        </div>
      </Card>
      <Card class="summary-card">
        <div class="summary-content overdue">
          <i class="bi bi-exclamation-circle"></i>
          <div class="summary-info">
            <span class="summary-label">Overdue</span>
            <span class="summary-value">{{ store.overdueInvoices.length }}</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Filters -->
    <Card class="filters-card">
      <div class="filters-grid">
        <div class="filter-item">
          <label>Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search invoices..."
            class="search-input"
          />
        </div>
        <div class="filter-item">
          <label>Status</label>
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Invoices Table -->
    <div class="table-card">
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in filteredInvoices" :key="invoice.id" :class="{ overdue: isOverdue(invoice.dueDate) && invoice.status !== 'Paid' }">
            <td class="invoice-number">{{ invoice.invoiceNumber }}</td>
            <td class="vendor-name">{{ invoice.vendor }}</td>
            <td class="amount-cell">
              <span class="amount">${{ invoice.amount.toLocaleString() }}</span>
            </td>
            <td class="date-cell">{{ invoice.issueDate }}</td>
            <td class="date-cell">{{ invoice.dueDate }}</td>
            <td>
              <span class="status-badge" :class="`status-${invoice.status.toLowerCase()}`">
                {{ invoice.status }}
              </span>
            </td>
            <td class="actions-cell">
              <div class="action-buttons">
                <Button
                  v-if="invoice.status === 'Pending'"
                  size="sm"
                  variant="success"
                  icon="check"
                  @click="payInvoice(invoice.id)"
                />
                <Button size="sm" variant="secondary" icon="eye" />
                <Button size="sm" variant="danger" icon="trash" @click="deleteInvoice(invoice.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredInvoices.length === 0" class="empty-state">
        <i class="bi bi-inbox"></i>
        <p>No invoices found matching your filters.</p>
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

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  padding: 1.5rem;
}

.summary-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.summary-content i {
  font-size: 2rem;
  color: #FFCE45;
}

.summary-content.paid i {
  color: #28a745;
}

.summary-content.pending i {
  color: #ffc107;
}

.summary-content.overdue i {
  color: #dc3545;
}

.summary-info {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 0.8rem;
  color: #657087;
  font-weight: 500;
}

.summary-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #172033;
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

.invoices-table {
  width: 100%;
  border-collapse: collapse;
}

.invoices-table thead {
  background: #f5f7fb;
  border-bottom: 2px solid #e4e8f0;
}

.invoices-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  color: #172033;
}

.invoices-table td {
  padding: 1rem;
  border-bottom: 1px solid #e4e8f0;
}

.invoices-table tbody tr:hover {
  background: #f9fafb;
}

.invoices-table tbody tr.overdue {
  background: #fff5f5;
}

.invoice-number {
  font-weight: 700;
  color: #172033;
  font-family: 'Courier New', monospace;
}

.vendor-name {
  font-weight: 600;
  color: #172033;
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

.status-paid {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-overdue {
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
