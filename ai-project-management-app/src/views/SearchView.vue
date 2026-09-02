<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { workspace } from '../stores/projects.js';
import { searchRecords } from '../utils/search.js';
import ChartSection from '../components/widgets/ChartSection.vue';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const route = useRoute();
const router = useRouter();
const query = ref(String(route.query.q || ''));

watch(
  () => route.query.q,
  (value) => {
    query.value = String(value || '');
  },
);

function syncQuery(value) {
  query.value = value;
  router.replace({ path: `${BASE_PATH}/search`, query: value ? { q: value } : {} });
}

const issueHits = computed(() => searchRecords(workspace.issues, query.value, ['key', 'title', 'assignee', 'labels']));
const riskHits = computed(() => searchRecords(workspace.risks, query.value, ['title', 'owner', 'impact']));
const teamHits = computed(() => searchRecords(workspace.teams, query.value, ['name', 'lead', 'focus']));
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Search"
      description="Issues, risks, and teams in one pass."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Search' }]"
    />

    <FilterBar :on-reset="() => syncQuery('')">
      <template #search>
        <Search :model-value="query" placeholder="KEEL-124, Maya, Platform…" @update:model-value="syncQuery" />
      </template>
    </FilterBar>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Issues" :subtitle="`${issueHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'key', label: 'Key' },
              { key: 'title', label: 'Issue' },
              { key: 'assignee', label: 'Owner' },
              { key: 'column', label: 'Column' },
            ]"
            :rows="issueHits"
            empty-title="No issues"
            empty-description="Try a key or assignee."
            @row-click="() => router.push(`${BASE_PATH}/board`)"
          >
            <template #column="{ value }">
              <StatusBadge :status="value" />
            </template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Risks" :subtitle="`${riskHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'title', label: 'Risk' },
              { key: 'owner', label: 'Owner' },
              { key: 'severity', label: 'Severity' },
            ]"
            :rows="riskHits"
            empty-title="No risks"
            @row-click="() => router.push(`${BASE_PATH}/risks`)"
          >
            <template #severity="{ value }">
              <StatusBadge :status="value" />
            </template>
          </DataTable>
        </ChartSection>
      </div>
      <div class="col-12">
        <ChartSection title="Teams" :subtitle="`${teamHits.length} matches`">
          <DataTable
            :columns="[
              { key: 'name', label: 'Team' },
              { key: 'lead', label: 'Lead' },
              { key: 'focus', label: 'Focus' },
              { key: 'load', label: 'Load' },
            ]"
            :rows="teamHits"
            empty-title="No teams"
            @row-click="() => router.push(`${BASE_PATH}/teams`)"
          />
        </ChartSection>
      </div>
    </div>
  </div>
</template>
