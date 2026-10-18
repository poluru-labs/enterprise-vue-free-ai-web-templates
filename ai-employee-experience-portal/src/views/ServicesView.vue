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
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, CATEGORY_OPTIONS } from '../constants/navigation.js';
import { useExperience } from '../stores/experience.js';
import { scoreBand } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useExperience();
const query = ref('');
const category = ref('all');
const status = ref('all');
const page = ref(1);
const refreshing = ref(false);
const pageSize = 6;

const filtered = computed(() =>
  store.services.filter((item) => {
    const haystack = `${item.name} ${item.owner} ${item.category} ${item.site}`.toLowerCase();
    const matchesQuery = !query.value || haystack.includes(query.value.trim().toLowerCase());
    const matchesCategory = category.value === 'all' || item.category === category.value;
    const matchesStatus = status.value === 'all' || item.status === status.value;
    return matchesQuery && matchesCategory && matchesStatus;
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const rows = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

watch([query, category, status], () => {
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
  <div class="hrt-page">
    <PageHeader
      title="Services"
      description="Every workplace service, its owner, and how long people wait."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Services' }]"
    >
      <template #actions>
        <Button size="sm" icon="refresh" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
        <Button size="sm" icon="plus" @click="store.setServiceOpen(true)">Add service</Button>
      </template>
    </PageHeader>

    <div class="hrt-filter-bar">
      <Search v-model="query" placeholder="Search services or owners" clearable />
      <Select v-model="category" label="Category" :options="[{ value: 'all', label: 'All categories' }, ...CATEGORY_OPTIONS]" />
      <SegmentedControl
        v-model="status"
        :segments="[
          { value: 'all', label: 'All' },
          { value: 'open', label: 'Open' },
          { value: 'busy', label: 'Busy' },
          { value: 'closed', label: 'Closed' },
        ]"
      />
    </div>

    <div v-if="refreshing" class="hrt-refresh">
      <Spinner label="Refreshing the lobby" show-label />
      <div class="row g-3 mt-1">
        <div v-for="item in 3" :key="item" class="col-12 col-md-4">
          <Skeleton variant="rectangular" width="100%" height="168px" />
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="!filtered.length"
      title="No services match"
      description="Try another owner, or clear the status filter."
      icon="search"
    />

    <template v-else>
      <div class="row g-3">
        <div v-for="service in rows" :key="service.id" class="col-12 col-md-6 col-xl-4">
          <article
            class="hrt-service-hit"
            role="link"
            tabindex="0"
            @click="router.push(`${BASE_PATH}/services/${service.id}`)"
            @keydown.enter="router.push(`${BASE_PATH}/services/${service.id}`)"
          >
            <Card :title="service.name" :description="`${service.category} · ${service.site}`">
              <div class="hrt-stack">
                <div class="hrt-card-meta">
                  <StatusBadge :status="service.status" />
                  <Tag :label="scoreBand(service.score)" />
                </div>
                <ProgressBar label="Score" :value="Math.round((service.score / 5) * 100)" show-value />
                <div class="hrt-person">
                  <Avatar :name="service.owner" size="sm" />
                  <div>
                    <strong>{{ service.owner }}</strong>
                    <p class="hrt-subtle mb-0">{{ service.wait }} day wait</p>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        </div>
      </div>
      <div class="hrt-pagination">
        <Pagination v-model:page="page" :page-count="pageCount" />
      </div>
    </template>
  </div>
</template>
