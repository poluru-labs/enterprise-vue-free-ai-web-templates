<script setup>
import { ref, computed } from 'vue';
import { Button, Card, Alert } from '@poluru-labs/enterprise-design-system-vue';
import { useStore } from '../store';

const store = useStore();
const searchQuery = ref('');
const filterRole = ref('');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const formData = ref({ name: '', email: '', role: 'Viewer', org: '', status: 'active' });

const filteredMembers = computed(() => {
  let result = store.members;
  
  if (searchQuery.value) {
    result = result.filter(member =>
      member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (filterRole.value) {
    result = result.filter(member => member.role === filterRole.value);
  }
  
  return result;
});

function openNewDialog() {
  isEditing.value = false;
  formData.value = { name: '', email: '', role: 'Viewer', org: '', status: 'active' };
  showDialog.value = true;
}

function openEditDialog(member) {
  isEditing.value = true;
  editingId.value = member.id;
  formData.value = { ...member };
  showDialog.value = true;
}

function closeDialog() {
  showDialog.value = false;
  isEditing.value = false;
  editingId.value = null;
  formData.value = { name: '', email: '', role: 'Viewer', org: '', status: 'active' };
}

function saveMember() {
  if (formData.value.name.trim() && formData.value.email.trim()) {
    if (isEditing.value) {
      store.updateMember(editingId.value, formData.value);
    } else {
      store.addMember(formData.value);
    }
    closeDialog();
  }
}

function deleteMember(id) {
  if (confirm('Are you sure you want to delete this member?')) {
    store.deleteMember(id);
  }
}

const organizations = computed(() => {
  return [...new Set(store.organizations.map(o => o.name))];
});
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">Team</span>
        <h1>Members</h1>
        <p>Manage team members and their access levels.</p>
      </div>
      <Button icon="plus" @click="openNewDialog">Add member</Button>
    </header>

    <Card class="filters">
      <div class="filter-row">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="search-input flex-grow"
        />
        <select v-model="filterRole" class="filter-select">
          <option value="">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
    </Card>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Organization</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in filteredMembers" :key="member.id">
            <td><strong>{{ member.name }}</strong></td>
            <td>{{ member.email }}</td>
            <td>
              <span class="badge" :class="`badge-${member.role.toLowerCase()}`">
                {{ member.role }}
              </span>
            </td>
            <td>{{ member.org }}</td>
            <td>
              <span class="badge" :class="member.status === 'active' ? 'badge-success' : 'badge-secondary'">
                {{ member.status }}
              </span>
            </td>
            <td>{{ member.joined }}</td>
            <td>
              <div class="action-buttons">
                <Button size="sm" variant="secondary" icon="pencil" @click="openEditDialog(member)" />
                <Button size="sm" variant="danger" icon="trash" @click="deleteMember(member.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Alert v-if="filteredMembers.length === 0" variant="info" title="No results" message="No members found matching your criteria." />
    </div>

    <!-- Dialog -->
    <div v-if="showDialog" class="modal-overlay" @click="closeDialog">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit member' : 'Add new member' }}</h2>
          <button class="modal-close" @click="closeDialog">&times;</button>
        </div>
        <form @submit.prevent="saveMember" class="modal-body">
          <div class="form-group">
            <label>Full name *</label>
            <input v-model="formData.name" type="text" placeholder="Enter full name" required />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="formData.email" type="email" placeholder="Enter email address" required />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select v-model="formData.role">
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div class="form-group">
            <label>Organization</label>
            <select v-model="formData.org">
              <option v-for="org in organizations" :key="org" :value="org">{{ org }}</option>
            </select>
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
            <Button type="submit">{{ isEditing ? 'Update' : 'Add' }} member</Button>
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

.badge-secondary {
  background: #e2e3e5;
  color: #383d41;
}

.badge-admin {
  background: #d1ecf1;
  color: #0c5460;
}

.badge-editor {
  background: #fff3cd;
  color: #856404;
}

.badge-viewer {
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
