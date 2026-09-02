<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Avatar, Button, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { formatDate, formatNumber } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useHr();

const person = computed(() => store.getPerson(route.params.id));
const leave = computed(() => (person.value ? store.leaveForPerson(person.value.id) : []));
const reports = computed(() =>
  person.value ? store.state.people.filter((item) => item.manager === person.value.name) : [],
);

if (!person.value) {
  router.replace(`${BASE_PATH}/people`);
}
</script>

<template>
  <div v-if="person" class="grove-page">
    <PageHeader
      :title="person.name"
      :description="`${person.title} · ${person.department} · ${person.location}`"
      :crumbs="[BREADCRUMB_ROOT, { label: 'People', to: `${BASE_PATH}/people` }, { label: person.name }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          @click="showToast({ title: 'Profile exported', variant: 'success' })"
        >
          Export
        </Button>
        <Button size="sm" icon="plus" @click="store.setAddEmployeeOpen(true)">Add employee</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="PTO balance" :value="`${person.ptoBalance}d`" icon="bi-calendar-heart" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Learning" :value="`${person.learningHours}h`" icon="bi-mortarboard" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Start date" :value="formatDate(person.startDate)" icon="bi-flag" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Reports" :value="formatNumber(reports.length)" icon="bi-diagram-3" tone="warning" />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-5">
        <ChartSection title="Profile" :subtitle="person.email">
          <div class="grove-profile-block">
            <Avatar :name="person.name" size="lg" />
            <div>
              <StatusBadge :status="person.status" />
              <p class="grove-subtle mt-2 mb-0">{{ person.pronouns || 'Pronouns not set' }}</p>
            </div>
          </div>
          <dl class="grove-settings-list mt-3">
            <div>
              <dt>Manager</dt>
              <dd>{{ person.manager || '—' }}</dd>
            </div>
            <div>
              <dt>Employment</dt>
              <dd>{{ person.employmentType }}</dd>
            </div>
            <div>
              <dt>Department</dt>
              <dd>{{ person.department }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ person.location }}</dd>
            </div>
          </dl>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-7">
        <ChartSection title="Leave history" :subtitle="`${leave.length} requests`">
          <DataTable
            :columns="[
              { key: 'type', label: 'Type' },
              { key: 'start', label: 'Start' },
              { key: 'end', label: 'End' },
              { key: 'days', label: 'Days' },
              { key: 'status', label: 'Status' },
            ]"
            :rows="leave"
            empty-title="No leave on file"
            empty-description="This person has no PTO history in Grove yet."
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
