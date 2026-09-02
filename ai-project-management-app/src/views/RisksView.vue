<script setup>
import { computed, ref } from 'vue';
import { Search, Select } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { workspace } from '../stores/projects.js';
import { searchRecords } from '../utils/search.js';
import { formatShortDate } from '../utils/format.js';
import FilterBar from '../components/widgets/FilterBar.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const query = ref('');
const severity = ref('');
const severityOptions = [
  { value: '', label: 'All severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const filtered = computed(() => {
  let rows = searchRecords(workspace.risks, query.value, ['title', 'owner', 'impact']);
  if (severity.value) rows = rows.filter((item) => item.severity === severity.value);
  return rows;
});
</script>

<template>
  <div class="keel-page">
    <PageHeader
      title="Risks"
      description="Equal-height risk cards. The identity freeze on Sep 4 is the only critical item."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Risks' }]"
    />

    <FilterBar :on-reset="() => { query = ''; severity = ''; }">
      <template #search>
        <Search v-model="query" placeholder="Auth, QA, Maya…" />
      </template>
      <Select v-model="severity" :options="severityOptions" size="sm" />
    </FilterBar>

    <div class="row g-3">
      <div v-for="risk in filtered" :key="risk.id" class="col-12 col-sm-6 col-xl-4">
        <article class="keel-risk-card">
          <header>
            <h3>{{ risk.title }}</h3>
            <StatusBadge :status="risk.severity" />
          </header>
          <p>{{ risk.impact }}</p>
          <footer>
            <div>
              <strong>{{ risk.owner }}</strong>
              <div class="keel-muted">{{ risk.exposure }} · due {{ formatShortDate(risk.due) }}</div>
            </div>
            <StatusBadge :status="risk.status" />
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>
