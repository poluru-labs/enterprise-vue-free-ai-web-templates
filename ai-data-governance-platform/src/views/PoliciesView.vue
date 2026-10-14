<script setup>
import { computed, ref } from 'vue';
import { Card, ProgressBar, Switch, Tabs, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useGovernance();
const status = ref('all');
const draftsOnly = ref(false);

const rows = computed(() =>
  store.policies.filter((item) => {
    const matchesTab = status.value === 'all' || item.status === status.value;
    const matchesDraft = !draftsOnly.value || item.status === 'draft';
    return matchesTab && matchesDraft;
  }),
);
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Policies"
      description="Retention, access, and what can leave the registry."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Policies' }]"
    >
      <template #actions>
        <Switch v-model="draftsOnly" label="Drafts only" />
      </template>
    </PageHeader>

    <Tabs
      v-model="status"
      :items="[
        { id: 'all', label: 'All' },
        { id: 'published', label: 'Published' },
        { id: 'review', label: 'In review' },
        { id: 'draft', label: 'Draft' },
      ]"
    />

    <div class="row g-3 mt-1">
      <div v-for="policy in rows" :key="policy.id" class="col-12 col-md-6 col-xl-4">
        <Card :title="policy.title" :description="policy.summary">
          <div class="cbt-stack">
            <div class="cbt-card-meta">
              <StatusBadge :status="policy.status" />
              <Tag :label="`v${policy.version}`" variant="brand" />
            </div>
            <ProgressBar label="Coverage" :value="policy.coverage" show-value />
            <p class="cbt-subtle mb-0">{{ policy.owner }} · {{ policy.domain }} · {{ formatDate(policy.updated) }}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
