<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Button, Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import {
  BREADCRUMB_ROOT,
  DEPARTMENT_OPTIONS,
  LOCATION_OPTIONS,
  STATUS_OPTIONS,
} from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { searchRecords } from '../utils/search.js';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import PersonCard from '../components/widgets/PersonCard.vue';
import StatCard from '../components/widgets/StatCard.vue';

const ALL = [{ value: 'all', label: 'All' }];
const route = useRoute();
const store = useHr();
const query = ref('');
const department = ref('all');
const location = ref('all');
const status = ref('all');

const rows = computed(() => {
  let list = store.state.people;
  if (department.value !== 'all') list = list.filter((item) => item.department === department.value);
  if (location.value !== 'all') list = list.filter((item) => item.location === location.value);
  if (status.value !== 'all') list = list.filter((item) => item.status === status.value);
  return searchRecords(list, query.value, ['name', 'email', 'title', 'department', 'location']);
});

watch(
  () => route.query.new,
  (value) => {
    if (value === '1') store.setAddEmployeeOpen(true);
  },
  { immediate: true },
);

function reset() {
  query.value = '';
  department.value = 'all';
  location.value = 'all';
  status.value = 'all';
}
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="People"
      description="Directory for Grove. Filter by team, location, or leave status."
      :crumbs="[BREADCRUMB_ROOT, { label: 'People' }]"
    >
      <template #actions>
        <Button size="sm" icon="plus" @click="store.setAddEmployeeOpen(true)">Add employee</Button>
      </template>
    </PageHeader>

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Directory" :value="store.headcount" icon="bi-people" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="On leave" :value="store.onLeavePeople.length" icon="bi-calendar-heart" tone="warning" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Austin" :value="store.people.filter((item) => item.location === 'Austin').length" icon="bi-geo" tone="info" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="success" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search name, title, email" />
      </template>
      <Select v-model="department" label="Department" :options="[...ALL, ...DEPARTMENT_OPTIONS]" size="sm" />
      <Select v-model="location" label="Location" :options="[...ALL, ...LOCATION_OPTIONS]" size="sm" />
      <Select v-model="status" label="Status" :options="[...ALL, ...STATUS_OPTIONS]" size="sm" />
    </FilterBar>

    <div class="row g-3">
      <div v-for="person in rows" :key="person.id" class="col-12 col-sm-6 col-xl-4 col-xxl-3">
        <PersonCard :person="person" />
      </div>
    </div>
  </div>
</template>
