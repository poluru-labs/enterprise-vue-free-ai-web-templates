<script setup>
import { ref, computed } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useStore } from '../store';

const store = useStore();
const searchQuery = ref('');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const formData = ref({ name: '', plan: 'Professional', status: 'active', members: 0 });

const filteredOrganizations = computed(() => {
  if (!searchQuery.value) return store.organizations;
  return store.organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function openNewDialog() {
  isEditing.value = false;
  formData.value = { name: '', plan: 'Professional', status: 'active', members: 0 };
  showDialog.value = true;
}

function openEditDialog(org) {
  isEditing.value = true;
  editingId.value = org.id;
  formData.value = { ...org };
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
  isEditing.value = false;
  editingId.value = null;
  formData.value = { name: '', plan: 'Professional', status: 'active', members: 0 };
}

function saveOrganization() {
  if (formData.value.name.trim()) {
    if (isEditing.value) {
      store.updateOrganization(editingId.value, formData.value);
    } else {
      store.addOrganization(formData.value);
    }
    closeDialog();
  }
}

function deleteOrganization(id) {
  if (confirm('Are you sure you want to delete this organization?')) {
    store.deleteOrganization(id);
  }
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">Organizations</span>
        <h1>Tenants</h1>
        <p>Manage your organizations and workspace settings.</p>
      </div>
      <Button icon="plus" @click="openNewDialog">New tenant</Button>
    </header>

    <Card class="search-card">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search organizations..."
        class="search-input"
      />
    </Card>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plan</th>
            <th>Members</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="org in filteredOrganizations" :key="org.id">
            <td><strong>{{ org.name }}</strong></td>
            <td>{{ org.plan }}</td>
            <td>{{ org.members }}</td>
            <td>
              <span class="badge" :class="org.status === 'active' ? 'badge-success' : 'badge-secondary'">
                {{ org.status }}
              </span>
            </td>
            <td>{{ org.created }}</td>
            <td>
              <div class="action-buttons">
                <Button size="sm" variant="secondary" icon="pencil" @click="openEditDialog(org)" />
                <Button size="sm" variant="danger" icon="trash" @click="deleteOrganization(org.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Alert v-if="filteredOrganizations.length === 0" variant="info" title="No results" message="No organizations found matching your search." />
    </div>

    <!-- Dialog -->
    <div v-if="showDialog" class="modal-overlay" @click="closeDialog">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit organization' : 'Create new organization' }}</h2>
          <button class="modal-close" @click="closeDialog">&times;</button>
        </div>
        <form @submit.prevent="saveOrganization" class="modal-body">
          <div class="form-group">
            <label>Organization name *</label>
            <input v-model="formData.name" type="text" placeholder="Enter name" required />
          </div>
          <div class="form-group">
            <label>Plan</label>
            <select v-model="formData.plan">
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div class="form-group">
            <label>Team members</label>
            <input v-model.number="formData.members" type="number" placeholder="0" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="formData.status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="modal-footer">
            <Button variant="secondary" @click="closeDialog">Cancel</Button>
            <Button type="submit">{{ isEditing ? 'Update' : 'Create' }}</Button>
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

.search-card {
  margin-bottom: 2rem;
  padding: 1rem;
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

.badge-secondary {
  background: #e2e3e5;
  color: #383d41;
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

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--rule);
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 1rem;
  margin: 0;
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
