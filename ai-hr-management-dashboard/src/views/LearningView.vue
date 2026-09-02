<script setup>
import { computed, ref } from 'vue';
import { Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { formatNumber } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import CourseCard from '../components/widgets/CourseCard.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';

const store = useHr();
const query = ref('');
const category = ref('all');

const categories = computed(() => [
  { value: 'all', label: 'All categories' },
  ...[...new Set(store.state.courses.map((item) => item.category))].map((value) => ({
    value,
    label: value,
  })),
]);

const rows = computed(() => {
  const list =
    category.value === 'all'
      ? store.state.courses
      : store.state.courses.filter((item) => item.category === category.value);
  return searchRecords(list, query.value, ['title', 'category', 'instructor', 'summary']);
});

function reset() {
  query.value = '';
  category.value = 'all';
}
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Learning"
      description="Equal-height course cards for Grove’s Q3 programs."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Learning' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Courses" :value="store.courses.length" icon="bi-mortarboard" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Hours logged" :value="formatNumber(store.learningHours)" icon="bi-clock-history" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Enrolled seats"
          :value="store.courses.reduce((sum, item) => sum + item.enrolled, 0)"
          icon="bi-people"
          tone="info"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Showing" :value="rows.length" icon="bi-funnel" tone="warning" />
      </div>
    </div>

    <FilterBar :on-reset="reset">
      <template #search>
        <Search v-model="query" placeholder="Search courses" />
      </template>
      <Select v-model="category" label="Category" :options="categories" size="sm" />
    </FilterBar>

    <div class="row g-3">
      <div v-for="course in rows" :key="course.id" class="col-12 col-md-6 col-xl-4">
        <CourseCard :course="course" />
      </div>
    </div>
  </div>
</template>
