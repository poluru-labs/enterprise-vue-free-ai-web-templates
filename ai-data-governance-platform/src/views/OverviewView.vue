<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  Accordion,
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Meter,
  ProgressBar,
  Stat,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-vue';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { useGovernance } from '../stores/governance.js';
import { formatDate, qualityBand } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useGovernance();

const kpis = computed(() => [
  { id: 'assets', label: 'Assets', value: String(store.assets.length), hint: 'In the catalog', trend: 'up', trendValue: 'Registered', icon: 'bi-collection', tone: 'brand', sparkline: [7, 8, 8, 9, 10, store.assets.length] },
  { id: 'quality', label: 'Avg quality', value: String(store.averageQuality), hint: 'Across assets', trend: 'flat', trendValue: 'Holding', icon: 'bi-clipboard-check', tone: 'success', sparkline: [74, 75, 76, 75, 76, store.averageQuality] },
  { id: 'owners', label: 'Owners', value: String(new Set(store.assets.map((item) => item.owner)).size), hint: 'Named on an asset', trend: 'up', trendValue: 'Covered', icon: 'bi-person-badge', tone: 'info', sparkline: [6, 7, 8, 8, 9, 10] },
  { id: 'requests', label: 'Open requests', value: String(store.openRequests.length), hint: 'Waiting on a steward', trend: 'down', trendValue: 'This week', icon: 'bi-key', tone: 'warning', sparkline: [5, 4, 4, 3, 3, store.openRequests.length] },
  { id: 'policies', label: 'Published', value: String(store.publishedPolicies.length), hint: `${store.policies.length} in the library`, trend: 'up', trendValue: 'Live', icon: 'bi-journal-text', tone: 'brand', sparkline: [2, 2, 3, 3, 3, store.publishedPolicies.length] },
  { id: 'failing', label: 'Failing', value: String(store.failingAssets.length), hint: `Under ${store.settings.qualityLine}`, trend: 'down', trendValue: 'Needs a fix', icon: 'bi-exclamation-circle', tone: 'danger', sparkline: [1, 1, 2, 2, 2, store.failingAssets.length] },
]);

const classMix = computed(() => {
  const counts = { Public: 0, Internal: 0, Confidential: 0, Restricted: 0 };
  const colors = { Public: '#7BA3C9', Internal: '#3368A0', Confidential: '#1F4E79', Restricted: '#8AA0B8' };
  store.assets.forEach((item) => {
    const key = item.classification.charAt(0).toUpperCase() + item.classification.slice(1);
    if (counts[key] != null) counts[key] += 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value, color: colors[name] }));
});

const requestTimeline = computed(() =>
  store.openRequests.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.asset,
    description: `${item.requester} · ${item.purpose}`,
    time: formatDate(item.needed),
  })),
);

const notes = computed(() =>
  store.quality
    .filter((item) => item.status !== 'passing')
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: `${item.asset} · ${item.check}`,
      content: `${item.owner} · score ${item.score}. Last run ${formatDate(item.ran)}.`,
    })),
);
</script>

<template>
  <div class="cbt-page">
    <PageHeader
      title="Data governance"
      description="Ownership, quality, catalogs, policies, and access requests."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            @click="showToast({ title: 'Registry export queued', description: 'Meera Poluru will get the file shortly.', variant: 'success' })"
          >
            Export
          </Button>
          <Button size="sm" icon="plus" @click="store.setAssetOpen(true)">Register asset</Button>
        </ButtonGroup>
      </template>
    </PageHeader>

    <section class="cbt-hero">
      <div>
        <p class="cbt-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <CircularProgress :value="store.averageQuality" show-value label="Quality" />
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4">
        <StatCard v-bind="kpi" :trend-value="kpi.trendValue" />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Quality trend" subtitle="Passing assets and failing checks · May–Oct 2026">
          <AreaChart :labels="overview.qualityTrend.labels" :series="overview.qualityTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Classification" subtitle="Assets by sensitivity">
          <DonutChart :items="classMix" center-label="Assets" :center-value="String(store.assets.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <ChartSection title="Registry pulse" subtitle="Meera Poluru · Monday review">
          <div class="cbt-stack">
            <Stat label="Average quality" :value="String(store.averageQuality)" hint="Across the catalog" trend="flat" trend-value="Stable" />
            <Meter :value="store.passingAssets.length" :max="store.assets.length" label="Passing assets" show-value />
            <ProgressBar label="Policy coverage" :value="78" show-value />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Open access" subtitle="Requests still with a steward">
          <Timeline :items="requestTimeline" />
          <Button class="mt-3" variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/access`)">
            Open access
          </Button>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Domains" subtitle="Six books on the registry">
          <div class="cbt-step-pills">
            <Tag v-for="domain in ['Customer', 'Finance', 'People', 'Product', 'Marketing', 'Platform']" :key="domain" :label="domain" />
          </div>
          <p class="cbt-subtle mt-3 mb-0">Each domain has a named owner and a steward.</p>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Checks to watch" subtitle="Scores under the Monday line">
          <Accordion :items="notes" />
          <Divider />
          <ul class="cbt-note-list">
            <li v-for="item in store.quality.slice(0, 4)" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.check }}</strong>
                <p class="mb-0">{{ item.asset }} · {{ item.owner }}</p>
                <span class="cbt-subtle">{{ formatDate(item.ran) }}</span>
              </div>
              <StatusBadge :status="item.status" />
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Needs an owner look" subtitle="Assets under the quality line">
          <div class="cbt-stack">
            <Alert
              v-for="item in store.failingAssets"
              :key="item.id"
              variant="danger"
              :title="item.name"
              :message="`${item.owner} · quality ${item.quality} · ${qualityBand(item.quality)}`"
            />
            <Button variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/catalog`)">
              Open catalog
            </Button>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
