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
import { BASE_PATH, BREADCRUMB_ROOT, CLASS_OPTIONS, DOMAIN_OPTIONS } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatNumber, qualityBand } from '../utils/format.js';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useGovernance();
const query = ref('');
const domain = ref('all');
const classification = ref('all');
const page = ref(1);
const refreshing = ref(false);
const pageSize = 6;

const filtered = computed(() =>
  store.assets.filter((item) => {
    const haystack = `${item.name} ${item.owner} ${item.domain}`.toLowerCase();
    const matchesQuery = !query.value || haystack.includes(query.value.trim().toLowerCase());
    const matchesDomain = domain.value === 'all' || item.domain === domain.value;
    const matchesClass = classification.value === 'all' || item.classification === classification.value;
    return matchesQuery && matchesDomain && matchesClass;
  }),
);

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
const rows = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));

watch([query, domain, classification], () => {
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
  <div class="cbt-page">
    <PageHeader
      title="Catalog"
      description="Every registered asset, its owner, and its classification."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Catalog' }]"
    >
      <template #actions>
        <Button size="sm" icon="refresh" variant="secondary" :loading="refreshing" @click="refresh">Refresh</Button>
        <Button size="sm" icon="plus" @click="store.setAssetOpen(true)">Register asset</Button>
      </template>
    </PageHeader>

    <Toolbar class="cbt-toolbar">
      <template #start>
        <Search v-model="query" placeholder="Search assets or owners" clearable />
        <Select v-model="domain" label="Domain" :options="[{ value: 'all', label: 'All domains' }, ...DOMAIN_OPTIONS]" />
      </template>
      <template #end>
        <SegmentedControl
          v-model="classification"
          :segments="[{ value: 'all', label: 'All' }, ...CLASS_OPTIONS.map((item) => ({ value: item.value, label: item.label }))]"
        />
      </template>
    </Toolbar>

    <div v-if="refreshing" class="cbt-refresh">
      <Spinner label="Refreshing the catalog" show-label />
      <div class="row g-3 mt-1">
        <div v-for="item in 3" :key="item" class="col-12 col-md-4">
          <Skeleton variant="rectangular" width="100%" height="168px" />
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="!filtered.length"
      title="No assets match"
      description="Try another owner, or clear the classification filter."
      icon="search"
    />

    <template v-else>
      <div class="row g-3">
        <div v-for="asset in rows" :key="asset.id" class="col-12 col-md-6 col-xl-4">
          <article
            class="cbt-asset-hit"
            role="link"
            tabindex="0"
            @click="router.push(`${BASE_PATH}/catalog/${asset.id}`)"
            @keydown.enter="router.push(`${BASE_PATH}/catalog/${asset.id}`)"
          >
            <Card :title="asset.name" :description="`${asset.domain} · ${asset.system}`">
              <div class="cbt-stack">
                <div class="cbt-card-meta">
                  <StatusBadge :status="asset.classification" />
                  <Tag :label="qualityBand(asset.quality)" />
                </div>
                <ProgressBar label="Quality" :value="asset.quality" show-value />
                <div class="cbt-person">
                  <Avatar :name="asset.owner" size="sm" />
                  <div>
                    <strong>{{ asset.owner }}</strong>
                    <p class="cbt-subtle mb-0">{{ formatNumber(asset.rows) }} rows</p>
                  </div>
                </div>
              </div>
            </Card>
          </article>
        </div>
      </div>
      <div class="cbt-pagination">
        <Pagination v-model:page="page" :page-count="pageCount" />
      </div>
    </template>
  </div>
</template>
