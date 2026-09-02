<script setup>
import { computed, ref } from 'vue';
import { Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT, DEPARTMENT_OPTIONS } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { searchRecords } from '../utils/search.js';
import BarChart from '../components/charts/BarChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import ReqCard from '../components/widgets/ReqCard.vue';
import StatCard from '../components/widgets/StatCard.vue';

const ALL = [{ value: 'all', label: 'All' }];
const store = useHr();
const query = ref('');
const department = ref('all');
const status = ref('all');

const STATUS_FILTERS = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'on_hold', label: 'On hold' },
];

const rows = computed(() => {
  let list = store.state.reqs;
  if (department.value !== 'all') list = list.filter((item) => item.department === department.value);
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  return searchRecords(list, query.value, ['title', 'department', 'recruiter', 'location']);
});

const pipelineBars = computed(() => {
  const stages = ['applied', 'screen', 'interview', 'offer', 'hired'];
  const colors = ['#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#5B21B6'];
  return stages.map((name, index) => ({
    name,
    value: store.state.reqs.reduce((sum, req) => sum + Number(req.pipeline?.[name] || 0), 0),
    color: colors[index],
  }));
});

function reset() {
  query.value = '';
  department.value = 'all';
  status.value = 'all';
}
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Hiring"
      description="Open requisitions and the Grove pipeline. Equal-height req cards."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Hiring' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Open roles" :value="store.openRolesCount" icon="bi-briefcase" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Live reqs" :value="store.openReqs.length" icon="bi-lightning" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="In interview"
          :value="pipelineBars.find((item) => item.name === 'interview')?.value || 0"
          icon="bi-chat-dots"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Offers"
          :value="pipelineBars.find((item) => item.name === 'offer')?.value || 0"
          icon="bi-award"
          tone="success"
        />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search reqs, recruiters, teams" />
      </template>
      <Select v-model="department" label="Department" :options="[...ALL, ...DEPARTMENT_OPTIONS]" size="sm" />
      <Select v-model="status" label="Status" :options="STATUS_FILTERS" size="sm" />
    </FilterBar>

    <div class="row g-3 mb-3">
      <div v-for="req in rows" :key="req.id" class="col-12 col-md-6 col-xl-4">
        <ReqCard :req="req" />
      </div>
    </div>

    <ChartSection title="Pipeline" subtitle="Candidates across every Grove req">
      <BarChart :items="pipelineBars" />
    </ChartSection>
  </div>
</template>
