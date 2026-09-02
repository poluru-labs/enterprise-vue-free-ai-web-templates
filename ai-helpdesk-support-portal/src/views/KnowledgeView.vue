<script setup>
import { computed, ref } from 'vue';
import { Search } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useHelpdesk } from '../stores/helpdesk.js';
import { formatDate, formatNumber } from '../utils/format.js';
import { searchRecords } from '../utils/search.js';
import DataTable from '../components/widgets/DataTable.vue';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const columns = [
  { key: 'title', label: 'Article' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'views', label: 'Views' },
  { key: 'updated', label: 'Updated' },
];

const store = useHelpdesk();
const query = ref('');
const rows = computed(() =>
  searchRecords(store.state.knowledge, query.value, ['title', 'category', 'summary']),
);
</script>

<template>
  <div class="lumen-page">
    <PageHeader
      title="Knowledge"
      description="Help articles agents insert into Lumen replies."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Knowledge' }]"
    />

    <FilterBar>
      <template #search>
        <Search v-model="query" placeholder="Search articles" />
      </template>
    </FilterBar>

    <section class="lumen-panel">
      <div class="lumen-panel-body">
        <DataTable :columns="columns" :rows="rows" empty-title="No articles">
          <template #title="{ value, row }">
            <strong>{{ value }}</strong>
            <p class="lumen-subtle mb-0">{{ row.summary }}</p>
          </template>
          <template #status="{ value }"><StatusBadge :status="value" /></template>
          <template #views="{ value }">{{ formatNumber(value) }}</template>
          <template #updated="{ value }">{{ formatDate(value) }}</template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
