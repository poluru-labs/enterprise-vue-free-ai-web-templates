<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Button, Input, Modal, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, ROLE_OPTIONS } from '../constants/navigation.js';
import { useWorkspace } from '../stores/workspace.js';
import { formatDate } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'org', label: 'Organization' },
  { key: 'status', label: 'Status' },
  { key: 'joined', label: 'Joined' },
  { key: 'actions', label: 'Actions' },
];

const ROLE_FILTERS = [{ label: 'All roles', value: 'all' }, ...ROLE_OPTIONS];
const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Invited', value: 'invited' },
  { label: 'Inactive', value: 'inactive' },
];

const route = useRoute();
const store = useWorkspace();
const query = ref('');
const role = ref('all');
const showDialog = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const form = ref({ name: '', email: '', role: 'Viewer', orgId: '', status: 'active' });

const orgOptions = computed(() => store.state.tenants.map((item) => ({ value: item.id, label: item.name })));

const rows = computed(() => {
  const filtered = store.state.members.filter((member) => role.value === 'all' || member.role === role.value);
  return searchRecords(filtered, query.value, ['name', 'email', 'org', 'role']);
});

watch(
  () => route.query.invite,
  (value) => {
    if (value === '1') store.setInviteOpen(true);
  },
  { immediate: true },
);

function openNew() {
  isEditing.value = false;
  editingId.value = null;
  form.value = {
    name: '',
    email: '',
    role: 'Viewer',
    orgId: store.state.selectedTenantId || store.state.tenants[0]?.id || '',
    status: 'active',
  };
  showDialog.value = true;
}

function openEdit(member) {
  isEditing.value = true;
  editingId.value = member.id;
  form.value = {
    name: member.name,
    email: member.email,
    role: member.role,
    orgId: member.orgId,
    status: member.status,
  };
  showDialog.value = true;
}

function saveMember() {
  if (!form.value.name.trim() || !form.value.email.trim()) {
    showToast({ title: 'Name and email required', variant: 'warning' });
    return;
  }
  if (isEditing.value) {
    store.updateMember(editingId.value, form.value);
    showToast({ title: 'Member updated', variant: 'success' });
  } else {
    store.addMember(form.value);
    showToast({ title: 'Member added', variant: 'success' });
  }
  showDialog.value = false;
}

function removeMember(member) {
  store.deleteMember(member.id);
  showToast({ title: 'Member removed', description: member.name, variant: 'warning' });
}
</script>

<template>
  <div class="hbr-page">
    <PageHeader
      title="Members"
      description="Seats across every Harbor workspace. Invite from here or the header."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Members' }]"
    >
      <template #actions>
        <Button size="sm" icon="user" @click="store.setInviteOpen(true)">Invite member</Button>
        <Button size="sm" variant="secondary" icon="plus" @click="openNew">Add member</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="People" :value="store.members.length" icon="bi-people" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Active" :value="store.activeMembers" icon="bi-check-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Invited"
          :value="store.members.filter((item) => item.status === 'invited').length"
          icon="bi-envelope"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Inactive"
          :value="store.members.filter((item) => item.status === 'inactive').length"
          icon="bi-slash-circle"
          tone="danger"
        />
      </div>
    </div>

    <FilterBar :on-reset="() => { query = ''; role = 'all'; }">
      <template #search>
        <Search v-model="query" placeholder="Search people or tenants" />
      </template>
      <Select v-model="role" label="Role" :options="ROLE_FILTERS" />
    </FilterBar>

    <div class="hbr-panel">
      <div class="hbr-panel-body">
        <DataTable :columns="columns" :rows="rows" empty-title="No members">
          <template #name="{ value }"><strong>{{ value }}</strong></template>
          <template #email="{ value }">{{ value }}</template>
          <template #role="{ value }">{{ value }}</template>
          <template #org="{ value }">{{ value }}</template>
          <template #status="{ value }"><StatusBadge :status="value" /></template>
          <template #joined="{ value }">{{ formatDate(value) }}</template>
          <template #actions="{ row }">
            <div class="hbr-row-actions">
              <Button size="sm" variant="tertiary" icon="edit" icon-only accessible-label="Edit" @click="openEdit(row)" />
              <Button size="sm" variant="danger" icon="trash" icon-only accessible-label="Delete" @click="removeMember(row)" />
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <Modal :open="showDialog" :heading="isEditing ? 'Edit member' : 'Add member'" @update:open="showDialog = $event">
      <div class="hbr-form-stack">
        <Input v-model="form.name" label="Full name" placeholder="Ananya Poluru" />
        <Input v-model="form.email" label="Email" type="email" placeholder="ananya.poluru@northwind.example" />
        <Select v-model="form.role" label="Role" :options="ROLE_OPTIONS" />
        <Select v-model="form.orgId" label="Tenant" :options="orgOptions" />
        <Select v-model="form.status" label="Status" :options="STATUS_OPTIONS" />
      </div>
      <template #footer>
        <Button variant="secondary" @click="showDialog = false">Cancel</Button>
        <Button @click="saveMember">{{ isEditing ? 'Update' : 'Add' }}</Button>
      </template>
    </Modal>
  </div>
</template>
