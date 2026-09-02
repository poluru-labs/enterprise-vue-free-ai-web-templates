<script setup>
import { computed } from 'vue';
import { Button, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, NEXT_HOLIDAY } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { formatDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import PersonCard from '../components/widgets/PersonCard.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useHr();
const weekDays = ['Mon 1', 'Tue 2', 'Wed 3', 'Thu 4', 'Fri 5'];

const weekGrid = computed(() =>
  store.onLeaveThisWeek.map((person) => {
    const rows = store.leaveForPerson(person.id).filter((item) => item.status !== 'denied');
    return { person, rows };
  }),
);

function approve(row) {
  const item = store.approveLeave(row.id);
  if (!item) return;
  showToast({
    title: 'Leave approved',
    description: `${item.personName} · ${item.type} ${item.start}–${item.end}`,
    variant: 'success',
  });
}

function deny(row) {
  const item = store.denyLeave(row.id);
  if (!item) return;
  showToast({
    title: 'Leave denied',
    description: item.personName,
    variant: 'warning',
  });
}
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Leave"
      description="PTO calendar for the week of 1 Sep 2026. Next holiday is Labor Day."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Leave' }]"
    >
      <template #actions>
        <Button
          variant="secondary"
          size="sm"
          @click="showToast({ title: 'Calendar exported', variant: 'success' })"
        >
          Export
        </Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Out this week" :value="store.onLeaveThisWeek.length" icon="bi-people" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Pending" :value="store.pendingLeave.length" icon="bi-hourglass-split" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard :label="NEXT_HOLIDAY.name" :value="formatDate(NEXT_HOLIDAY.date)" icon="bi-calendar3" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Requests" :value="store.leave.length" icon="bi-journal-text" tone="success" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12">
        <ChartSection title="This week" subtitle="Who is out Monday–Friday">
          <div class="grove-week-grid">
            <div class="grove-week-head">
              <span>Person</span>
              <span v-for="day in weekDays" :key="day">{{ day }}</span>
            </div>
            <div v-for="row in weekGrid" :key="row.person.id" class="grove-week-row">
              <strong>{{ row.person.name }}</strong>
              <span
                v-for="day in weekDays"
                :key="day"
                class="grove-week-cell"
                :class="{ 'is-out': true }"
              >
                Out
              </span>
            </div>
          </div>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div v-for="person in store.onLeaveThisWeek" :key="person.id" class="col-12 col-md-6 col-xl-4">
        <PersonCard :person="person" />
      </div>
    </div>

    <ChartSection title="Requests" subtitle="Approve pending PTO from this list">
      <DataTable
        :columns="[
          { key: 'personName', label: 'Person' },
          { key: 'type', label: 'Type' },
          { key: 'start', label: 'Start' },
          { key: 'end', label: 'End' },
          { key: 'days', label: 'Days' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions' },
        ]"
        :rows="store.leave"
        empty-title="No leave requests"
      >
        <template #status="{ value }"><StatusBadge :status="value" /></template>
        <template #actions="{ row }">
          <div class="grove-row-actions">
            <Button
              v-if="row.status === 'pending'"
              size="sm"
              @click.stop="approve(row)"
            >
              Approve
            </Button>
            <Button
              v-if="row.status === 'pending'"
              variant="secondary"
              size="sm"
              @click.stop="deny(row)"
            >
              Deny
            </Button>
          </div>
        </template>
      </DataTable>
    </ChartSection>
  </div>
</template>
