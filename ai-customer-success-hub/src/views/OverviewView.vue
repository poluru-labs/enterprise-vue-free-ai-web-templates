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
import { BASE_PATH, BREADCRUMB_ROOT, ONBOARDING_STEPS } from '../constants/navigation.js';
import { useSuccess } from '../stores/success.js';
import { formatDate, formatMoney, healthBand } from '../utils/format.js';
import AreaChart from '../components/charts/AreaChart.vue';
import DonutChart from '../components/charts/DonutChart.vue';
import ChartSection from '../components/widgets/ChartSection.vue';
import PageHeader from '../components/widgets/PageHeader.vue';
import StatCard from '../components/widgets/StatCard.vue';
import StatusBadge from '../components/widgets/StatusBadge.vue';

const router = useRouter();
const store = useSuccess();

const kpis = computed(() => [
  {
    id: 'accounts',
    label: 'Accounts',
    value: String(store.accounts.length),
    hint: `${store.healthyAccounts.length} healthy`,
    trend: 'up',
    trendValue: '2 this quarter',
    icon: 'bi-buildings',
    tone: 'brand',
    sparkline: [7, 8, 8, 9, 9, 10],
  },
  {
    id: 'health',
    label: 'Book health',
    value: String(store.bookHealth),
    hint: 'Average score',
    trend: 'flat',
    trendValue: 'Holding',
    icon: 'bi-heart-pulse',
    tone: 'success',
    sparkline: [71, 73, 72, 74, 73, store.bookHealth],
  },
  {
    id: 'arr',
    label: 'ARR',
    value: formatMoney(store.arr),
    hint: 'Open book',
    trend: 'up',
    trendValue: '+6%',
    icon: 'bi-cash-stack',
    tone: 'info',
    sparkline: [90, 96, 102, 110, 118, 123],
  },
  {
    id: 'renewals',
    label: 'Open renewals',
    value: String(store.openRenewals.length),
    hint: 'Through January',
    trend: 'down',
    trendValue: '2 at risk',
    icon: 'bi-calendar-event',
    tone: 'warning',
    sparkline: [8, 8, 7, 7, 7, store.openRenewals.length],
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    value: String(store.liveOnboarding.length),
    hint: 'Not yet live',
    trend: 'up',
    trendValue: 'Harbor starts Friday',
    icon: 'bi-signpost',
    tone: 'brand',
    sparkline: [1, 1, 2, 2, 3, store.liveOnboarding.length],
  },
  {
    id: 'risk',
    label: 'At risk',
    value: String(store.riskAccounts.length),
    hint: `Below ${store.settings.healthThreshold}`,
    trend: 'down',
    trendValue: 'Needs a call',
    icon: 'bi-exclamation-circle',
    tone: 'danger',
    sparkline: [1, 1, 2, 2, 2, store.riskAccounts.length],
  },
]);

const segmentMix = computed(() => {
  const counts = { Enterprise: 0, 'Mid-market': 0, Growth: 0 };
  store.accounts.forEach((item) => {
    if (counts[item.segment] != null) counts[item.segment] += 1;
  });
  return overview.segmentMix.map((item) => ({ ...item, value: counts[item.name] ?? item.value }));
});

const renewalTimeline = computed(() =>
  store.openRenewals.slice(0, 4).map((item) => ({
    title: item.account,
    description: `${item.owner} · ${formatMoney(item.arr)}`,
    time: formatDate(item.date),
  })),
);

const onboardingIndex = computed(() => {
  const current = store.liveOnboarding[0];
  const index = ONBOARDING_STEPS.findIndex((step) => step.id === current?.stage);
  return index < 0 ? 0 : index;
});

const notes = computed(() =>
  store.activities.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    content: `${item.account} · ${item.owner}. ${item.note}`,
  })),
);
</script>

<template>
  <div class="mrg-page">
    <PageHeader
      title="Customer success"
      description="Health, renewals, onboarding, and the week’s success work."
      :crumbs="[BREADCRUMB_ROOT, { label: 'Overview' }]"
    >
      <template #actions>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            @click="showToast({ title: 'Book export queued', description: 'Meera Poluru will get the file shortly.', variant: 'success' })"
          >
            Export
          </Button>
          <Button size="sm" icon="plus" @click="store.setAccountOpen(true)">Add account</Button>
        </ButtonGroup>
      </template>
    </PageHeader>

    <section class="mrg-hero">
      <div>
        <p class="mrg-kicker">{{ overview.hero.kicker }}</p>
        <h2>{{ overview.hero.title }}</h2>
        <p>{{ overview.hero.body }}</p>
      </div>
      <div class="mrg-hero-meter">
        <CircularProgress :value="store.bookHealth" show-value label="Book" />
      </div>
    </section>

    <div class="row g-3 mb-3">
      <div v-for="kpi in kpis" :key="kpi.id" class="col-12 col-sm-6 col-xl-4">
        <StatCard
          :label="kpi.label"
          :value="kpi.value"
          :hint="kpi.hint"
          :trend="kpi.trend"
          :trend-value="kpi.trendValue"
          :icon="kpi.icon"
          :tone="kpi.tone"
          :sparkline="kpi.sparkline"
        />
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="Health trend" subtitle="Healthy accounts and at-risk accounts · May–Oct 2026">
          <AreaChart :labels="overview.healthTrend.labels" :series="overview.healthTrend.series" />
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Segment mix" subtitle="Accounts by book segment">
          <DonutChart :items="segmentMix" center-label="Accounts" :center-value="String(store.accounts.length)" />
        </ChartSection>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-12 col-lg-4">
        <ChartSection title="Book pulse" subtitle="Meera Poluru · Thursday review">
          <div class="mrg-stack">
            <Stat label="Average health" :value="String(store.bookHealth)" hint="Across the open book" trend="flat" trend-value="Stable" />
            <Meter :value="store.healthyAccounts.length" :max="store.accounts.length" label="Healthy accounts" show-value />
            <ProgressBar label="Renewal coverage" :value="72" show-value />
          </div>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Upcoming renewals" subtitle="Next dates on the book">
          <Timeline :items="renewalTimeline" />
          <Button class="mt-3" variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/renewals`)">
            Open renewals
          </Button>
        </ChartSection>
      </div>
      <div class="col-12 col-lg-4">
        <ChartSection title="Onboarding now" :subtitle="store.liveOnboarding[0]?.account || 'No live onboardings'">
          <p class="mrg-subtle mb-3">{{ store.liveOnboarding[0]?.owner }} · step {{ onboardingIndex + 1 }} of 4</p>
          <ProgressBar label="Current play" :value="store.liveOnboarding[0]?.progress || 0" show-value />
          <div class="mrg-step-pills">
            <Tag
              v-for="(step, index) in ONBOARDING_STEPS"
              :key="step.id"
              :label="step.label"
              :variant="index === onboardingIndex ? 'brand' : 'neutral'"
            />
          </div>
        </ChartSection>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-7">
        <ChartSection title="This week" subtitle="Success notes from the team">
          <Accordion :items="notes" />
          <Divider />
          <ul class="mrg-note-list">
            <li v-for="item in store.activities.slice(0, 4)" :key="item.id">
              <i class="bi bi-dot" />
              <div>
                <strong>{{ item.title }}</strong>
                <p class="mb-0">{{ item.account }} · {{ item.owner }}</p>
                <span class="mrg-subtle">{{ formatDate(item.when) }}</span>
              </div>
              <StatusBadge :status="item.type" />
            </li>
          </ul>
        </ChartSection>
      </div>
      <div class="col-12 col-xl-5">
        <ChartSection title="Watch list" subtitle="Scores under the Thursday line">
          <div class="mrg-stack">
            <Alert
              v-for="item in store.riskAccounts"
              :key="item.id"
              variant="danger"
              :title="item.name"
              :message="`${item.owner} · health ${item.health} · ${healthBand(item.health).replace('_', ' ')}`"
            />
            <Button variant="tertiary" size="sm" icon-trailing="chevron-right" @click="router.push(`${BASE_PATH}/accounts`)">
              Review accounts
            </Button>
          </div>
        </ChartSection>
      </div>
    </div>
  </div>
</template>
