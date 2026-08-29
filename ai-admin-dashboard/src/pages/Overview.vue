<script setup>
import { ref } from 'vue';
import { Alert, Button, Card, Stat } from '@poluru-labs/enterprise-design-system-vue';
import { useStore } from '../store';

const store = useStore();
const showNewOrgDialog = ref(false);
const newOrgForm = ref({ name: '', plan: 'Professional', members: 0 });

function openNewOrgDialog() {
  showNewOrgDialog.value = true;
}

function closeNewOrgDialog() {
  showNewOrgDialog.value = false;
  newOrgForm.value = { name: '', plan: 'Professional', members: 0 };
}

function createOrganization(e) {
  e.preventDefault();
  if (newOrgForm.value.name.trim()) {
    store.addOrganization({
      name: newOrgForm.value.name,
      plan: newOrgForm.value.plan,
      status: 'active',
      members: parseInt(newOrgForm.value.members) || 0,
    });
    closeNewOrgDialog();
  }
}

const totalOrganizations = () => store.organizations.length;
const totalMembers = () => store.members.length;
const totalFlags = () => store.featureFlags.length;
const stableFlags = () => store.featureFlags.filter(f => f.status === 'stable').length;
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <span class="eyebrow">Control plane</span>
        <h1>Overview</h1>
        <p>Organizations, seats, flags, and workspace settings for your AI platform.</p>
      </div>
      <Button icon="plus" @click="openNewOrgDialog">New organization</Button>
    </header>

    <Alert class="mb-4" variant="info" title="Welcome" message="Manage your organizations, team members, feature flags, and settings from this dashboard." />

    <section class="metrics" aria-label="Key metrics">
      <Card>
        <Stat label="Organizations" :value="totalOrganizations().toString()" hint="+2 this month" trend="up" trend-value="+8.5%" />
      </Card>
      <Card>
        <Stat label="Active members" :value="totalMembers().toString()" hint="85% utilization" trend="up" trend-value="+12.3%" />
      </Card>
      <Card>
        <Stat label="Feature flags" :value="totalFlags().toString()" hint="5 in rollout" trend="flat" trend-value="Stable" />
      </Card>
      <Card>
        <Stat label="Stable flags" :value="stableFlags().toString()" hint="Production ready" trend="up" trend-value="+2" />
      </Card>
    </section>

    <!-- New Organization Modal -->
    <div v-if="showNewOrgDialog" class="modal-overlay" @click="closeNewOrgDialog">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Create new organization</h2>
          <button class="modal-close" @click="closeNewOrgDialog">&times;</button>
        </div>
        <form @submit="createOrganization" class="modal-body">
          <div class="form-group">
            <label>Organization name *</label>
            <input v-model="newOrgForm.name" type="text" placeholder="Enter organization name" required />
          </div>
          <div class="form-group">
            <label>Plan</label>
            <select v-model="newOrgForm.plan">
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div class="form-group">
            <label>Team members</label>
            <input v-model.number="newOrgForm.members" type="number" placeholder="0" />
          </div>
          <div class="modal-footer">
            <Button variant="secondary" @click="closeNewOrgDialog">Cancel</Button>
            <Button type="submit">Create organization</Button>
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

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
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
