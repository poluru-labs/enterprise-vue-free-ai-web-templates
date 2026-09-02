<script setup>
import { computed, ref } from 'vue';
import { Button, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { moveIssue, openIssueModal, workspace } from '../stores/projects.js';
import { searchRecords } from '../utils/search.js';
import { formatShortDate } from '../utils/format.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const query = ref('');
const typeFilter = ref('');
const typeOptions = [
  { value: '', label: 'All types' },
  { value: 'story', label: 'Story' },
  { value: 'bug', label: 'Bug' },
  { value: 'task', label: 'Task' },
];

const ranked = computed(() => {
  let rows = workspace.issues.filter((item) => !item.sprintId);
  rows = searchRecords(rows, query.value, ['key', 'title', 'assignee', 'labels']);
  if (typeFilter.value) rows = rows.filter((item) => item.type === typeFilter.value);
  return rows;
});

function pullIntoSprint(row) {
  row.sprintId = workspace.selectedSprintId;
  moveIssue(row.id, 'todo');
  showToast({
    title: 'Pulled into sprint',
    description: `${row.key} is now To do on the current board.`,
    variant: 'success',
  });
}
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Backlog"
      description="Ranked work that is not yet on Sprint 24. Pull a row to put it on the board."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Backlog' }]"
    >
      <template #actions>
        <Button icon="plus" @click="openIssueModal()">New issue</Button>
      </template>
    </PageHeader>

    <FilterBar :on-reset="() => { query = ''; typeFilter = ''; }">
      <template #search>
        <Search v-model="query" placeholder="KEEL-133, calendar, Priya…" />
      </template>
      <Select v-model="typeFilter" :options="typeOptions" size="sm" />
    </FilterBar>

    <ChartSection title="Unscheduled" :subtitle="`${ranked.length} issues`">
      <DataTable
        :columns="[
          { key: 'key', label: 'Key' },
          { key: 'title', label: 'Issue' },
          { key: 'type', label: 'Type' },
          { key: 'points', label: 'Pts' },
          { key: 'priority', label: 'Priority' },
          { key: 'assignee', label: 'Owner' },
          { key: 'updated', label: 'Updated' },
        ]"
        :rows="ranked"
        empty-title="Backlog is empty"
        empty-description="Everything is already on a sprint."
        @row-click="pullIntoSprint"
      >
        <template #type="{ value }">
          <StatusBadge :status="value" />
        </template>
        <template #priority="{ value }">
          <StatusBadge :status="value" />
        </template>
        <template #updated="{ value }">
          {{ formatShortDate(value) }}
        </template>
      </DataTable>
    </ChartSection>
  </div>
</template>
