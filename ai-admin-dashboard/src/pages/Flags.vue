<script setup>
import { ref, computed } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useStore } from '../store';

const store = useStore();
const searchQuery = ref('');
const filterStatus = ref('');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const formData = ref({ name: '', description: '', status: 'development', rolloutPercent: 0 });

const filteredFlags = computed(() => {
  let result = store.featureFlags;
  
  if (searchQuery.value) {
    result = result.filter(flag =>
      flag.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (filterStatus.value) {
    result = result.filter(flag => flag.status === filterStatus.value);
  }
  
  return result;
});

function openNewDialog() {
  isEditing.value = false;
  formData.value = { name: '', description: '', status: 'development', rolloutPercent: 0 };
  showDialog.value = true;
}

function openEditDialog(flag) {
  isEditing.value = true;
  editingId.value = flag.id;
  formData.value = { ...flag };
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
  isEditing.value = false;
  editingId.value = null;
  formData.value = { name: '', description: '', status: 'development', rolloutPercent: 0 };
}

function saveFlag() {
  if (formData.value.name.trim() && formData.value.description.trim()) {
    if (isEditing.value) {
      store.updateFeatureFlag(editingId.value, formData.value);
    } else {
      store.addFeatureFlag(formData.value);
    }
    closeDialog();
  }
}

function deleteFlag(id) {
  if (confirm('Are you sure you want to delete this feature flag?')) {
    store.deleteFeatureFlag(id);
  }
}

function getStatusBadgeClass(status) {
  const classes = {
    'stable': 'badge-success',
    'rollout': 'badge-info',
    'beta': 'badge-warning',
    'development': 'badge-secondary',
  };
  return classes[status] || 'badge-secondary';
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">Deployment</span>
        <h1>Feature Flags</h1>
        <p>Manage feature flags and gradual rollouts.</p>
      </div>
      <Button icon="plus" @click="openNewDialog">New flag</Button>
    </header>

    <Card class="filters">
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search flags..."
          class="search-input flex-grow"
        />
        <select v-model="filterStatus" class="filter-select">
          <option value="">All statuses</option>
          <option value="stable">Stable</option>
          <option value="rollout">Rollout</option>
          <option value="beta">Beta</option>
          <option value="development">Development</option>
        </select>
      </div>
    </Card>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Rollout %</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flag in filteredFlags" :key="flag.id">
            <td><strong>{{ flag.name }}</strong></td>
            <td>{{ flag.description }}</td>
            <td>
              <span class="badge" :class="getStatusBadgeClass(flag.status)">
                {{ flag.status }}
              </span>
            </td>
            <td>
              <div class="rollout-cell">
                <div class="progress" style="height: 24px; border-radius: 4px; background: var(--rule); overflow: hidden;">
                  <div class="progress-bar" :style="{ width: flag.rolloutPercent + '%', background: flag.rolloutPercent === 100 ? '#28a745' : flag.rolloutPercent > 50 ? '#ffc107' : '#dc3545' }"></div>
                </div>
                <span class="rollout-text">{{ flag.rolloutPercent }}%</span>
              </div>
            </td>
            <td>{{ flag.created }}</td>
            <td>
              <div class="action-buttons">
                <Button size="sm" variant="secondary" icon="pencil" @click="openEditDialog(flag)" />
                <Button size="sm" variant="danger" icon="trash" @click="deleteFlag(flag.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Alert v-if="filteredFlags.length === 0" variant="info" title="No results" message="No feature flags found matching your search." />
    </div>

    <!-- Dialog -->
    <div v-if="showDialog" class="modal-overlay" @click="closeDialog">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit feature flag' : 'Create new feature flag' }}</h2>
          <button class="modal-close" @click="closeDialog">&times;</button>
        </div>
        <form @submit.prevent="saveFlag" class="modal-body">
          <div class="form-group">
            <label>Flag name *</label>
            <input v-model="formData.name" type="text" placeholder="e.g., dark-mode" required />
          </div>
          <div class="form-group">
            <label>Description *</label>
            <input v-model="formData.description" type="text" placeholder="What does this flag enable?" required />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status">
              <option value="development">Development</option>
              <option value="beta">Beta</option>
              <option value="rollout">Rollout</option>
              <option value="stable">Stable</option>
            </select>
          </div>
          <div class="form-group">
            <label>Rollout percentage (%): {{ formData.rolloutPercent }}%</label>
            <input v-model.number="formData.rolloutPercent" type="range" min="0" max="100" />
          </div>
          <div class="modal-footer">
            <Button variant="secondary" @click="closeDialog">Cancel</Button>
            <Button type="submit">{{ isEditing ? 'Update' : 'Create' }} flag</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
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
  color: var(--muted);
  margin-bottom: 0.5rem;
}

.filters {
  margin-bottom: 2rem;
  padding: 1rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.flex-grow {
  flex: 1;
}

.filter-select {
  min-width: 150px;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid var(--rule);
  border-radius: 0.5rem;
}

.data-table th {
  background: var(--paper);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--rule);
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--rule);
}

.data-table tr:hover {
  background: var(--paper);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-success {
  background: #d4edda;
  color: #155724;
}

.badge-info {
  background: #d1ecf1;
  color: #0c5460;
}

.badge-warning {
  background: #fff3cd;
  color: #856404;
}

.badge-secondary {
  background: #e2e3e5;
  color: #383d41;
}

.rollout-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress {
  flex: 1;
  min-width: 150px;
}

.progress-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.rollout-text {
  min-width: 40px;
  text-align: right;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.d-flex {
  display: flex;
}

.gap-2 {
  gap: 1rem;
}

.justify-content-end {
  justify-content: flex-end;
}

.hint-text {
  font-size: 0.875rem;
  color: var(--muted);
  margin: 0;
}

.search-input,
.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--rule);
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 1rem;
}

.search-input {
  flex: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--rule);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--muted);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--rule);
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
}
</style>
