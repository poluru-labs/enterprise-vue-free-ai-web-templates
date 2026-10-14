<script setup>
import { computed, ref } from 'vue';
import { Card, ProgressBar, Switch, Tabs, Tag } from '@poluru-labs/enterprise-design-system-vue';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const store = useDevops();
const kind = ref('all');
const watchOnly = ref(false);

const rows = computed(() =>
  store.infra.filter((item) => {
    const matchesKind = kind.value === 'all' || item.kind === kind.value;
    const matchesWatch = !watchOnly.value || item.status !== 'healthy';
    return matchesKind && matchesWatch;
  }),
);
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Infrastructure"
      description="Clusters, databases, queues, and caches."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Infrastructure' }]"
    >
      <template #actions>
        <Switch v-model="watchOnly" label="Needs a look" />
      </template>
    </PageHeader>

    <Tabs
      v-model="kind"
      :items="[
        { id: 'all', label: 'All' },
        { id: 'cluster', label: 'Clusters' },
        { id: 'database', label: 'Databases' },
        { id: 'queue', label: 'Queues' },
        { id: 'cache', label: 'Caches' },
      ]"
    />

    <div class="row g-3 mt-1">
      <div v-for="item in rows" :key="item.id" class="col-12 col-md-6 col-xl-4">
        <Card :title="item.name" :description="item.note">
          <div class="tde-stack">
            <div class="tde-card-meta">
              <StatusBadge :status="item.status" />
              <Tag :label="item.kind" variant="brand" />
            </div>
            <ProgressBar label="CPU" :value="item.cpu" show-value />
            <ProgressBar label="Memory" :value="item.memory" show-value />
            <p class="tde-subtle mb-0">{{ item.owner }} · {{ item.region }}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
