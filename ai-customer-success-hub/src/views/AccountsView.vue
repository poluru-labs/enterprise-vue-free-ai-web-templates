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
  Rating,
  Search,
  SegmentedControl,
  Select,
  Skeleton,
  Spinner,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-vue';
import { BASE_PATH, BREADCRUMB_ROOT, HEALTH_OPTIONS } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatMoney, healthBand } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useSuccess();
const query = ref('');
const health = ref('all');
const segment = ref('all');
const page = ref(1);
const refreshing = ref(false);
const pageSize = 6;

const filtered = computed(() =>
  store.accounts.filter((item) => {
    const band = healthBand(item.health);
    const haystack = `${item.name} ${item.owner} ${item.region}`.toLowerCase();
    const matchesQuery = !query.value || haystack.includes(query.value.trim().toLowerCase());
    const matchesHealth = health.value === 'all' || band === health.value;
    const matchesSegment = segment.value === 'all' || item.segment === segment.value;
    return matchesQuery && matchesHealth && matchesSegment;
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const rows = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

watch([query, health, segment], () => {
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
  <div class="mrg-page">
    <PageHeader
      title="Accounts"
      description="Health, owner, and renewal date for every account on the book."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Accounts' }]"
    >
      <template #actions>
        <Button size="sm" icon="refresh" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
        <Button size="sm" icon="plus" @click="store.setAccountOpen(true)">Add account</Button>
      </template>
    </PageHeader>

    <Toolbar class="mrg-toolbar">
      <template #start>
        <Search v-model="query" placeholder="Search accounts or owners" clearable />
      </template>
      <template #default>
        <Select v-model="health" label="Health" :options="HEALTH_OPTIONS" />
      </template>
      <template #end>
        <SegmentedControl
          v-model="segment"
          :segments="[
            { value: 'all', label: 'All' },
            { value: 'Enterprise', label: 'Enterprise' },
            { value: 'Mid-market', label: 'Mid' },
            { value: 'Growth', label: 'Growth' },
          ]"
        />
      </template>
    </Toolbar>

    <div v-if="refreshing" class="mrg-refresh">
      <Spinner label="Refreshing the book" show-label />
      <div class="row g-3 mt-1">
        <div v-for="item in 3" :key="item" class="col-12 col-md-4">
          <Skeleton variant="rectangular" width="100%" height="180px" />
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="!filtered.length"
      title="No accounts match"
      description="Try another owner, or clear the health filter."
      icon="search"
    />

    <template v-else>
      <div class="row g-3">
        <div v-for="account in rows" :key="account.id" class="col-12 col-md-6 col-xl-4">
          <article
            class="mrg-account-hit"
            role="link"
            tabindex="0"
            @click="router.push(`${BASE_PATH}/accounts/${account.id}`)"
            @keydown.enter="router.push(`${BASE_PATH}/accounts/${account.id}`)"
          >
            <Card :title="account.name" :description="`${account.region} · ${account.seats} seats`">
              <div class="mrg-stack">
                <div class="mrg-card-meta">
                  <StatusBadge :status="healthBand(account.health)" />
                  <Tag :label="account.segment" />
                </div>
                <ProgressBar label="Health" :value="account.health" show-value />
                <Rating :model-value="account.sentiment" read-only label="Sentiment" />
                <div class="mrg-person">
                  <Avatar :name="account.owner" size="sm" />
                  <div>
                    <strong>{{ account.owner }}</strong>
                    <p class="mrg-subtle mb-0">{{ formatMoney(account.arr) }} ARR</p>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        </div>
      </div>
      <div class="mrg-pagination">
        <Pagination v-model:page="page" :page-count="pageCount" />
      </div>
    </template>
  </div>
</template>
