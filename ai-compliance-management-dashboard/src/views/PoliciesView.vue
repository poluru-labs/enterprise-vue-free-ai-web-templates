<script setup>
import { computed, ref } from 'vue';
import { Avatar, Card, ProgressBar, Switch, Tabs, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useCompliance } from '../stores/compliance.js';
import { formatDate } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useCompliance();
const tab = ref('all');
const remind = ref(true);

const rows = computed(() => {
  if (tab.value === 'all') return store.policies;
  return store.policies.filter((item) => item.status === tab.value);
});
</script>

<template>
  <div class="aeg-page">
    <PageHeader
      title="Policies"
      description="Published notices, acknowledgments, and reviews."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Policies' }]"
    />

    <div class="row g-3 mb-3">
      <div class="col-6 col-xl-3">
        <StatCard label="Policies" :value="store.policies.length" icon="bi-journal-text" tone="brand" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard label="Published" :value="store.publishedPolicies.length" icon="bi-check2-circle" tone="success" />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="In review"
          :value="store.policies.filter((item) => item.status === 'review').length"
          icon="bi-pencil-square"
          tone="warning"
        />
      </div>
      <div class="col-6 col-xl-3">
        <StatCard
          label="Avg ack"
          :value="`${Math.round(store.policies.reduce((sum, item) => sum + item.acknowledgments, 0) / store.policies.length)}%`"
          icon="bi-people"
          tone="info"
        />
      </div>
    </div>

    <div class="aeg-filter-bar">
      <Tabs
        v-model="tab"
        :items="[
          { id: 'all', label: 'All' },
          { id: 'published', label: 'Published' },
          { id: 'review', label: 'Review' },
          { id: 'draft', label: 'Draft' },
        ]"
      />
      <Switch v-model="remind" label="Remind Meera Poluru on overdue acks" />
    </div>

    <div class="row g-3">
      <div v-for="policy in rows" :key="policy.id" class="col-12 col-md-6 col-xl-4">
        <Card :title="policy.title" :description="policy.summary">
          <div class="aeg-stack">
            <div class="aeg-card-meta">
              <StatusBadge :status="policy.status" />
              <Tag :label="`v${policy.version}`" />
            </div>
            <ProgressBar label="Acknowledgments" :value="policy.acknowledgments" show-value />
            <div class="aeg-model-cell">
              <Avatar :name="policy.owner" size="sm" />
              <div>
                <strong>{{ policy.owner }}</strong>
                <p class="aeg-subtle mb-0">{{ policy.audience }} · {{ formatDate(policy.updated) }}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
