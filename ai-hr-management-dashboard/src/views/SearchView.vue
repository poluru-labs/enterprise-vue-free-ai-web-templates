<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHr } from '../stores/hr.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const store = useHr();

const query = computed(() => String(route.query.q || ''));

function setQuery(value) {
  router.replace(value ? { path: `${BASE_PATH}/search`, query: { q: value } } : { path: `${BASE_PATH}/search` });
}

const peopleHits = computed(() =>
  searchRecords(store.state.people, query.value, ['name', 'email', 'title', 'department', 'location']),
);
const leaveHits = computed(() =>
  searchRecords(store.state.leave, query.value, ['personName', 'type', 'note', 'status']),
);
const reqHits = computed(() =>
  searchRecords(store.state.reqs, query.value, ['title', 'department', 'recruiter', 'location']),
);
</script>

<template>
  <div class="grove-page">
    <PageHeader
      title="Search"
      description="People, leave, and open reqs across Grove."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <div class="grove-filter-bar mb-3">
      <div class="grove-filter-search">
        <Search
          :model-value="query"
          placeholder="Search people, leave, reqs"
          @update:model-value="setQuery"
        />
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <ChartSection title="People" :subtitle="`${peopleHits.length} matches`">
          <DataTable
            :columns="[{ key: 'name', label: 'Person' }, { key: 'status', label: 'Status' }]"
            :rows="peopleHits"
            empty-title="No people"
            @row-click="(row) => router.push(`${BASE_PATH}/people/${row.id}`)"
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Leave" :subtitle="`${leaveHits.length} matches`">
          <DataTable
            :columns="[{ key: 'personName', label: 'Person' }, { key: 'type', label: 'Type' }]"
            :rows="leaveHits"
            empty-title="No leave"
            @row-click="() => router.push(`${BASE_PATH}/leave`)"
          />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-4">
        <ChartSection title="Reqs" :subtitle="`${reqHits.length} matches`">
          <DataTable
            :columns="[{ key: 'title', label: 'Req' }, { key: 'status', label: 'Status' }]"
            :rows="reqHits"
            empty-title="No reqs"
            @row-click="() => router.push(`${BASE_PATH}/hiring`)"
          >
            <template #status="{ value }"><StatusBadge :status="value" /></template>
          </DataTable>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
