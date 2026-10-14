<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  Pagination,
  ProgressBar,
  Search,
  SegmentedControl,
  Select,
  Skeleton,
  Spinner,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, ENV_OPTIONS } from '../constants/navigation.js';
import { useDevops } from '../stores/devops.js';
import { formatPercent } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useDevops();
const query = ref('');
const environment = ref('all');
const status = ref('all');
const page = ref(1);
const refreshing = ref(false);
const pageSize = 6;

const filtered = computed(() =>
  store.pipelines.filter((item) => {
    const haystack = `${item.name} ${item.owner} ${item.service}`.toLowerCase();
    const matchesQuery = !query.value || haystack.includes(query.value.trim().toLowerCase());
    const matchesEnv = environment.value === 'all' || item.environment === environment.value;
    const matchesStatus = status.value === 'all' || item.status === status.value;
    return matchesQuery && matchesEnv && matchesStatus;
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const rows = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

watch([query, environment, status], () => {
  page.value = 1;
});

function refresh() {
  refreshing.value = true;
  window.setTimeout(() => {
    refreshing.value = false;
  }, 700);
}
</script>

<template>
  <div class="tde-page">
    <PageHeader
      title="Pipelines"
      description="Every service pipeline, its owner, and the last run."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Pipelines' }]"
    >
      <template #actions>
        <Button size="sm" icon="refresh" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
        <Button size="sm" icon="plus" @click="store.setPipelineOpen(true)">Start pipeline</Button>
      </template>
    </PageHeader>

    <Toolbar class="tde-toolbar">
      <template #start>
        <Search v-model="query" placeholder="Search pipelines or owners" clearable />
        <Select v-model="environment" label="Environment" :options="[{ value: 'all', label: 'All environments' }, ...ENV_OPTIONS]" />
      </template>
      <template #end>
        <SegmentedControl
          v-model="status"
          :segments="[
            { value: 'all', label: 'All' },
            { value: 'passing', label: 'Passing' },
            { value: 'watch', label: 'Watch' },
            { value: 'failing', label: 'Failing' },
          ]"
        />
      </template>
    </Toolbar>

    <div v-if="refreshing" class="tde-refresh">
      <Spinner label="Refreshing pipelines" show-label />
      <div class="row g-3 mt-1">
        <div v-for="item in 3" :key="item" class="col-12 col-md-4">
          <Skeleton variant="rectangular" width="100%" height="168px" />
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="!filtered.length"
      title="No pipelines match"
      description="Try another owner, or clear the status filter."
      icon="search"
    />

    <template v-else>
      <div class="row g-3">
        <div v-for="pipeline in rows" :key="pipeline.id" class="col-12 col-md-6 col-xl-4">
          <article
            class="tde-pipe-hit"
            role="link"
            tabindex="0"
            @click="router.push(`${BASE_PATH}/pipelines/${pipeline.id}`)"
            @keydown.enter="router.push(`${BASE_PATH}/pipelines/${pipeline.id}`)"
          >
            <Card :title="pipeline.name" :description="`${pipeline.environment} · ${pipeline.branch}`">
              <div class="tde-stack">
                <div class="tde-card-meta">
                  <StatusBadge :status="pipeline.status" />
                  <Tag :label="pipeline.region" />
                </div>
                <ProgressBar label="Success" :value="pipeline.success" show-value />
                <div class="tde-person">
                  <Avatar :name="pipeline.owner" size="sm" />
                  <div>
                    <strong>{{ pipeline.owner }}</strong>
                    <p class="tde-subtle mb-0">{{ formatPercent(pipeline.success) }} · {{ pipeline.durationMin }} min</p>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        </div>
      </div>
      <div class="tde-pagination">
        <Pagination v-model:page="page" :page-count="pageCount" />
      </div>
    </template>
  </div>
</template>
